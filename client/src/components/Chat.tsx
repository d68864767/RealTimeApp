```tsx
import React, { useState } from 'react';

interface Message {
  text: string;
  timestamp: number;
}

interface ChatProps {
  messages: Message[];
}

const Chat: React.FC<ChatProps> = ({ messages }) => {
  const [message, setMessage] = useState('');

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setMessage(event.target.value);
  };

  const handleSendMessage = () => {
    messageService.create({
      text: message,
      timestamp: Date.now(),
    });
    setMessage('');
  };

  return (
    <div className="Chat">
      <ul className="Chat-messages">
        {messages.map((message, index) => (
          <li key={index}>
            <p>{message.text}</p>
            <span>{new Date(message.timestamp).toLocaleTimeString()}</span>
          </li>
        ))}
      </ul>
      <div className="Chat-input">
        <input type="text" value={message} onChange={handleInputChange} />
        <button onClick={handleSendMessage}>Send</button>
      </div>
    </div>
  );
};

export default Chat;
```
</ChatProps>