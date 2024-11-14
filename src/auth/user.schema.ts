import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose'
import { HydratedDocument } from 'mongoose'
// import * as mongoose from 'mongoose'
// import { Chat } from 'src/chat/chat.schema'

export type UserDocument = HydratedDocument<User>

@Schema()
export class User {
  @Prop({ required: true }) fullName: string
  @Prop({ required: true, unique: true }) email: string
  @Prop({ required: true }) password: string
  @Prop({ default: false }) isDoctor: boolean
  // @Prop({ type: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Owner' }] }) chats: Chat[]
}

export const UserSchema = SchemaFactory.createForClass(User)
