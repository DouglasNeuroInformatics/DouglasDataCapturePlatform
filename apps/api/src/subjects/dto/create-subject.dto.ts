import { IsNotEmpty, IsOptional } from 'class-validator';

export type Diagnosis = 'SSD' | 'Affective Psychosis';

export class CreateSubjectDto {
  @IsNotEmpty()
  firstName: string;

  @IsNotEmpty()
  lastName: string;

  @IsOptional()
  dx?: Diagnosis;
}
