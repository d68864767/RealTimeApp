import { Params, Id, NullableId, ServiceMethods } from '@feathersjs/feathers';
import { Application } from '../declarations';

interface MessageData {
  text: string;
  timestamp: number;
}

interface MessageServiceOptions {
  client: any;
}

export default function (options: MessageServiceOptions) {
  if (!options.client) {
    throw new Error('A Redis client must be provided');
  }

  const { client } = options;

  class MessageService implements ServiceMethods<MessageData> {
    async find(params?: Params) {
      return new Promise((resolve, reject) => {
        client.lrange('messages', 0, -1, (err, data) => {
          if (err) {
            reject(err);
          } else {
            const messages = data.map(item => JSON.parse(item));
            resolve(messages);
          }
        });
      });
    }

    async get(id: Id, params?: Params) {
      return { id, text: `A message with ID: ${id}` };
    }

    async create(data: MessageData, params?: Params) {
      if (Array.isArray(data)) {
        return Promise.all(data.map(current => this.create(current, params)));
      }

      return new Promise((resolve, reject) => {
        client.rpush('messages', JSON.stringify(data), (err, reply) => {
          if (err) {
            reject(err);
          } else {
            resolve(data);
          }
        });
      });
    }

    async update(id: NullableId, data: MessageData, params?: Params) {
      return data;
    }

    async patch(id: NullableId, data: MessageData, params?: Params) {
      return data;
    }

    async remove(id: NullableId, params?: Params) {
      return { id };
    }
  }

  return new MessageService();
}
</MessageData>