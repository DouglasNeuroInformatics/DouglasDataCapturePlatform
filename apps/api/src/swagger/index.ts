import fs from 'fs';
import path from 'path';

import { NestExpressApplication } from '@nestjs/platform-express';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

export class Swagger {
  private static staticDir = path.join(__dirname, 'static');

  static init(app: NestExpressApplication): void {
    const documentConfig = new DocumentBuilder()
      .setTitle('Douglas Data Capture Platform API')
      .setDescription('This is the autogenerated API documentation for the Douglas Data Capture Platform.')
      .setLicense('GNU Affero General Public License', 'https://www.gnu.org/licenses/agpl-3.0.txt')
      .setVersion('1.0')
      .addBearerAuth(
        {
          bearerFormat: 'JWT',
          description: 'This is a test description',
          type: 'http',
          scheme: 'bearer'
        },
        'accessToken'
      )
      .addTag('instruments')
      .addTag('users')
      .build();

    const document = SwaggerModule.createDocument(app, documentConfig);
    SwaggerModule.setup('api', app, document, {
      customJsStr: this.loadStaticFile('swagger.custom.js'),
      customSiteTitle: 'Douglas Data Capture Platform API Docs',
      swaggerOptions: {}
    });
  }

  private static loadStaticFile(filename: string): string {
    return fs.readFileSync(path.join(this.staticDir, filename), 'utf-8');
  }
}
