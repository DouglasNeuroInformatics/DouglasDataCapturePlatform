import { IsOptional } from 'class-validator';

import { Diagnosis } from './create-subject.dto';

export class SubjectsFilterDto {
  @IsOptional()
  dx?: Diagnosis;
}
