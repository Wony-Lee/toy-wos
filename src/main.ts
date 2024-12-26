import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ConfigService } from '@nestjs/config';
import { ValidationPipe, VersioningType } from '@nestjs/common';
import { swaggerOptions } from './utils/swaggerOptions';
import { NestExpressApplication } from '@nestjs/platform-express';
import { templateEngineOptions } from './utils/templateEngineOptions';

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);
  const configService = app.get(ConfigService);

  app.enableShutdownHooks();

  app.enableCors({
    origin: '*',
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE,OPTIONS',
    credentials: true,
    allowedHeaders: '*',
    optionsSuccessStatus: 200,
    exposedHeaders: ['etag'],
  });
  app.enableVersioning({
    type: VersioningType.URI,
    prefix: 'v',
  });
  app.useGlobalPipes(
    new ValidationPipe({
      transform: true,
    }),
  );

  swaggerOptions(app);
  templateEngineOptions(app);

  const PORT = configService.get('SERVER_PORT');
  await app.listen(PORT || 3000);

  console.log(`Server running on ${await app.getUrl()}`);
}
bootstrap();
