import React, { useState } from 'react';
import ChatPanel from './components/ChatPanel';
import ImageGenerator from './components/ImageGenerator';

const App: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'chat' | 'image'>('chat');

  return (
    <div style={{ padding: 10 }}>
      <div style={{ marginBottom: 10 }}>
        <button onClick={() => setActiveTab('chat')}>💬 Чат с AI</button>
        <button onClick={() => setActiveTab('image')}>🎨 Генерация картинок</button>
      </div>
      {activeTab === 'chat' ? <ChatPanel /> : <ImageGenerator />}
    </div>
  );
};

export default App;