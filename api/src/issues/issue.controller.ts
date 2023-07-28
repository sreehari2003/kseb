import { Body, Controller, Get, Post } from '@nestjs/common';
import { IssueService } from './issue.service';
import { IssueDto } from './dto/issue.dto';

@Controller('issue')
export class Issuecontroller {
  constructor(private readonly issue: IssueService) {}
  @Get('')
  async allIssues() {
    return await this.issue.getAllIssues();
  }
  @Post('')
  async createIssue(@Body() data: IssueDto) {
    return await this.issue.createIssue(data);
  }
}
