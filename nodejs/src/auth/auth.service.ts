import {
  Injectable,
  UnauthorizedException,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import { UsersService } from '../users/users.service';
import { JwtService } from '@nestjs/jwt';
import { LoginDto } from './auth.dto';
import * as bcrypt from 'bcrypt';
import { CreateUserDto } from 'src/users/create-user.dto';
import { User } from 'src/users/user.model';

@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UsersService,
    private readonly jwtService: JwtService,
  ) {}

  async register(userDto: CreateUserDto) {
    const candidate = await this.userService.getUserByEmail(userDto.email);

    if (candidate) {
      throw new HttpException('User already exists', HttpStatus.BAD_REQUEST);
    }

    const hashPassword = await bcrypt.hash(userDto.password, 5);
    const user = await this.userService.createUser({
      ...userDto,
      password: hashPassword,
    });

    return this.generateToken(user);
  }

  async login(loginDto: LoginDto) {
    const user = await this.validateUser(loginDto);
    return this.generateToken(user);
  }

  async logout(userId: string) {
    await this.userService.updateUserToken(userId, '');
  }

  private async generateToken(user: User) {
    const payload = {
      email: user.email,
      id: user.id,
    };

    return {
      token: this.jwtService.sign(payload),
    };
  }

  private async validateUser(userDto: CreateUserDto) {
    const user = await this.userService.getUserByEmail(userDto.email);
    const passwordEquels = await bcrypt.compare(
      userDto.password,
      user.password,
    );

    console.log(await bcrypt.compare(userDto.password, user.password));

    if (user && passwordEquels) {
      return user;
    }

    throw new UnauthorizedException({
      message: 'Incorrect username or password',
    });
  }
}
