import {MigrationInterface, QueryRunner} from "typeorm";

export class AddRelationsBetweenPageAndUser1636568870522 implements MigrationInterface {
    name = 'AddRelationsBetweenPageAndUser1636568870522'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "pages" ADD "authorId" uuid`);
        await queryRunner.query(`ALTER TABLE "pages" ADD CONSTRAINT "FK_d2e423882ed3b21d37f9cb1ca7f" FOREIGN KEY ("authorId") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "pages" DROP CONSTRAINT "FK_d2e423882ed3b21d37f9cb1ca7f"`);
        await queryRunner.query(`ALTER TABLE "pages" DROP COLUMN "authorId"`);
    }

}
