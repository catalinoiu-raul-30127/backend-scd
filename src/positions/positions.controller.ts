import {
  Body,
  Controller,
  Get,
  HttpStatus,
  Param,
  Post,
  Res,
  UseGuards,
} from '@nestjs/common';
import { ObjectId } from 'mongoose';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { Position } from './data-layer/schemas/positions.schema';
import { CreatePositionDto } from './dto/create-position.dto';
import { PositionsService } from './positions.service';

@Controller('positions')
export class PositionsController {
  constructor(private readonly positionsService: PositionsService) {}
  @UseGuards(JwtAuthGuard)
  @Get('/:id')
  async getPositionsById(
    @Res() res,
    @Param('id') id: ObjectId,
  ): Promise<Position> {
    const position = await this.positionsService.getPositionById(id);
    if (!position) {
      return res
        .status(HttpStatus.NOT_FOUND)
        .json({ message: 'No position found' });
    }
    return res.status(HttpStatus.OK).json(position);
  }
  @UseGuards(JwtAuthGuard)
  @Get()
  async getPositions(@Res() res): Promise<Position[]> {
    const positions = await this.positionsService.getPositions();
    if (positions.length === 0) {
      return res
        .status(HttpStatus.NOT_FOUND)
        .json({ message: 'No positions found' });
    }
    return res.status(HttpStatus.OK).json(positions);
  }
  @UseGuards(JwtAuthGuard)
  @Post()
  async createUser(
    @Res() res,
    @Body() createPositionDto: CreatePositionDto,
  ): Promise<Position> {
    const position = await this.positionsService.createPosition(
      createPositionDto.terminalId,
      createPositionDto.latitude,
      createPositionDto.longitude,
      createPositionDto.currentTime,
    );
    return res.status(HttpStatus.CREATED).json({
      message: 'Location successfully created',
      position: position,
    });
  }
}
