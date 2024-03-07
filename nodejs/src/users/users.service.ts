import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { User } from './user.model';
import { CreateUserDto } from './create-user.dto';

@Injectable()
export class UsersService {
  constructor(
    @InjectModel(User)
    private readonly userModel: typeof User,
  ) {}

  async createUser(createUserDto: CreateUserDto): Promise<User> {
    const { email, password } = createUserDto;

    const newUser = await this.userModel.create({
      email,
      password,
    });

    return newUser;
  }

  async getUserById(userId: number): Promise<User> {
    const user = await this.userModel.findByPk(userId);

    if (!user) {
      throw new NotFoundException('User not found');
    }

    return user;
  }

  async getUserByEmail(email) {
    const user = await this.userModel.findOne({
      where: { email },
      include: { all: true },
    });
    return user;
  }

  async updateUserToken(userId: string, token: string): Promise<void> {
    const user = await this.userModel.findByPk(userId);

    if (!user) {
      throw new NotFoundException('User not found');
    }

    await this.userModel.update({ token }, { where: { id: userId } });
  }

  async logout(userId: number): Promise<void> {
    await this.userModel.update({ token: '' }, { where: { id: userId } });
  }
}
