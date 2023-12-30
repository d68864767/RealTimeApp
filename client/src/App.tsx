```tsx
import React, { useEffect, useState } from 'react';
import Chat from './components/Chat';
import messageService from './services/message.service';

const App: React.FC = () => {
  const [messages, setMessages] = useState([]);

  useEffect(() => {
    messageService.on('created', (message) => {
      setMessages((messages) => [...messages, message]);
    });

    messageService.find().then((messages) => {
      setMessages(messages);
    });

    return () => {
      messageService.removeListener('created');
    };
  }, []);

  return (
    <div className="App">
      <header className="App-header">
        <h1>RealTimeApp</h1>
      </header>
      <Chat messages={messages} />
    </div>
  );
};

export default App;
```
</h1>