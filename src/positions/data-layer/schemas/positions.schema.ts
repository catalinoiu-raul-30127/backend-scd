import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
export type PositionDocument = Position & Document;
@Schema()
export class Position {
  @Prop()
  terminalId: string;

  @Prop()
  latitude: string;

  @Prop()
  longitude: string;

  @Prop()
  currentTime: string;
}
export const PositionsSchema = SchemaFactory.createForClass(Position);
