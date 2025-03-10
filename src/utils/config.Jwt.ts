import { ConfigService } from '@nestjs/config';

export const ConfigJwt = {
  inject: [ConfigService],
  useFactory: async (configService: ConfigService) => ({
    secret: configService.get<string>('JWT_SECRET'),
    signOptions: {
      expiresIn: configService.get('JWT_EXPIRATION_TIME'),
    },
  }),
};
