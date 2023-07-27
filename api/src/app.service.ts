import { Injectable } from '@nestjs/common';
import { ENV } from './config';

@Injectable()
export class AppService {
  getStatus() {
    return {
      ok: true,
      message: 'Server running on port ' + ENV.PORT,
    };
  }
}
