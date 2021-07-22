import { IsBoolean, IsEnum, IsString, Length } from 'class-validator';
import { EnumToString } from 'src/helpers/enumToString';
import { CategoryType } from '../enums'

export class CreateCategoryDto {
  @IsString()
  @Length(5, 20)
  name: string;

  @IsString()
  icon: string;

  @IsEnum(CategoryType, { message: `Invalid option. Correct options: ${EnumToString(CategoryType)}` })
  type: CategoryType;

  @IsBoolean()
  status: boolean;
}
