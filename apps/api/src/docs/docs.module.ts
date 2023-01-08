import path from 'path';

import { Module } from '@nestjs/common';

import { DocsService } from './docs.service';

@Module({
  providers: [DocsService]
})
export class DocsModule { }
