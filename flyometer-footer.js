// === Next-Gen Flyometer Footer ===
(async () => {
  const footer = document.createElement("div");
  footer.id = "flyometer-footer";
  footer.style.borderTop = "1px solid #ccc";
  footer.style.marginTop = "40px";
  footer.style.padding = "20px";
  footer.style.fontFamily = "system-ui, sans-serif";
  footer.style.fontSize = "0.9em";
  footer.innerHTML = "<strong>Loading AI recommendations...</strong>";
  (document.querySelector(".post-footer") || document.body).appendChild(footer);

  const title = document.querySelector("h1.post-title, h3.post-title")?.innerText?.toLowerCase() || "";
  const body = document.querySelector(".post-body")?.innerText?.toLowerCase() || "";
  const context = title + " " + body;

  try {
    // === Load config & models ===
    const [configRes, modelsRes] = await Promise.all([
      fetch("https://raw.githubusercontent.com/pacobaco/flyometer/main/flyometer_config.json"),
      fetch("https://raw.githubusercontent.com/pacobaco/flyometer/main/ai_models.json")
    ]);
    const config = await configRes.json();
    const models = await modelsRes.json();

    // === Language detection heuristic ===
    let lang = "en"; // default
    const indicators = {
      "es": [" el "," la "," los "," las "," y "," de "],
      "fr": [" le "," la "," les "," et "," de "]
    };
    for (const [l, keys] of Object.entries(indicators)) {
      if (keys.some(w => context.includes(w))) { lang = l; break; }
    }

    // === Topic scoring ===
    const topicScores = Object.entries(config.topics).map(([topic, tcfg]) => {
      const kws = tcfg.keywords[lang] || [];
      const matches = kws.filter(kw => context.includes(kw.toLowerCase())).length;
      const score = matches * (tcfg.weight || 1);
      return { topic, score };
    });
    const bestTopic = topicScores.sort((a,b) => b.score - a.score)[0].topic || "AI";
    const topicConfig = config.topics[bestTopic];

    // === Score models ===
    const scoredModels = models.map(m => {
      const matches = (topicConfig.keywords[lang] || []).filter(kw =>
        m.name.toLowerCase().includes(kw.toLowerCase()) ||
        m.description.toLowerCase().includes(kw.toLowerCase())
      ).length;
      const score = matches;
      return { model: m, score };
    }).filter(m => m.score > 0)
      .sort((a,b) => b.score - a.score)
      .slice(0,5);

    // === Render footer HTML ===
    footer.innerHTML = `
      <h4 style="margin-bottom:10px;">${topicConfig.description[lang]}</h4>
      <ul style="list-style:none; padding-left:0; margin:0;">
        ${scoredModels.map(({model}) => `
          <li style="margin-bottom:6px;">
            <a href="${(topicConfig.links && topicConfig.links[lang]) || 'https://github.com/pacobaco/flyometer'}"
               data-model="${model.name}"
               class="flyometer-link"
               target="_blank"
               rel="noopener noreferrer">
               ${model.name}</a> — ${model.description}
          </li>`).join("")}
      </ul>
    `;

    // === JSON-LD structured data with inLanguage ===
    const ld = document.createElement("script");
    ld.type = "application/ld+json";
    ld.textContent = JSON.stringify({
      "@context": "https://schema.org",
      "@type": "ItemList",
      "name": `Flyometer Recommendations for ${title}`,
      "inLanguage": lang,
      "itemListElement": scoredModels.map(({model}, i) => ({
        "@type": "ListItem",
        "position": i+1,
        "name": model.name,
        "url": (topicConfig.links && topicConfig.links[lang]) || "https://github.com/pacobaco/flyometer"
      }))
    });
    document.body.appendChild(ld);

    // === Click tracking with language & topic metadata ===
    footer.querySelectorAll(".flyometer-link").forEach(link => {
      link.addEventListener("click", e => {
        const modelName = e.target.getAttribute("data-model");
        console.log(`Flyometer click: ${modelName}, topic: ${bestTopic}, lang: ${lang}, page: ${window.location.href}`);
        // Optional: send to analytics endpoint
      });
    });

  } catch(err) {
    console.error("Flyometer footer error:", err);
    footer.innerHTML = "<em>Unable to load Flyometer recommendations.</em>";
  }
})();