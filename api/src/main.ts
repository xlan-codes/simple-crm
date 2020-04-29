import { HttpAdapterHost, NestFactory } from '@nestjs/core';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { AppModule } from './app.module';
import { AllExceptionsFilter } from './error-handler/handler';
import * as bodyParser from 'body-parser';
import * as compression from 'compression';
import * as rateLimit from 'express-rate-limit';
import * as express from 'express';
import * as helmet from 'helmet';

// const app = express();

// app.use(helmet())
//   .use(compression())
//   .use(bodyParser.json())
//   .use(
//     bodyParser.urlencoded({
//       extended: true
//     })
//   )
//   .use(rateLimit({
//     windowMs: 15 * 60 * 1000, // 15 minutes
//     max: 100 // limit each IP to 100 requests per windowMs
//   }));

async function bootstrap() {
  // const a = app as any;
  const nestApp = await NestFactory.create(AppModule);
  nestApp.enableCors();

  const { httpAdapter } = nestApp.get(HttpAdapterHost);
  nestApp.useGlobalFilters(new AllExceptionsFilter(httpAdapter));

    const options = new DocumentBuilder()
    .setTitle('IBX TaskManagment Api')
    .setDescription('The IBX TaskManagment Api API description')
    .setVersion('1.0')
    .addTag('ibx')
    .build();
    const options2 = {
      // customCss: '.swagger-ui .topbar { display: none }'
        customCss: `
        .topbar-wrapper img {content:url(\'../assets/logo.svg\'); width:150px; height:auto;}
        .swagger-ui .topbar { background-color: white; }
        `
    };
  const document = SwaggerModule.createDocument(nestApp, options);
  SwaggerModule.setup('api', nestApp, document, options2);

  await nestApp.listen(3000);
}
bootstrap();
