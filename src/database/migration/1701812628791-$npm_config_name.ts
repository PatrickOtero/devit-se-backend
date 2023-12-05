import { MigrationInterface, QueryRunner } from "typeorm";

export class  $npmConfigName1701812628791 implements MigrationInterface {
    name = ' $npmConfigName1701812628791'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "admin_entity" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "userName" character varying NOT NULL, "password" character varying NOT NULL, CONSTRAINT "UQ_4263b6e3944cc7658f7c4d620f9" UNIQUE ("userName"), CONSTRAINT "PK_bc992df5ddb70aefb955b8a0c92" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "mentor_entity" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "mentorName" character varying NOT NULL, "userName" character varying NOT NULL, "password" character varying NOT NULL, CONSTRAINT "UQ_d09c6585b9b8a86df8eec631a2c" UNIQUE ("userName"), CONSTRAINT "PK_aa4c7ca962df927aa7e81e922d8" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "jobs_entity" ALTER COLUMN "publicationDate" SET DEFAULT '"2023-12-05T21:43:52.430Z"'`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "jobs_entity" ALTER COLUMN "publicationDate" SET DEFAULT '2023-12-02 14:02:15.29'`);
        await queryRunner.query(`DROP TABLE "mentor_entity"`);
        await queryRunner.query(`DROP TABLE "admin_entity"`);
    }

}
