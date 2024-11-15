import { IsNotEmpty, IsString } from 'class-validator'

export class PostChatDto {
  @IsNotEmpty()
  @IsString()
  senderId: string

  @IsNotEmpty()
  @IsString()
  receiverId: string

  @IsNotEmpty()
  @IsString()
  message: string
}

export class GetChatDto {
  @IsNotEmpty()
  @IsString()
  senderId: string

  @IsNotEmpty()
  @IsString()
  receiverId: string
}
