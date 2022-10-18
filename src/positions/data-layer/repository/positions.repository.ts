import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { FilterQuery, Model, ObjectId } from 'mongoose';
import { Position, PositionDocument } from '../schemas/positions.schema';

@Injectable()
export class PositionsRepository {
  constructor(
    @InjectModel(Position.name) private positionModel: Model<PositionDocument>,
  ) {}

  async findById(
    positionFilterQuery: FilterQuery<Position>,
  ): Promise<Position> {
    return this.positionModel.findById(positionFilterQuery).lean();
  }
  async findOne(positionFilterQuery: FilterQuery<Position>): Promise<Position> {
    return this.positionModel.findOne(positionFilterQuery).lean();
  }
  async find(positionFilterQuery?: FilterQuery<Position>): Promise<Position[]> {
    return this.positionModel.find(positionFilterQuery).lean();
  }
  async create(position: Position): Promise<Position> {
    const newPosition = new this.positionModel(position);
    return newPosition.save();
  }
  async findOneAndDelete(positionFilterQuery: ObjectId): Promise<Position> {
    return this.positionModel.findByIdAndDelete({ _id: positionFilterQuery });
  }
}
