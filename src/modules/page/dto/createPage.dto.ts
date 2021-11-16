import { AbstractDto } from '@app/common/dto/abstract.dto';
import { IsNotEmpty } from 'class-validator';
import { PageMetaInterface } from '@app/modules/page/types/pageMeta.interface';

export class CreatePageDto extends AbstractDto {
  @IsNotEmpty()
  readonly slug: string;

  @IsNotEmpty()
  readonly name: string;

  @IsNotEmpty()
  readonly sortOrder: number;

  @IsNotEmpty()
  readonly status: boolean;

  readonly text: string;

  @IsNotEmpty()
  readonly pageMeta: PageMetaInterface;
}
