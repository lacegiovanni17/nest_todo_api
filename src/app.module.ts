import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TodosModule } from './todos/todos.module';

@Module({
  imports: [
    MongooseModule.forRoot(
      process.env.MONGO_URI ??
        'mongodb+srv://chidikehenry_db_user:9bIvljOZTuF70Hwy@cluster0.a4qkw6j.mongodb.net/',
    ),
    TodosModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
