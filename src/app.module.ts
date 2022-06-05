import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import * as Joi from 'joi';
import { DatabaseModule } from './database/database.module';
import { PostsModule } from './posts/posts.module';
import { AuthenticationModule } from './authentication/authentication.module';
import CategoriesModule from './categories/categories.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      validationSchema: Joi.object({
        POSTGRES_HOST: Joi.string().required(),
        POSTGRES_PORT: Joi.number().required(),
        POSTGRES_USER: Joi.string().required(),
        POSTGRES_PASSWORD: Joi.string().required(),
        POSTGRES_DB: Joi.string().required(),
        JWT_SECRET: Joi.string().required(),
        JWT_EXPIRATION_TIME: Joi.string().required(),
        SHOULD_DEBUG_SQL: Joi.boolean(),
      }),
    }),
    DatabaseModule,
    PostsModule,
    AuthenticationModule,
    CategoriesModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
