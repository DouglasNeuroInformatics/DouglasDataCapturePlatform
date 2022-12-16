import { Type } from 'class-transformer';
import { IsNotEmpty, IsEnum, IsString, IsDate } from 'class-validator';

import { Sex } from '../../enums/index';

export class CreateSubjectDto {
  @IsString()
  @IsNotEmpty()
  firstName: string;

  @IsString()
  @IsNotEmpty()
  lastName: string;

  @IsDate()
  @Type(() => Date)
  @IsNotEmpty()
  dateOfBirth: Date;

  @IsEnum(Sex)
  sex: Sex;
}
