import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';

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
}
