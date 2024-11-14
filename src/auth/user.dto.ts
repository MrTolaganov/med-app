import { IsEmail, IsNotEmpty, IsNumber, IsString } from 'class-validator'

export class SignUpDto {
  @IsNotEmpty()
  @IsString()
  fullName: string

  @IsNotEmpty()
  @IsString()
  @IsEmail()
  email: string

  @IsNotEmpty()
  @IsString()
  password: string
}

export class SignInDto {
  @IsNotEmpty()
  @IsString()
  @IsEmail()
  email: string

  @IsNotEmpty()
  @IsString()
  password: string
}

export class VerifyCodeDto {
  @IsNotEmpty()
  @IsString()
  @IsEmail()
  email: string

  @IsNotEmpty()
  @IsNumber()
  enteredCode: number

  @IsNotEmpty()
  @IsNumber()
  expectedCode: number
}
