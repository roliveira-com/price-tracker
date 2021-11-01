import { NestExpressApplication } from '@nestjs/platform-express';
import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { join } from 'path';
import * as hbs from 'hbs'
import * as session from 'express-session';
import * as passport from 'passport';
import * as Multer from 'multer';
import * as csurf from 'csurf';

import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(
    AppModule
  );

  hbs.registerPartials(join(__dirname, '..', 'views/partials'));

  app.useStaticAssets(join(__dirname, '..', 'public'));
  app.setBaseViewsDir(join(__dirname, '..', 'views'));
  app.useGlobalPipes(new ValidationPipe());
  app.setViewEngine('hbs');
  app.enableCors();

  app.set(
    'view options', 
    { layout: 'index' }
  );

  app.use(
    session({
      secret: process.env.SESSION_SECRET,
      resave: false,
      saveUninitialized: false,
      name: process.env.COOKIE_LABEL
    }),
  );

  app.use(passport.initialize());
  app.use(passport.session());
  app.use(Multer().none());
  //app.use(csurf())
  
  await app.listen(process.env.PORT || 3001);
}
bootstrap();
