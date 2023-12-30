import { useEffect, useState } from 'react';
import io from 'socket.io-client';

const socket = io('http://localhost:3030');
socket.on('connect', () => console.log('Connected!'));

interface MessageData {
  text: string;
  timestamp: number;
}

const messageService = {
  on: (event: string, callback: Function) => {
    socket.on(event, callback);
  },
  removeListener: (event: string) => {
    socket.removeListener(event);
  },
  create: (message: MessageData) => {
    socket.emit('messages::create', message);
  },
  find: (): Promise<MessageData[]> => {
    return new Promise((resolve) => {
      socket.emit('messages::find', {}, (error: any, messages: MessageData[]) => {
        if (error) {
          console.error('Error finding messages', error);
        } else {
          resolve(messages);
        }
      });
    });
  },
};

export default messageService;
