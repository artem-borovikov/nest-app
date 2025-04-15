import {
  IsInt,
  IsOptional,
  IsString,
  Max,
  MaxLength,
  Min,
  MinLength,
} from 'class-validator';

export class UpdateUserDto {
  @IsOptional()
  @IsString()
  @MinLength(1)
  @MaxLength(255)
  full_name?: string;

  @IsOptional()
  @IsString()
  @MinLength(1)
  @MaxLength(50)
  role?: string;

  @IsOptional()
  @IsInt()
  @Min(0)
  @Max(100)
  efficiency?: number;
}
