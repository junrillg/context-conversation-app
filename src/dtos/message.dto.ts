import { IsString } from 'class-validator';

export class MessageDto {
  @IsString()
  public conversation_id: string;

  @IsString()
  public message: string;
}
