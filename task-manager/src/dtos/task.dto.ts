import {
  IsNotEmpty,
  IsOptional,
  IsString,
  IsEnum,
  IsDateString,
} from 'class-validator';

export class CreateTaskDto {
  @IsNotEmpty()
  @IsString()
  title: string;

  @IsOptional()
  @IsString()
  description?: string;

  @IsOptional()
  @IsEnum(['Pending', 'In Progress', 'Completed'])
  status?: 'Pending' | 'In Progress' | 'Completed';

  @IsNotEmpty()
  @IsDateString()
  dueDate: string;
}

export class UpdateTaskDto {
  @IsOptional()
  @IsString()
  title?: string;

  @IsOptional()
  @IsString()
  description?: string;

  @IsOptional()
  @IsEnum(['Pending', 'In Progress', 'Completed'])
  status?: 'Pending' | 'In Progress' | 'Completed';

  @IsOptional()
  @IsDateString()
  dueDate?: string;
}
