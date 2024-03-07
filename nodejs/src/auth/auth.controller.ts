import { Controller, Post, Body } from '@nestjs/common';
import { AuthService } from './auth.service';
import { CreateUserDto } from 'src/users/create-user.dto';
import { ApiBearerAuth, ApiBody, ApiOperation, ApiTags } from '@nestjs/swagger';
import { LoginDto, RegisterDto } from './auth.dto';

@ApiTags('Authentication')
@ApiBearerAuth()
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @ApiOperation({ summary: 'Register a new user' })
  @ApiBody({ type: RegisterDto })
  @Post('/register')
  async register(@Body() userDto: CreateUserDto) {
    return this.authService.register(userDto);
  }

  @ApiOperation({ summary: 'Login and get access token' })
  @ApiBody({ type: LoginDto })
  @Post('login')
  async login(@Body() userDto: CreateUserDto) {
    return this.authService.login(userDto);
  }
}
