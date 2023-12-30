import messageService from './message/message.service';

export default function services(app) {
  app.configure(messageService);
}
