import {MigrationInterface, QueryRunner} from "typeorm";

export class AddPageMeta1636997244708 implements MigrationInterface {
    name = 'AddPageMeta1636997244708'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "pages" ADD "pageMeta" jsonb`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "pages" DROP COLUMN "pageMeta"`);
    }

}
