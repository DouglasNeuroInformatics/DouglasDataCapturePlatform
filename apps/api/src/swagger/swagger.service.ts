import fs from 'fs';
import path from 'path';

import { Injectable } from '@nestjs/common';
import { NestExpressApplication } from '@nestjs/platform-express';
import { OpenAPIObject, SwaggerModule } from '@nestjs/swagger';

import yaml from 'js-yaml';

@Injectable()
export class SwaggerService {
  private resourcesDir = path.join(__dirname, 'resources');

  setupSwagger(app: NestExpressApplication): void {
    const document = this.createDocument(app);
    SwaggerModule.setup('api', app, document, {
      customJsStr: this.loadResourceAsTxt('swagger.custom.js'),
      customCss: this.loadResourceAsTxt('swagger.custom.css'),
      customSiteTitle: 'Douglas Data Capture Platform API Docs'
    });
  }
  
  createDocument(app: NestExpressApplication): OpenAPIObject {
    const config = this.loadConfig();
    return SwaggerModule.createDocument(app, config);
  }

  private loadConfig(): Omit<OpenAPIObject, 'paths'> {
    return yaml.load(this.loadResourceAsTxt('swagger.config.yaml')) as Omit<OpenAPIObject, 'paths'>;
  }
  
  private loadResourceAsTxt(filename: string): string {
    return fs.readFileSync(path.join(this.resourcesDir, filename), 'utf-8');
  }
}
