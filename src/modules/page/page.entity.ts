import { Column, Entity, ManyToOne } from 'typeorm';
import { AbstractEntity } from '@app/common/abstract.entity';
import { UserEntity } from '@app/modules/user/user.entity';

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

  @ManyToOne(() => UserEntity, (user) => user.pages)
  author: UserEntity;
}
