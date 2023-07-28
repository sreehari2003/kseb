import { Module } from '@nestjs/common';
import * as Joi from 'joi';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { LoggerModule } from 'nestjs-pino';
import { ConfigModule } from '@nestjs/config';
import { PrismaModule } from './prisma/prisma.module';
import { AuthModule } from './auth/auth.module';
import { UserModule } from './user/user.module';
import { IssuesModule } from './issues/issues.module';

const coreModules = [
  ConfigModule.forRoot({
    isGlobal: true,
    validationSchema: Joi.object({
      DATABASE_URL: Joi.string(),
      WEBSITE_DOMAIN: Joi.string(),
      API_DOMAIN: Joi.string(),
      SUPERTOKENS_API_KEY: Joi.string(),
      SUPERTOKENS_URI: Joi.string(),
      PORT: Joi.string().optional(),
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
];

@Module({
  imports: [
    ...coreModules,
    AuthModule.forRoot({
      connectionURI: process.env.SUPERTOKENS_URI,
      apiKey: process.env.SUPERTOKENS_API_KEY,
      appInfo: {
        appName: 'KSEB',
        apiDomain: process.env.API_DOMAIN,
        websiteDomain: process.env.WEBSITE_DOMAIN,
        apiBasePath: '/api/v1',
        websiteBasePath: '/',
      },
    }),
    PrismaModule,
    UserModule,
    IssuesModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
