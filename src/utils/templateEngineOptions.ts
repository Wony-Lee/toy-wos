import { NestExpressApplication } from '@nestjs/platform-express';
import { join } from 'path';

export const templateEngineOptions = (app: NestExpressApplication): void => {
  app.setBaseViewsDir(join(__dirname, '../../src', 'views'));
  app.setViewEngine('hbs');
  //   app.engine('hbs', require('hbs').__express);
  app.useStaticAssets(join(__dirname, '..', 'public'));
  //   app.set('view cache', true);
  app.enableCors();
  //   app.use((req, res, next) => {
  //     res.header('Access-Control-Allow-Origin', '*');
  //     res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
  //     res.header(
  //       'Access-Control-Allow-Headers',
  //       'Origin, X-Requested-With, Content-Type, Accept',
  //     );
  //     next();
  //   });
  //   app.use((req, res, next) => {
  //     res.locals = {
  //       ...res.locals,
  //       title: 'WOS ADMIN',
  //       description: 'WOS ADMIN',
  //     };
  //   });
};
