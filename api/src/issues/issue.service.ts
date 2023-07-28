import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { Issue } from './issue.interface';

@Injectable()
export class IssueService {
  constructor(private readonly prisma: PrismaService) {}
  async getAllIssues() {
    try {
      const data = this.prisma.issue.findMany();
      if (!data) {
        throw new Error();
      }
      return {
        ok: true,
        message: 'Issue found succesfully',
        data: data,
      };
    } catch {
      return {
        ok: false,
        message: 'Error getting all issues',
      };
    }
  }
  async createIssue(info: Issue) {
    try {
      const data = this.prisma.issue.create({
        data: {
          title: info.title,
          photo: info.photo,
          desc: info.desc,
          postID: info.postID,
        },
      });
      if (!data) {
        throw new Error();
      }
      return {
        ok: true,
        message: 'Issue was created',
        data: data,
      };
    } catch {
      return {
        ok: false,
        message: 'Error creating issue, please try again',
      };
    }
  }
}
