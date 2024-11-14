import { Injectable } from '@nestjs/common'
import { config } from 'dotenv'
import { createTransport, Transporter, TransportOptions } from 'nodemailer'

@Injectable()
export class MailService {
  private transporter: Transporter
  constructor() {
    config()
    this.transporter = createTransport({
      host: process.env.SMTP_HOST,
      port: process.env.SMTP_PORT,
      secure: false,
      auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASS,
      },
    } as TransportOptions)
  }
  async sendActivationLink(email: string, confirmationCode: number) {
    try {
      await this.transporter.sendMail({
        from: process.env.SMTP_USER,
        to: email,
        subject: `Medical Application`,
        html: `<div>
        <h4>Your confirmation code below</h4>
           <h1>${confirmationCode}</h1>
          </div>`,
      })
    } catch (error: any) {
      throw new Error(`${error.message}`)
    }
  }
}
