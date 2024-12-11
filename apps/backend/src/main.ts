import { NestFactory } from "@nestjs/core";
import { AppModule } from "./app.module";
import { setupSwagger } from "./swagger.config";

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // Gebruik de aparte Swagger-configuratie
  setupSwagger(app);

  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
