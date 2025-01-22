import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PostsModule } from './posts/posts.module';
import { ConfigModule } from '@nestjs/config';
import { configValidationSchema } from './utils/configVaildationSchema';
import { TypeOrmModule } from '@nestjs/typeorm';
import { typeOrmModuleOptions } from './utils/typeOrmModuleOptions';
import { UsersModule } from './users/users.module';
import { AuthModule } from './auth/auth.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      validationSchema: configValidationSchema,
      envFilePath: `${__dirname}/../.env.${process.env.NODE_ENV}`,
    }),
    TypeOrmModule.forRootAsync(typeOrmModuleOptions),
    PostsModule,
    UsersModule,
    AuthModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
