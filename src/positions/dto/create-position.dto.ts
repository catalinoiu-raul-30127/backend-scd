import { IsDate, IsEmail, IsNotEmpty, IsString } from 'class-validator';

export class CreatePositionDto {
  @IsNotEmpty()
  @IsString()
  readonly terminalId: string;
  @IsNotEmpty()
  @IsEmail()
  readonly latitude: string;
  @IsNotEmpty()
  @IsString()
  readonly longitude: string;
  @IsNotEmpty()
  @IsString()
  readonly currentTime: string;
}
