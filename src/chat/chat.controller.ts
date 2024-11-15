import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common'
import { PostChatDto } from './chat.dto'
import { ChatService } from './chat.service'

@Controller('chat')
export class ChatController {
  constructor(private readonly chatService: ChatService) {}
  @Post('send')
  @UsePipes(ValidationPipe)
  async postChat(@Body() postChatDto: PostChatDto) {
    return await this.chatService.postChat(postChatDto)
  }
  @Get('/get-all/:senderId/:receiverId')
  @UsePipes(ValidationPipe)
  async getAllSendedAndReceivedChats(
    @Param('senderId') senderId: string,
    @Param('receiverId') receiverId: string
  ) {
    return await this.chatService.getAllSendedAndReceivedChats({ senderId, receiverId })
  }
  @Patch('/mark-asread/:senderId/:receiverId')
  async markAsRead(@Param('senderId') senderId: string, @Param('receiverId') receiverId: string) {
    return await this.chatService.markAsRead(senderId, receiverId)
  }
  @Get('/get-unread/:senderId/:receiverId')
  async getUnreadMessagesCount(
    @Param('senderId') senderId: string,
    @Param('receiverId') receiverId: string
  ) {
    return await this.chatService.getUnreadMessagesCount(senderId, receiverId)
  }
  @Delete('/delete/:chatId')
  async deleteChat(@Param('chatId') chatId: string) {
    return await this.chatService.deleteChat(chatId)
  }
}
