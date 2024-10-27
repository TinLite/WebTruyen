import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as session from 'express-session';
import { createClient } from 'redis';
import RedisStore from 'connect-redis';
import { ConfigService } from '@nestjs/config';
import * as passport from 'passport';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const configService = app.get(ConfigService);
  app.enableCors();
  app.setGlobalPrefix('/api');

  const sessionSecret = configService.get('SESSION_SECRET');
  const sessionMaxAge = configService.get('SESSION_MAX_AGE');
  const redisUrl = `redis://${configService.get('REDIS_HOST')}:${configService.get('REDIS_PORT')}`;
  let redisClient = createClient({
    url: redisUrl,
  });
  redisClient.connect().catch(console.error);
  let redisStore = new RedisStore({ client: redisClient, prefix: 'myapp:' });

  await app.listen(3000);
  app.use(
    session({
      store: redisStore,
      secret: sessionSecret,
      resave: false,
      saveUninitialized: false,
      cookie: { maxAge: sessionMaxAge, secure: false, httpOnly: true },
    }),
  );

  app.use(passport.initialize());
  app.use(passport.session());
}
bootstrap();
