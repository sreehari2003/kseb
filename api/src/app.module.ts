import { Module } from '@nestjs/common';
import * as Joi from 'joi';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { LoggerModule } from 'nestjs-pino';
import { ConfigModule } from '@nestjs/config';
import { PrismaModule } from './prisma/prisma.module';
import { AuthModule } from './auth/auth.module';
import { ENV } from './config';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      validationSchema: Joi.object({
        DATABASE_URL: Joi.string(),
        WEBSITE_DOMAIN: Joi.string(),
      }),
      validationOptions: {
        allowUnknown: true,
        abortEarly: true,
      },
    }),
    LoggerModule.forRoot({
      pinoHttp: {
        level: 'info',
        redact: ['req.headers', 'req.remoteAddress', 'res.headers'],
      },
    }),
    PrismaModule,
    AuthModule.forRoot({
      connectionURI: ENV.SUPERTOKENS_URI,
      apiKey: ENV.SUPERTOKENS_API_KEY,
      appInfo: {
        appName: 'KSEB',
        apiDomain: ENV.API_DOMAIN,
        websiteDomain: ENV.WEBSITE_DOMAIN,
        apiBasePath: '/api/v1',
        websiteBasePath: '/',
      },
    }),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
