import {MigrationInterface, QueryRunner} from "typeorm";

export class CreatePages1636565990471 implements MigrationInterface {
    name = 'CreatePages1636565990471'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "pages" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), "slug" character varying NOT NULL, "name" character varying NOT NULL, "sortOrder" integer NOT NULL, "status" boolean NOT NULL, "text" character varying NOT NULL DEFAULT '', CONSTRAINT "PK_8f21ed625aa34c8391d636b7d3b" PRIMARY KEY ("id"))`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP TABLE "pages"`);
    }

}
