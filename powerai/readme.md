# ⚡ PowerAI — бесплатный AI-ассистент в PowerPoint

[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
[![Ollama](https://img.shields.io/badge/AI-Ollama%20%2B%20Mistral%207B-blue)](https://ollama.com)

**PowerAI** добавляет **локальный AI** прямо в PowerPoint. Он пишет тексты, анализирует слайды и **генерирует картинки** через Hugging Face — всё бесплатно, без облаков и подписок.

## Возможности
- 💬 **Чат с AI** (Mistral 7B через Ollama) — генерация текста, ответы, анализ слайдов.
- 🎨 **Генерация изображений** (Stable Diffusion через Hugging Face) — просто опишите картинку.
- 🧠 **Анализ слайда** — AI видит структуру и даёт советы по дизайну.
- 🔒 Приватность — текст обрабатывается локально, изображения генерируются через бесплатный API.

## Быстрый старт

### 1. Установите зависимости
- [Ollama](https://ollama.com/download) и модель Mistral:
  ```bash
  ollama pull mistral
  ollama serve