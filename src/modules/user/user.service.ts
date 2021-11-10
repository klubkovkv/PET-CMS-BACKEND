import { Injectable } from '@nestjs/common';
import { UserEntity } from '@app/modules/user/user.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { FindConditions, Repository } from 'typeorm';
import { UpdateUserDto } from '@app/modules/user/dto/updateUser.dto';
import { UserRegisterDto } from '@app/modules/user/dto/userRegister.dto';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(UserEntity)
    private readonly userRepository: Repository<UserEntity>,
  ) {}

  findOne(findData): Promise<UserEntity> {
    return this.userRepository.findOne(findData);
  }

  async createUser(createUserDto: UserRegisterDto): Promise<UserEntity> {
    const newUser = new UserEntity();
    Object.assign(newUser, createUserDto);
    return await this.userRepository.save(newUser);
  }

  async updateUser(
    userId: number,
    updateUserDto: UpdateUserDto,
  ): Promise<UserEntity> {
    const user = await this.findOne(userId);
    Object.assign(user, updateUserDto);
    return await this.userRepository.save(user);
  }
}
