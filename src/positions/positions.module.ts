import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { PositionsRepository } from './data-layer/repository/positions.repository';
import {
  Position,
  PositionsSchema,
} from './data-layer/schemas/positions.schema';
import { PositionsController } from './positions.controller';
import { PositionsService } from './positions.service';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Position.name, schema: PositionsSchema },
    ]),
  ],
  controllers: [PositionsController],
  providers: [PositionsService, PositionsRepository],
  exports: [PositionsService],
})
export class PositionsModule {}
