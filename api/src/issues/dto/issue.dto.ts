import { IsNotEmpty, IsString } from 'class-validator';

export class IssueDto {
  @IsString()
  @IsNotEmpty()
  title: string;

  @IsString()
  photo?: string;

  @IsString()
  @IsNotEmpty()
  desc: string;

  @IsString()
  @IsNotEmpty()
  postID: string;
}
