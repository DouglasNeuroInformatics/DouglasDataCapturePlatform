import { ApiProperty } from '@nestjs/swagger';

import { Sex, SubjectType } from '@dnp/common/types';
import { Type } from 'class-transformer';
import { IsNotEmpty, IsIn, IsString, IsDate } from 'class-validator';

export class CreateSubjectDto implements SubjectType {
  @ApiProperty({
    description: "The subject's first name",
    example: 'Jane'
  })
  @IsString()
  @IsNotEmpty()
  firstName: string;

  @ApiProperty({
    description: "The subject's last name",
    example: 'Doe'
  })
  @IsString()
  @IsNotEmpty()
  lastName: string;

  @ApiProperty({
    description: "The subject's date of birth",
    example: '2000-01-01'
  })
  @IsDate()
  @Type(() => Date)
  @IsNotEmpty()
  dateOfBirth: Date;

  @ApiProperty({
    description: "The subject's biological sex",
    enum: ['male', 'female']
  })
  @IsNotEmpty()
  @IsIn(['male', 'female'])
  sex: Sex;
}
