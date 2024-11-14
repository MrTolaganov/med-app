import { Injectable } from '@nestjs/common'
import { Chat } from './chat.schema'
import { Model } from 'mongoose'
import { InjectModel } from '@nestjs/mongoose'
import { PostChatDto } from './chat.dto'
// import { AuthService } from 'src/auth/auth.service'

@Injectable()
export class ChatService {
  constructor(@InjectModel(Chat.name) private chatModel: Model<Chat>) {}

  async postChat(userId: string, postChatDto: PostChatDto) {

    const chat = await this.chatModel.create({ message: postChatDto.message, user: userId })
    return { chat }
  }
}
