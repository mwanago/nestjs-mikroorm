import { IsString, IsNotEmpty, IsNumber } from 'class-validator';

class CreatePostDto {
  @IsString()
  @IsNotEmpty()
  title: string;

  @IsString()
  @IsNotEmpty()
  content: string;

  @IsNumber({}, { each: true })
  categories: number[];
}
export default CreatePostDto;
