import { ValidationPipe } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { NestFactory } from '@nestjs/core';
import RedisStore from 'connect-redis';
import * as session from 'express-session';
import * as passport from 'passport';
import { createClient } from 'redis';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const configService = app.get(ConfigService);
  app.enableCors({
    origin: 'http://localhost:5173',
    credentials: true,
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
  });
  app.setGlobalPrefix('/api');

  const sessionSecret = configService.get('SESSION_SECRET');
  const sessionMaxAge = Number(configService.get('SESSION_MAX_AGE'));
  const redisUrl = `redis://${configService.get('REDIS_HOST')}:${configService.get('REDIS_PORT')}`;
  let redisClient = createClient({
    url: redisUrl,
  });
  redisClient.on('error', console.error);
  redisClient.connect().catch(console.error);
  let redisStore = new RedisStore({
    client: redisClient,
    prefix: 'nettruyen:',
  });

  app.use(
    session({
      store: redisStore,
      secret: sessionSecret,
      resave: false,
      saveUninitialized: false,
      cookie: { maxAge: sessionMaxAge, secure: false, httpOnly: true },
    }),
  );

  // console.log(`Session secret: ${sessionSecret}, max age: ${sessionMaxAge}`);
  // console.log(`Redis URL: ${redisUrl}`);

  app.use(passport.initialize());
  app.use(passport.session());
  app.useGlobalPipes(new ValidationPipe());

  await app.listen(3000);
}
bootstrap();
