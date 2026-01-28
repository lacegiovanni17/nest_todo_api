import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TodosModule } from './todos/todos.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true, // makes ConfigService available everywhere
    }),

    MongooseModule.forRootAsync({
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => {
        const mongo_uri = configService.get<string>('MONGO_URI');
        if (!mongo_uri) throw new Error('MONGO_URI is not set in .env');
        return { uri: mongo_uri };
      },
    }),

    TodosModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
