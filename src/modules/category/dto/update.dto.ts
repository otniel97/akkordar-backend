import { PartialType, OmitType } from '@nestjs/mapped-types';
import { CreateCategoryDto } from './create.dto';

export class UpdateCategoryDto extends PartialType(
    OmitType(CreateCategoryDto, ['status'] as const)
) {}
