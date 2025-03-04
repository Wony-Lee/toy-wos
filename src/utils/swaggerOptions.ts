import { INestApplication } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import * as expressBasicAuth from 'express-basic-auth';
import { ConfigService } from '@nestjs/config';

export const swaggerOptions = (app: INestApplication): void => {
  const configService = app.get(ConfigService);
  app.use(
    ['/docs'],
    expressBasicAuth({
      challenge: true,
      users: {
        [configService.get('SWAGGER_ID')]: configService.get('SWAGGER_PW'),
      },
    }),
  );

  const options = new DocumentBuilder()
    .setTitle('SWAGGER API')
    .setDescription('word-of-support API document')
    .setVersion('0.0.1')
    .addSecurityRequirements('access-token')
    .addBearerAuth(
      {
        type: 'http',
        scheme: 'bearer',
        name: 'jwt',
        in: 'header',
      },
      'accessToken',
    )
    .build();

  const document = SwaggerModule.createDocument(app, options);

  SwaggerModule.setup('docs', app, document, {
    swaggerOptions: {
      persistAuthorization: true,
    },
  });

  SwaggerModule.setup('docs', app, document);
};
