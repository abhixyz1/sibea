import { NestFactory } from '@nestjs/core';
import { ValidationPipe } from '@nestjs/common';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { ConfigService } from '@nestjs/config';
import { Logger } from 'nestjs-pino';
import helmet from 'helmet';
import * as cookieParser from 'cookie-parser';

import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, { bufferLogs: true });
  
  const configService = app.get(ConfigService);
  const logger = app.get(Logger);
  
  app.useLogger(logger);
  
  // Security
  app.use(helmet());
  app.use(cookieParser());
  
  // CORS
  app.enableCors({
    origin: [
      'http://localhost:5173',
      'http://127.0.0.1:5173',
      configService.get('CORS_ORIGIN', 'http://localhost:5173')
    ],
    credentials: true,
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization', 'Accept'],
  });
  
  // Global prefix
  app.setGlobalPrefix('api');
  
  // Validation
  app.useGlobalPipes(
    new ValidationPipe({
      transform: true,
      whitelist: true,
      forbidNonWhitelisted: true,
    }),
  );
  
  // Swagger documentation
  if (configService.get('NODE_ENV') !== 'production') {
    const config = new DocumentBuilder()
      .setTitle('SIBEA API')
      .setDescription('Sistem Informasi Beasiswa Daerah Kota Malang API Documentation')
      .setVersion('1.0')
      .addBearerAuth()
      .build();
    
    const document = SwaggerModule.createDocument(app, config);
    SwaggerModule.setup('api/docs', app, document);
  }
  
  const port = configService.get('PORT', 3000);
  await app.listen(port);
  
  logger.log(`Application is running on: http://localhost:${port}/api`);
  if (configService.get('NODE_ENV') !== 'production') {
    logger.log(`Swagger documentation: http://localhost:${port}/api/docs`);
  }
}

bootstrap();

