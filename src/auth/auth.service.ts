import { Injectable } from '@nestjs/common'
import { InjectModel } from '@nestjs/mongoose'
import { User } from './user.schema'
import { Model } from 'mongoose'
import { SignInDto, SignUpDto, VerifyCodeDto } from './user.dto'
import * as bcrypt from 'bcrypt'
import { MailService } from './mail.service'

@Injectable()
export class AuthService {
  constructor(@InjectModel(User.name) private userModel: Model<User>) {}
  async signUp(userDto: SignUpDto) {
    const { fullName, email, password } = userDto
    const existedEmail = await this.userModel.findOne({ email })
    if (existedEmail) return { user: null, message: 'User has already signed up with this email' }
    const hashedPassword = await bcrypt.hash(password, 10)
    const newUserModel = await this.userModel.create({ fullName, email, password: hashedPassword })
    const { _id, isDoctor } = newUserModel
    const newUser = { _id, fullName, email, isDoctor }
    const mailService = new MailService()
    const confirmationCode = Math.round(Math.random() * 1000000)
    await mailService.sendActivationLink(email, confirmationCode)
    return { user: newUser, confirmationCode }
  }
  async signIn(userDto: SignInDto) {
    const { email, password } = userDto
    const existedUser = await this.userModel.findOne({ email })
    if (!existedUser) return { user: null, message: 'User has not signed up yet with this email' }
    const correctPassword = await bcrypt.compare(password, existedUser.password)
    if (!correctPassword) return { user: null, message: 'Incorrect password' }
    const { _id, fullName, isDoctor } = existedUser
    const userObj = { _id, fullName, email, isDoctor }
    return { user: userObj, message: 'User has just signed in successfully' }
  }
  async verifyCode(verifyCodeDto: VerifyCodeDto) {
    const { email, enteredCode, expectedCode } = verifyCodeDto
    if (enteredCode !== expectedCode) {
      await this.userModel.findOneAndDelete({ email })
      return { user: null, message: 'Verification code is incorrect' }
    }
    const user = await this.userModel.findOne({ email }).select('fullName email isDoctor')
    return { user, message: 'Code verified successfully' }
  }
}
