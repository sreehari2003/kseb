import { Module } from '@nestjs/common';
import { Issuecontroller } from './issue.controller';
import { IssueService } from './issue.service';
import { PrismaModule } from 'src/prisma/prisma.module';

@Module({
  imports: [PrismaModule],
  providers: [IssueService],
  controllers: [Issuecontroller],
})
export class IssuesModule {}
