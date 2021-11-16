import { Column, Entity, ManyToOne } from 'typeorm';
import { AbstractEntity } from '@app/common/abstract.entity';
import { UserEntity } from '@app/modules/user/user.entity';
import { PageMetaInterface } from '@app/modules/page/types/pageMeta.interface';
import { BlocksInterface } from '@app/modules/page/types/blocks.interface';

@Entity({ name: 'pages' })
export class PageEntity extends AbstractEntity {
  @Column()
  slug: string;

  @Column()
  name: string;

  @Column()
  sortOrder: number;

  @Column()
  status: boolean;

  @Column({ default: '' })
  text: string;

  @Column('jsonb', { nullable: true })
  pageMeta: PageMetaInterface;

  @Column('jsonb', { nullable: true })
  blocks: BlocksInterface;

  @ManyToOne(() => UserEntity, (user) => user.pages)
  author: UserEntity;
}
