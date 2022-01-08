import { AbstractEntity } from '@app/common/abstract.entity';
import { BeforeInsert, Column, Entity, OneToMany } from 'typeorm';
import { hash } from 'bcrypt';
import { Exclude } from 'class-transformer';
import { PageEntity } from '@app/modules/page/page.entity';

@Entity({ name: 'users' })
export class UserEntity extends AbstractEntity {
  @Column()
  email: string;

  @Column()
  @Exclude({ toPlainOnly: true })
  password: string;

  @Column({
    nullable: true,
  })
  @Exclude({ toPlainOnly: true })
  currentHashedRefreshToken?: string;

  @BeforeInsert()
  async hashPassword() {
    this.password = await hash(this.password, 10);
  }

  @OneToMany(() => PageEntity, (page) => page.author)
  pages: PageEntity[];
}
