import { AbstractDto } from '@app/common/dto/abstract.dto';
import { IsNotEmpty } from 'class-validator';

export class CreatePageDto extends AbstractDto {
  @IsNotEmpty()
  readonly slug: string;

  @IsNotEmpty()
  readonly name: string;

  @IsNotEmpty()
  readonly sortOrder: number;

  @IsNotEmpty()
  readonly status: boolean;

  @IsNotEmpty()
  readonly text: string;
}
