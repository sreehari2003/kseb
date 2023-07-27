import { Inject, Injectable } from '@nestjs/common';
import supertokens from 'supertokens-node';
import Session from 'supertokens-node/recipe/session';
import Passwordless from 'supertokens-node/recipe/passwordless';

import { ConfigInjectionToken, AuthModuleConfig } from '../config.interface';
import { SmsService } from './sms.service';

@Injectable()
export class SupertokensService {
  constructor(
    @Inject(ConfigInjectionToken) private config: AuthModuleConfig,
    private readonly smsService: SmsService,
  ) {
    const send = (phone: string, userInput: string) => {
      this.smsService.smsSend(phone, userInput);
    };
    supertokens.init({
      appInfo: config.appInfo,
      supertokens: {
        connectionURI: config.connectionURI,
        apiKey: config.apiKey,
      },
      recipeList: [
        Passwordless.init({
          flowType: 'USER_INPUT_CODE',
          contactMethod: 'PHONE',
          smsDelivery: {
            override: (originalImplementation) => ({
              ...originalImplementation,
              async sendSms(input) {
                send(input.phoneNumber, input.userInputCode);
              },
            }),
          },
        }),
        Session.init(),
      ],
    });
  }
}
