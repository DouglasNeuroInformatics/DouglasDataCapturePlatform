import { PartialType } from '@nestjs/swagger';

import { CreateUserReqDto } from './create-user.dto';

export class UpdateUserReqDto extends PartialType(CreateUserReqDto) {}
