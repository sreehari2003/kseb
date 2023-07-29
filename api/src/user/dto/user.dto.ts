import { IsNotEmpty, IsString } from 'class-validator';

export class User {
  @IsNotEmpty()
  @IsString()
  name: string;

  @IsString()
  authId: string;

  @IsNotEmpty()
  @IsString()
  role: string;

  @IsNotEmpty()
  @IsString()
  phone: string;

  @IsNotEmpty()
  @IsString()
  location: string;
}

enum Role {
  'AE',
  'SE',
  'OV',
  'LM',
}
