import * as Joi from '@hapi/joi';

export const configValidationSchema = Joi.object({
  NODE_ENV: Joi.string().valid('DEV', 'PROD', 'LOCAL').required(),
  DB_HOST: Joi.string().required(),
  DB_PORT: Joi.number().required(),
  DB_USERNAME: Joi.string().required(),
  DB_PASSWORD: Joi.string().required(),
  DB_TIMEZONE: Joi.string().required(),
  // DB_NAME: Joi.string().required,
  DB_TYPE: Joi.string().required(),
  JWT_SECRET: Joi.string().required(),
  JWT_ISSUER: Joi.string().required(),
  JWT_EXPIRATION_IN: Joi.number().required(),
});
