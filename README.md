
# Flyometer Footer JS

[![GitHub Pages](https://img.shields.io/badge/GitHub-Pages-blue)](https://pacobaco.github.io/flyware-footer/flyometer-footer.js)
[![License: MIT](https://img.shields.io/badge/License-MIT-green.svg)](LICENSE)

**Live demo:** [https://pacobaco.github.io/flyware-footer/flyometer-footer.js](https://pacobaco.github.io/flyware-footer/flyometer-footer.js)  

**Download JS file:** [flyometer-footer.js](https://pacobaco.github.io/flyware-footer/flyometer-footer.js)

## Table of Contents

- [Overview](#overview)
- [Features](#features)
- [Installation](#installation)
- [Configuration](#configuration)
- [How It Works](#how-it-works)
- [Customization](#customization)
- [Example Usage](#example-usage)
- [Contributing](#contributing)
- [License](#license)

## Overview

**Flyometer Footer JS** is a next-gen, multilingual, plug-and-play footer script designed to enhance blog posts with AI model recommendations. It automatically detects the post language, scores the post against topic keywords, and dynamically displays the top 5 relevant AI models. It is SEO-friendly and supports click tracking.

## Features

- Automatic multi-language detection (English, Spanish, French; extensible)
- Dynamic topic matching
- Top 5 AI model recommendations
- Language-specific model links
- JSON-LD structured data for SEO
- Click tracking with post, topic, and language metadata
- Fully configurable and extensible via JSON

## Installation

1. Upload `flyometer-footer.js` to your server or GitHub Pages.  
2. Include it in your blog template before `</body>`:

```html
<script src="https://pacobaco.github.io/flyware-footer/flyometer-footer.js"></script>
```

## Configuration

**flyometer_config.json** example:

```json
{
  "languages": ["en","es","fr"],
  "topics": {
    "meteorological": {
      "keywords": {
        "en": ["weather","climate","temperature"],
        "es": ["clima","temperatura"],
        "fr": ["météo","température"]
      },
      "description": {
        "en": "Environmental and meteorological AI models",
        "es": "Modelos de IA para meteorología",
        "fr": "Modèles IA pour la météorologie"
      },
      "weight": 1.5,
      "links": {
        "en": "https://github.com/pacobaco/flyometer",
        "es": "https://github.com/pacobaco/flyometer#es",
        "fr": "https://github.com/pacobaco/flyometer#fr"
      }
    }
  }
}
```

**ai_models.json** example:

```json
[
  {"name":"gpt-4","provider":"OpenAI","type":"LLM","description":"General-purpose LLM"},
  {"name":"llama-2-7b","provider":"Meta","type":"LLM","description":"General-purpose 7B model"}
]
```

## How It Works

1. Detects the post language using keywords.  
2. Matches content against topic keywords and calculates scores.  
3. Selects top 5 AI models and renders them in a footer.  
4. Generates JSON-LD structured data for SEO.  
5. Logs clicks on model links (can be integrated with analytics).

## Customization

- Add or edit topics, keywords, and links in `flyometer_config.json`.  
- Update AI models in `ai_models.json`.  
- Style the footer via CSS or inline styles.  
- Extend language detection by adding more languages and keywords.

## Example Usage

```html
<div class="post-footer"></div>
<script src="https://pacobaco.github.io/flyware-footer/flyometer-footer.js"></script>
```

## Contributing

- Add new topics or languages  
- Improve language detection logic  
- Optimize model scoring and ranking  
- Enhance styling or UI  

## License

MIT License. See [LICENSE](LICENSE) for details.
