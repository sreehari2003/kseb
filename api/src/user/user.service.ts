import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { User } from '@prisma/client';

@Injectable()
export class UserService {
  constructor(private readonly prisma: PrismaService) {}
  async getUserByAuthId(authId: string) {
    try {
      const data = await this.prisma.user.findUnique({
        where: {
          authId: authId,
        },
      });

      return {
        ok: true,
        data,
        message: 'Request completed Successfully',
      };
    } catch {
      return {
        ok: false,
        message: 'failed to get the user try login again',
      };
    }
  }

  async createNewUser(user: User) {
    const oldUser = await this.prisma.user.findUnique({
      where: {
        authId: user.authId,
      },
    });
    if (oldUser) {
      return {
        ok: true,
        data: oldUser,
        message: 'Request completed Successfully',
      };
    }

    try {
      const data = await this.prisma.user.create({
        data: {
          authId: user.authId,
          name: user.name,
          location: user.location,
          role: user.role,
          phone: user.phone,
        },
      });
      return {
        ok: true,
        data,
        message: 'User created Successfully',
      };
    } catch {
      return {
        ok: false,
        message: 'Error creating user',
      };
    }
  }
}
