import { Module } from '@nestjs/common';
import { UsersModule } from './users/users.module';
import { PositionsModule } from './positions/positions.module';
import { MongooseModule } from '@nestjs/mongoose';
import * as dotenv from 'dotenv';
import { AuthModule } from './auth/auth.module';
dotenv.config();

@Module({
  imports: [
    UsersModule,
    PositionsModule,
    MongooseModule.forRoot(process.env.MONGO_URL),
    AuthModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
