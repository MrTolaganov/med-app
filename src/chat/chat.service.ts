import { Injectable } from '@nestjs/common'
import { Chat } from './chat.schema'
import { Model } from 'mongoose'
import { InjectModel } from '@nestjs/mongoose'
import { PostChatDto } from './chat.dto'
import { User } from 'src/auth/user.schema'
// import { AuthService } from 'src/auth/auth.service'

@Injectable()
export class ChatService {
  constructor(
    @InjectModel(User.name) private userModel: Model<User>,
    @InjectModel(Chat.name) private chatModel: Model<Chat>
  ) {}

  async postChat(userId: string, postChatDto: PostChatDto) {
    const chat = await this.chatModel.create({ message: postChatDto.message, user: userId })
    const existedUser = await this.userModel.findById(userId)
    if (!existedUser) return { user: null, message: 'User not found' }
    await this.userModel.findByIdAndUpdate(userId, { $push: { chats: chat._id } })
    return { chat }
  }
}
