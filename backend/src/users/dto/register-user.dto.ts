// src/users/dto/register.dto.ts
import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsNotEmpty, IsEmail, MinLength, MaxLength } from 'class-validator';

export class RegisterDto {
  @IsString()
  @IsNotEmpty()
  @MinLength(2)
  @MaxLength(20)
  @ApiProperty()
  username: string;

  @IsString()
  @IsNotEmpty()
  @MinLength(6)
  @MaxLength(30)
  @ApiProperty({ writeOnly: true })
  password: string;

  @IsEmail()
  @IsNotEmpty()
  @ApiProperty()
  email: string;
}