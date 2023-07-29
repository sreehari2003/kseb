import {
  Controller,
  Get,
  UseGuards,
  Request,
  Post,
  Body,
} from '@nestjs/common';
import { UserService } from './user.service';
import { AuthGuard } from '../auth/auth.guard';
import { Session } from '../auth/session/session.decorator';
import { SessionRequest } from 'supertokens-node/lib/build/framework/express';
import { User } from './dto/user.dto';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get('')
  @UseGuards(new AuthGuard())
  async findUserByAuthId(@Request() _req: SessionRequest, @Session() session) {
    const userId = session.getUserid();
    return await this.userService.getUserByAuthId(userId);
  }

  @Post('')
  @UseGuards(new AuthGuard())
  async createNewUser(
    @Request() _req: SessionRequest,
    @Session() session,
    @Body() data: User,
  ) {
    const userId = session.getUserid();
    data.authId = userId;
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    // having some ts error becuase of prisma schema
    return await this.userService.createNewUser(data);
  }
}
