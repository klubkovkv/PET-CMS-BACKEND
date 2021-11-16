import {MigrationInterface, QueryRunner} from "typeorm";

export class AddPageBlocks1637087774556 implements MigrationInterface {
    name = 'AddPageBlocks1637087774556'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "pages" ADD "blocks" jsonb`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "pages" DROP COLUMN "blocks"`);
    }

}
