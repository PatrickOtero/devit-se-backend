import { MigrationInterface, QueryRunner } from "typeorm";

export class  $npmConfigName1701808238501 implements MigrationInterface {
    name = ' $npmConfigName1701808238501'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "mentor_entity" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "mentorName" character varying NOT NULL, "userName" character varying NOT NULL, "password" character varying NOT NULL, CONSTRAINT "UQ_d09c6585b9b8a86df8eec631a2c" UNIQUE ("userName"), CONSTRAINT "PK_aa4c7ca962df927aa7e81e922d8" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "jobs_entity" ALTER COLUMN "publicationDate" SET DEFAULT '"2023-12-05T20:30:42.421Z"'`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "jobs_entity" ALTER COLUMN "publicationDate" SET DEFAULT '2023-12-02 14:02:15.29'`);
        await queryRunner.query(`DROP TABLE "mentor_entity"`);
    }

}
