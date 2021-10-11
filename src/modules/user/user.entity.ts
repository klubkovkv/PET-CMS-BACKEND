import { AbstractEntity } from '@app/common/abstract.entity';
import { BeforeInsert, Column, Entity } from 'typeorm';
import { hash } from 'bcrypt';

@Entity({ name: 'users' })
export class UserEntity extends AbstractEntity {
  @Column()
  email: string;

  @Column()
  password: string;

  @BeforeInsert()
  async hashPassword() {
    this.password = await hash(this.password, 10);
  }
}
