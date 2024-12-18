import { NestFactory } from '@nestjs/core';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const config = new DocumentBuilder()
    .setTitle('Geoprofs API')
    .setDescription('De API voor het Geoprofs portaal, waarmee werknemers eenvoudig hun verlof en ziekte kunnen beheren. Managers en administrators kunnen via deze API verlofaanvragen goedkeuren en het ziekteverzuim monitoren.')
    .setVersion('1.0')
    .build();
  const documentFactory = () => SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, documentFactory);

  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
