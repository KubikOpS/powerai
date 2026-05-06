export async function askOllama(prompt: string): Promise<string> {
  const res = await fetch('http://localhost:11434/api/chat', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      model: 'mistral',
      messages: [{ role: 'user', content: prompt }],
      stream: false
    })
  });
  const data = await res.json();
  return data.message?.content || 'Нет ответа';
}