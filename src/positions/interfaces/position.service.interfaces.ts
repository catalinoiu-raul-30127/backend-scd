import { ObjectId } from 'mongoose';
import { Position } from '../data-layer/schemas/positions.schema';

export interface PositionsServiceInterface {
  getPositionById(userId: ObjectId): Promise<Position>;
  getPositionByTerminalId(terminalId: string): Promise<Position>;
  getPositions(): Promise<Position[]>;
  createPosition(
    terminalId: string,
    longitude: string,
    latitude: string,
    currentTime: string,
  ): Promise<Position>;
}
