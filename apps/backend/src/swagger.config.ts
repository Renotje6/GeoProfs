import { INestApplication } from "@nestjs/common";
import { DocumentBuilder, SwaggerModule } from "@nestjs/swagger";

export function setupSwagger(app: INestApplication): void {
  const config = new DocumentBuilder()
    .setTitle("GeoProfs API")
    .setDescription(
      "GeoProfs API offers tools for working with geographic and location-based data."
    )
    .setVersion("1.0")
    .addTag("geoprofs")
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup("api", app, document);
}
