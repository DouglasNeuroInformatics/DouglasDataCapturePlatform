import { ApiProperty } from '@nestjs/swagger';

import { IsString, ValidateNested } from 'class-validator';

class InstrumentFieldDto {
  name: string;
  label: string;
  isRequired: boolean;
  type: string;
}

export class BaseInstrumentDto {
  @ApiProperty()
  @IsString()
  title: string;

  @ApiProperty()
  @IsString()
  description: string;

  @ApiProperty()
  @IsString()
  instructions: string;

  @ApiProperty()
  @ValidateNested()
  fields: InstrumentFieldDto[]
}
