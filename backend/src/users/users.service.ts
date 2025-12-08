import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { PrismaService  } from 'src/prisma/prisma.service';
import * as bcrypt from 'bcrypt';
import { RegisterDto } from './dto/register-user.dto';

export const roundsOfHashing = 10;

@Injectable()
export class UsersService {
  constructor(private prisma: PrismaService){}

  async create(createUserDto: CreateUserDto) {
    const hashedPassword = await bcrypt.hash(
      createUserDto.password,
      roundsOfHashing,
    );

    createUserDto.password = hashedPassword;
    return this.prisma.user.create({data: createUserDto});
  }

  findAll() {
    return this.prisma.user.findMany();
  }

  async findOne(uid: number) {
    const user = await this.prisma.user.findUnique({where: { uid:uid }})
    if(!user){
      throw new NotFoundException(`用户 ${uid} 不存在`);
    }
    return user;
  }

  async update(uid: number, updateUserDto: UpdateUserDto) {
    if (updateUserDto.password) {
      updateUserDto.password = await bcrypt.hash(
        updateUserDto.password,
        roundsOfHashing,
      );
    }
    return this.prisma.user.update({where: { uid }, data:updateUserDto});
  }

  remove(uid: number) {
    return this.prisma.user.delete({where: { uid }});
  }
  
  //另外使用register方法确保用户不会自己添加商家选项
  async register(registerDto: RegisterDto) {
    // 哈希密码
    const hashedPassword = await bcrypt.hash(registerDto.password, 10);
    
    // 直接创建（唯一约束错误会被全局过滤器处理）
    return this.prisma.user.create({
      data: {
        username: registerDto.username,
        password: hashedPassword,
        email: registerDto.email,
        isseller: false,  // 新用户默认不是卖家
      },
      select: {  // 不返回敏感信息
        uid: true,
        username: true,
        email: true,
        isseller: true
      }
    });
  }
}