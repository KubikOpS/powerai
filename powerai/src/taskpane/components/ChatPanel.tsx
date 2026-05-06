import React, { useState } from 'react';
import { askOllama } from '../helpers/ollamaClient';
import { getSlideDescription } from '../helpers/officeUtils';

const ChatPanel: React.FC = () => {
  const [input, setInput] = useState('');
  const [messages, setMessages] = useState<{role: string; content: string}[]>([]);
  const [loading, setLoading] = useState(false);

  const handleSend = async () => {
    if (!input.trim()) return;
    const userMsg = { role: 'user', content: input };
    setMessages(prev => [...prev, userMsg]);
    setInput('');
    setLoading(true);
    try {
      let reply: string;
      if (input.includes('анализируй слайд') || input.includes('проанализируй')) {
        const desc = await getSlideDescription();
        reply = await askOllama(`Проанализируй описание слайда и дай советы:\n${desc}`);
      } else {
        reply = await askOllama(input);
      }
      setMessages(prev => [...prev, { role: 'assistant', content: reply }]);
    } catch (err: any) {
      setMessages(prev => [...prev, { role: 'assistant', content: 'Ошибка: ' + err.message }]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <div style={{ height: 300, overflowY: 'auto', border: '1px solid #ccc', padding: 5, marginBottom: 10 }}>
        {messages.map((m, i) => (
          <div key={i} style={{ marginBottom: 5, textAlign: m.role === 'user' ? 'right' : 'left' }}>
            <strong>{m.role === 'user' ? 'Вы' : 'AI'}:</strong> {m.content}
          </div>
        ))}
        {loading && <div>AI думает...</div>}
      </div>
      <input
        style={{ width: '70%' }}
        value={input}
        onChange={e => setInput(e.target.value)}
        onKeyDown={e => e.key === 'Enter' && handleSend()}
        placeholder="Спроси или скажи 'анализируй слайд'"
      />
      <button onClick={handleSend}>Отправить</button>
    </div>
  );
};

export default ChatPanel;