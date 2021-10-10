import { Column, Entity } from 'typeorm';
import { AbstractEntity } from '@app/common/abstract.entity';

@Entity({ name: 'tags' })
export class TagEntity extends AbstractEntity {
  @Column()
  name: string;
}
