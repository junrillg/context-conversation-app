import { Router } from 'express';
import MessageController from '@controllers/message.controller';
import { Routes } from '@interfaces/routes.interface';

class MessageRoute implements Routes {
  public path = '/message';
  public router = Router();
  public messageController = new MessageController();

  constructor() {
    this.initializeRoutes();
  }

  private initializeRoutes() {
    this.router.post(`${this.path}`, this.messageController.getContext);
  }
}

export default MessageRoute;
