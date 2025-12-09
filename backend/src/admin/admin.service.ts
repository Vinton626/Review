import {
    Injectable,
    NotFoundException,
    UnauthorizedException,
  } from '@nestjs/common';
  import { PrismaService } from './../prisma/prisma.service';
  import { JwtService } from '@nestjs/jwt';
  import { AdminEntity } from './entity/admin.entity';
  
  @Injectable()
  export class AdminService {
    constructor(private prisma: PrismaService, private jwtService: JwtService) {}

    private readonly adminCredentials = {
      username: process.env.ADMIN_USERNAME || 'admin',
      password: process.env.ADMIN_PASSWORD || 'admin123',
      userId: parseInt(process.env.ADMIN_USER_ID || '9999')
    };
  
    async admin(username: string, password: string): Promise<AdminEntity> {
      
    // 1. 检查是否是环境变量配置的管理员
    if (username === this.adminCredentials.username && 
        password === this.adminCredentials.password) {
      return {
        accessToken: this.jwtService.sign({
          userId: this.adminCredentials.userId,
          username: username,
          isadmin: true,
          isseller: false,
          type: 'system-admin'  // 系统管理员类型
        })
      };
    }

      const user = await this.prisma.user.findUnique({ where: { username: username } });
  
      
      if (!user||user.password !== password) {
        throw new NotFoundException(`"${username}"凭证错误`);
      }
  
      return {
        accessToken: this.jwtService.sign({ 
          userId: user.uid,
          username: user.username
        }),
      };
    }
  }