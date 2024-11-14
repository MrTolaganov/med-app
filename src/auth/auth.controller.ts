import { Body, Controller, Post, UsePipes, ValidationPipe } from '@nestjs/common'
import { AuthService } from './auth.service'
import { SignInDto, SignUpDto, VerifyCodeDto } from './user.dto'

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('/signup')
  @UsePipes(ValidationPipe)
  async signUp(@Body() userDto: SignUpDto) {
    return await this.authService.signUp(userDto)
  }

  @Post('/signin')
  @UsePipes(ValidationPipe)
  async signIn(@Body() userDto: SignInDto) {
    return await this.authService.signIn(userDto)
  }

  @Post('/verify-code')
  @UsePipes(ValidationPipe)
  async verifyCode(@Body() verifyCodeDto: VerifyCodeDto) {
    return await this.authService.verifyCode(verifyCodeDto)
  }
}
