import { IsNotEmpty, IsString } from 'class-validator'

export class PostChatDto {
  @IsNotEmpty()
  @IsString()
  message: string
}
