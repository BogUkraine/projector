import { IsNotEmpty, IsString, MaxLength } from 'class-validator';

export class CreateMessageDto {
  @IsString()
  @MaxLength(255)
  @IsNotEmpty()
  readonly text: string;
}
