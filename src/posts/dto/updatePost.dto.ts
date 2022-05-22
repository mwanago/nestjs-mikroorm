import { IsString, IsNotEmpty, IsNumber } from 'class-validator';

class UpdatePostDto {
  @IsNumber()
  id: number;

  @IsString()
  @IsNotEmpty()
  title: string;

  @IsString()
  @IsNotEmpty()
  content: string;
}

export default UpdatePostDto;
