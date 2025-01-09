import { NestFactory } from "@nestjs/core";
import { DocumentBuilder, SwaggerModule } from "@nestjs/swagger";
import { AppModule } from "./app.module";

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const config = new DocumentBuilder()
    .setTitle("Geoprofs API")
    .setDescription(
      "The API for the Geoprofs portal, allowing employees to easily manage their leave and illness. Managers and administrators can use this API to approve leave requests and monitor absenteeism."
    )
    .setVersion("1.0")
    .build();
  const documentFactory = () => SwaggerModule.createDocument(app, config);
  SwaggerModule.setup("api", app, documentFactory);

  await app.listen(process.env.PORT ?? 8080);
}
bootstrap();
