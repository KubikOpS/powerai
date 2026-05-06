import React, { useState } from 'react';

const HF_TOKEN = process.env.HF_TOKEN || ''; // берётся из .env

const ImageGenerator: React.FC = () => {
  const [prompt, setPrompt] = useState('');
  const [imageUrl, setImageUrl] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const generateImage = async () => {
    if (!prompt.trim()) return;
    setLoading(true);
    setError('');
    try {
      const response = await fetch(
        'https://api-inference.huggingface.co/models/stabilityai/stable-diffusion-2-1',
        {
          method: 'POST',
          headers: {
            'Authorization': `Bearer ${HF_TOKEN}`,
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ inputs: prompt }),
        }
      );
      if (!response.ok) {
        throw new Error(`Ошибка API: ${response.status}`);
      }
      const blob = await response.blob();
      const url = URL.createObjectURL(blob);
      setImageUrl(url);
    } catch (err: any) {
      setError('Не удалось сгенерировать: ' + err.message);
    } finally {
      setLoading(false);
    }
  };

  const insertToSlide = async () => {
    if (!imageUrl) return;
    try {
      await PowerPoint.run(async (context) => {
        const slide = context.presentation.slides.getActiveSlide();
        // Конвертируем blob URL в base64, т.к. Office.js требует общедоступный URL
        // Но blob URL локальный, не подойдёт. Нужно загрузить куда-то.
        // Пока просто предупредим.
        alert('Функция вставки в слайд будет добавлена в следующей версии.');
      });
    } catch (err) {
      alert('Ошибка при вставке.');
    }
  };

  return (
    <div>
      <input
        value={prompt}
        onChange={e => setPrompt(e.target.value)}
        placeholder="Опишите, что нарисовать..."
        style={{ width: '70%' }}
      />
      <button onClick={generateImage} disabled={loading}>Сгенерировать</button>
      {loading && <div>Генерируем изображение...</div>}
      {error && <div style={{ color: 'red' }}>{error}</div>}
      {imageUrl && (
        <div style={{ marginTop: 10 }}>
          <img src={imageUrl} alt="Сгенерированное изображение" style={{ width: '100%' }} />
          <button onClick={insertToSlide} style={{ marginTop: 5 }}>Вставить в слайд</button>
        </div>
      )}
    </div>
  );
};

export default ImageGenerator;