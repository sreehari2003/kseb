import { IsNotEmpty, IsString } from 'class-validator';

export class IssueDto {
  @IsString()
  @IsNotEmpty()
  title: string;

  photo?: string;

  @IsString()
  @IsNotEmpty()
  desc: string;

  @IsString()
  @IsNotEmpty()
  post_id: string;
}
