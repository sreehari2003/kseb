import { HttpService } from '@nestjs/axios';
import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { catchError, firstValueFrom } from 'rxjs';

@Injectable()
export class SmsService {
  constructor(
    private readonly httpService: HttpService,
    private configService: ConfigService,
  ) {}

  async smsSend(phone: string, otp: string) {
    const headerValues = {
      authkey: this.configService.get<string>('MSG91_AUTH_KEY') as string,
      'content-type': 'application/json' as string,
    };

    await firstValueFrom(
      this.httpService
        .post(
          this.configService.get<string>('MSG91_API_DOMAIN') as string,
          {
            flow_id: this.configService.get<string>('MSG91_FLOW_ID'),
            sender: this.configService.get<string>('MSG91_SENDER_ID'),
            short_url: this.configService.get<string>('MSG91_SHORT_URL'),
            mobiles: phone,
            OTP: otp,
          },
          {
            headers: headerValues,
          },
        )
        .pipe(
          catchError((error: any) => {
            throw error;
          }),
        ),
    );
  }
}
