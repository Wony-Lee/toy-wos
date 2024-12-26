import { ConfigService } from '@nestjs/config';
import { TypeOrmModuleOptions } from '@nestjs/typeorm';
import { SnakeNamingStrategy } from 'typeorm-naming-strategies';
import { DataSource } from 'typeorm';
import { addTransactionalDataSource } from 'typeorm-transactional';
import { config } from 'process';

export const typeOrmModuleOptions = {
  inject: [ConfigService],
  useFactory: async (
    configService: ConfigService,
  ): Promise<TypeOrmModuleOptions> => ({
    namingStrategy: new SnakeNamingStrategy(),
    type: 'mysql',
    host: configService.get('DB_HOST'),
    port: configService.get('DB_PORT'),
    // name: configService.get('DB_NAME'),
    username: configService.get('DB_USERNAME'),
    password: configService.get('DB_PASSWORD'),
    database: configService.get('DB_DATABASE'),
    entities: [__dirname + '../**/*.entity{.ts,.js}'],
    synchronize: configService.get('NODE_ENV') === 'LOCAL',
    logging: configService.get('NODE_ENV') === 'LOCAL',
    timezone: configService.get('DB_TIMEZONE'),
    autoLoadEntities: true,
    charset: 'utf8mb4_unicode_ci',
    extra: {
      connectionLimit: configService.get('DB_MAX'),
    },
  }),

  //  async dataSourceFactory(option) {
  //         if (!option) throw new Error('Invalid options passed');

  //         return addTransactionalDataSource(new DataSource(option));
  //       },
};
