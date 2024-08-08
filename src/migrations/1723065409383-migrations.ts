import { MigrationInterface, QueryRunner } from "typeorm";

export class Migrations1723065409383 implements MigrationInterface {
    name = 'Migrations1723065409383'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE \`product\` (\`id\` int NOT NULL AUTO_INCREMENT, \`name\` varchar(255) NOT NULL, \`price\` bigint NOT NULL, \`description\` varchar(400) NOT NULL, \`image\` varchar(255) NULL, \`category\` enum ('office', 'kitchen', 'bedroom') NOT NULL, \`updateDate\` datetime(6) NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), \`createDate\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`deleteDate\` datetime(6) NULL, UNIQUE INDEX \`IDX_22cc43e9a74d7498546e9a63e7\` (\`name\`), UNIQUE INDEX \`IDX_b3234b06e4d16f52b384dfa4dd\` (\`price\`), UNIQUE INDEX \`IDX_29a733971f71626611bb3808eb\` (\`description\`), UNIQUE INDEX \`IDX_76fa4b1cc1ce77e0303ce94ab3\` (\`image\`), UNIQUE INDEX \`IDX_d71ac3a30622a475df871b5513\` (\`category\`), PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`review\` (\`id\` int NOT NULL AUTO_INCREMENT, \`rating\` varchar(255) NOT NULL, \`title\` text NULL, \`comment\` text NULL, \`updateDate\` datetime(6) NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), \`createDate\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`deleteDate\` datetime(6) NULL, \`accountId\` int NULL, \`productId\` int NULL, UNIQUE INDEX \`IDX_4078f2e08ec084893d3355d05c\` (\`rating\`), UNIQUE INDEX \`REL_cfe234d68b9ec0aac262881f2c\` (\`accountId\`), PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`ALTER TABLE \`account\` ADD CONSTRAINT \`FK_77bf26eef8865441fb9bd53a364\` FOREIGN KEY (\`roleId\`) REFERENCES \`role\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`review\` ADD CONSTRAINT \`FK_cfe234d68b9ec0aac262881f2ca\` FOREIGN KEY (\`accountId\`) REFERENCES \`account\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`review\` ADD CONSTRAINT \`FK_2a11d3c0ea1b2b5b1790f762b9a\` FOREIGN KEY (\`productId\`) REFERENCES \`product\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`review\` DROP FOREIGN KEY \`FK_2a11d3c0ea1b2b5b1790f762b9a\``);
        await queryRunner.query(`ALTER TABLE \`review\` DROP FOREIGN KEY \`FK_cfe234d68b9ec0aac262881f2ca\``);
        await queryRunner.query(`ALTER TABLE \`account\` DROP FOREIGN KEY \`FK_77bf26eef8865441fb9bd53a364\``);
        await queryRunner.query(`DROP INDEX \`REL_cfe234d68b9ec0aac262881f2c\` ON \`review\``);
        await queryRunner.query(`DROP INDEX \`IDX_4078f2e08ec084893d3355d05c\` ON \`review\``);
        await queryRunner.query(`DROP TABLE \`review\``);
        await queryRunner.query(`DROP INDEX \`IDX_d71ac3a30622a475df871b5513\` ON \`product\``);
        await queryRunner.query(`DROP INDEX \`IDX_76fa4b1cc1ce77e0303ce94ab3\` ON \`product\``);
        await queryRunner.query(`DROP INDEX \`IDX_29a733971f71626611bb3808eb\` ON \`product\``);
        await queryRunner.query(`DROP INDEX \`IDX_b3234b06e4d16f52b384dfa4dd\` ON \`product\``);
        await queryRunner.query(`DROP INDEX \`IDX_22cc43e9a74d7498546e9a63e7\` ON \`product\``);
        await queryRunner.query(`DROP TABLE \`product\``);
    }

}
