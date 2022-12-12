import { ApiProperty } from '@nestjs/swagger';

import { Sex, SubjectType } from '@dnp/common/types';
import { IsNotEmpty, IsIn, IsDate } from 'class-validator';

export class CreateSubjectDto implements SubjectType {
  @ApiProperty({
    description: "The subject's first name",
    example: 'Jane'
  })
  @IsNotEmpty()
  firstName: string;

  @ApiProperty({
    description: "The subject's last name",
    example: 'Doe'
  })
  @IsNotEmpty()
  lastName: string;

  @ApiProperty({
    description: "The subject's date of birth",
    example: '2000-01-01'
  })
  @IsDate()
  dateOfBirth: Date;

  @ApiProperty({
    description: "The subject's biological sex",
    enum: ['male', 'female'],
  })
  @IsIn(['male', 'female'])
  sex: Sex;
}
