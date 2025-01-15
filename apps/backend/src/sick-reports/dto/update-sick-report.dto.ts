import { PartialType } from '@nestjs/swagger';
import { CreateSickReportDto } from './create-sick-report.dto';

export class UpdateSickReportDto extends PartialType(CreateSickReportDto) {}
