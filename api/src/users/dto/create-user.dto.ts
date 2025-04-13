import {
  IsInt,
  IsNotEmpty,
  IsString,
  Max,
  MaxLength,
  Min,
} from 'class-validator';
export class CreateUserDto {
  @IsString()
  @IsNotEmpty()
  @MaxLength(255)
  full_name: string;

  @IsString()
  @IsNotEmpty()
  @MaxLength(50)
  role: string;

  @IsInt()
  @Min(0)
  @Max(100)
  efficiency: number;
}
