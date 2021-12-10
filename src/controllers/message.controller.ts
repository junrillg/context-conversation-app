import { NextFunction, Request, Response } from 'express';
import MessageService from '@services/message.service';
import { MessageDto } from '@dtos/message.dto';

class MessageController {
  public messageService = new MessageService();

  public getContext = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const messageData: MessageDto = req.body;
      res.status(200).json({ response_id: messageData.conversation_id, response: this.messageService.parseMessage(messageData.message) });
    } catch (error) {
      next(error);
    }
  };
}

export default MessageController;
