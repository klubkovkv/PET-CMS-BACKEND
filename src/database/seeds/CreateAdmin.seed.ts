import { Factory, Seeder } from 'typeorm-seeding';
import { Connection } from 'typeorm';
import { UserEntity } from '@app/modules/user/user.entity';
import { plainToClass } from 'class-transformer';

export default class CreateAdmin implements Seeder {
  public async run(factory: Factory, connection: Connection): Promise<void> {
    const countAdmin = await connection
      .createQueryBuilder()
      .select()
      .from(UserEntity, 'User')
      .getCount();

    if (countAdmin === 0) {
      await connection
        .createQueryBuilder()
        .insert()
        .into(UserEntity)
        .values([
          plainToClass(UserEntity, {
            email: 'admin@example.com',
            password: 'secret',
          }),
        ])
        .execute();
    }
  }
}
