import request from 'supertest';
import App from '@/app';
import MessageRoute from '@routes/message.route';
import { MessageDto } from '@/dtos/message.dto';

afterAll(async () => {
  await new Promise<void>(resolve => setTimeout(() => resolve(), 500));
});

describe('Testing Message', () => {
  describe('[POST] /message', () => {
    it('Should return response Welcome to StationFive for message that has Hello or Hi', async () => {
      const messageData: MessageDto = {
        conversation_id: 'abcd123',
        message: 'Hello, I’m John',
      };
      const messageRoute = new MessageRoute();
      const app = new App([messageRoute]);

      return request(app.getServer())
        .post(`${messageRoute.path}`)
        .send(messageData)
        .expect(200, { response_id: 'abcd123', response: 'Welcome to StationFive.' });
    });

    it('Should return response Thank you, see you around for message that has Goodbye or bye', async () => {
      const messageData: MessageDto = {
        conversation_id: 'abcd123',
        message: 'Goodbye, I’m John',
      };
      const messageRoute = new MessageRoute();
      const app = new App([messageRoute]);

      return request(app.getServer())
        .post(`${messageRoute.path}`)
        .send(messageData)
        .expect(200, { response_id: 'abcd123', response: 'Thank you, see you around.' });
    });

    it('Should return response Sorry, I don’t understand for message that has no context matched', async () => {
      const messageData: MessageDto = {
        conversation_id: 'abcd123',
        message: 'No worries',
      };
      const messageRoute = new MessageRoute();
      const app = new App([messageRoute]);

      return request(app.getServer())
        .post(`${messageRoute.path}`)
        .send(messageData)
        .expect(200, { response_id: 'abcd123', response: 'Sorry, I don’t understand.' });
    });

    it('Should return 400 for missing conversation_id or message', async () => {
      const messageRoute = new MessageRoute();
      const app = new App([messageRoute]);

      return request(app.getServer())
        .post(`${messageRoute.path}`)
        .send()
        .expect(400, { message: 'conversation_id must be a string, message must be a string' });
    });
  });
});
