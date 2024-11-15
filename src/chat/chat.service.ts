import { Injectable } from '@nestjs/common'
import { Chat } from './chat.schema'
import { Model } from 'mongoose'
import { InjectModel } from '@nestjs/mongoose'
import { User } from 'src/auth/user.schema'
import { GetChatDto, PostChatDto } from './chat.dto'

@Injectable()
export class ChatService {
  constructor(
    @InjectModel(User.name) private userModel: Model<User>,
    @InjectModel(Chat.name) private chatModel: Model<Chat>
  ) {}

  async postChat(postChatDto: PostChatDto) {
    const { senderId, receiverId, message } = postChatDto
    const chat = await this.chatModel.create({ message, sender: senderId, receiver: receiverId })
    const existedUser = await this.userModel.findById(receiverId)
    if (!existedUser) return { user: null, message: 'User not found' }
    await this.userModel.findByIdAndUpdate(senderId, { $push: { chats: chat._id } })
    await this.userModel.findByIdAndUpdate(receiverId, { $push: { chats: chat._id } })
    return { chat }
  }

  async getAllSendedAndReceivedChats(getChatDto: GetChatDto) {
    const { senderId, receiverId } = getChatDto
    const chatMessages = await this.chatModel
      .find({ sender: senderId, receiver: receiverId })
      .select('message isRead sender receiver')
      .populate({ path: 'sender', select: 'isDoctor' })
      .populate({ path: 'receiver', select: 'isDoctor' })
    return { chatMessages }
  }
  async markAsRead(senderId: string, receiverId: string) {
    const messages = await this.chatModel.find({
      sender: senderId,
      receiver: receiverId,
      isRead: false,
    })
    messages.forEach(async message => {
      message.isRead = true
      await message.save()
    })
    return { messages }
  }
  async getUnreadMessagesCount(senderId: string, receiverId: string) {
    const unReadMessagesCount = await this.chatModel
      .find({ sender: senderId, receiver: receiverId, isRead: false })
      .countDocuments()
    return { unReadMessagesCount }
  }
  async deleteChat(chatId: string) {
    await this.chatModel.findByIdAndDelete(chatId)
    return { message: 'Chat deleted successfully' }
  }

  async getAllChats() {
    const chats = await this.chatModel.find()
    return { chats }
  }
}
