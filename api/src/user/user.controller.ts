import { Controller, Get, UseGuards, Request } from '@nestjs/common';
import { UserService } from './user.service';
import { AuthGuard } from '../auth/auth.guard';
import { Session } from '../auth/session.decorator';
import { SessionRequest } from 'supertokens-node/lib/build/framework/express';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get('/')
  @UseGuards(new AuthGuard())
  async findUserByAuthId(@Request() _req: SessionRequest, @Session() session) {
    const userId = session.getUserid();
    return await this.userService.getUserByAuthId(userId);
  }
}
