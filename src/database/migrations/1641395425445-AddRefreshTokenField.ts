import {MigrationInterface, QueryRunner} from "typeorm";

export class AddRefreshTokenField1641395425445 implements MigrationInterface {
    name = 'AddRefreshTokenField1641395425445'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "users" ADD "currentHashedRefreshToken" character varying`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "users" DROP COLUMN "currentHashedRefreshToken"`);
    }

}
