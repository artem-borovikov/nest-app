import {
  IsArray,
  IsInt,
  IsOptional,
  IsString,
  Max,
  MaxLength,
  Min,
} from 'class-validator';
import { StringToArray } from '../utils/string-to-array.util';

export class GetUsersDto {
  @IsOptional()
  @StringToArray()
  @IsArray()
  @IsString({ each: true })
  @MaxLength(255, { each: true })
  full_name?: string[];

  @IsOptional()
  @StringToArray()
  @IsArray()
  @IsString({ each: true })
  @MaxLength(50, { each: true })
  role?: string[];

  @IsOptional()
  @StringToArray()
  @IsArray()
  @IsInt({ each: true })
  @Min(0, { each: true })
  @Max(100, { each: true })
  efficiency?: number[];

  @IsOptional()
  @IsInt()
  @Min(1)
  @Max(100)
  limit?: number = 10;

  @IsOptional()
  @IsInt()
  @Min(0)
  offset?: number = 0;
}
