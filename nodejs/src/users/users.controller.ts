import {
  Controller,
  Post,
  Body,
  Get,
  Req,
  Delete,
  UseGuards,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './create-user.dto';
import { JwtAuthGuard } from 'src/auth/auth.guard';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post()
  async createUser(@Body() createUserDto: CreateUserDto) {
    return this.usersService.createUser(createUserDto);
  }

  @UseGuards(JwtAuthGuard)
  @Get('profile')
  async getProfile(@Req() req) {
    const userId = req.user.id;
    return this.usersService.getUserById(userId);
  }

  @UseGuards(JwtAuthGuard)
  @Delete('logout')
  async logout(@Req() req) {
    const userId = req.user.id;
    return this.usersService.logout(userId);
  }
}
