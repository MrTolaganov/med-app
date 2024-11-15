import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose'
import { HydratedDocument } from 'mongoose'
import * as mongoose from 'mongoose'
import { User } from 'src/auth/user.schema'

export type ChatDocument = HydratedDocument<Chat>

@Schema()
export class Chat {
  @Prop({ required: true }) message: string
  @Prop({ default: false }) isRead: boolean
  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'User' }) sender: User
  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'User' }) receiver: User
}

export const ChatSchema = SchemaFactory.createForClass(Chat)
