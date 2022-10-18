import { Injectable } from '@nestjs/common';
import { Date, ObjectId } from 'mongoose';
import { PositionsRepository } from './data-layer/repository/positions.repository';
import { Position } from './data-layer/schemas/positions.schema';
import { PositionsServiceInterface } from './interfaces/position.service.interfaces';

@Injectable()
export class PositionsService implements PositionsServiceInterface {
  constructor(private readonly positionsRepository: PositionsRepository) {}

  async getPositionById(positionId: ObjectId): Promise<Position> {
    return this.positionsRepository.findById(positionId);
  }

  async getPositionByTerminalId(terminalId: string): Promise<Position> {
    return this.positionsRepository.findOne({ terminalId });
  }

  async getPositions(): Promise<Position[]> {
    return this.positionsRepository.find({});
  }

  async createPosition(
    terminalId: string,
    latitude: string,
    longitude: string,
    currentTime: string,
  ): Promise<Position> {
    return this.positionsRepository.create({
      terminalId,
      latitude,
      longitude,
      currentTime,
    });
  }
}
