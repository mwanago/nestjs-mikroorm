import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { MikroOrmModule } from '@mikro-orm/nestjs';
import Address from '../users/address.entity';
import { FlushMode } from '@mikro-orm/core/enums';

@Module({
  imports: [
    MikroOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => ({
        dbName: configService.get('POSTGRES_DB'),
        user: configService.get('POSTGRES_USER'),
        password: configService.get('POSTGRES_PASSWORD'),
        host: configService.get('POSTGRES_HOST'),
        port: configService.get('POSTGRES_PORT'),
        type: 'postgresql',
        autoLoadEntities: true,
        entities: [Address],
        flushMode: FlushMode.COMMIT,
        debug: configService.get('SHOULD_DEBUG_SQL'),
      }),
    }),
  ],
})
export class DatabaseModule {}
