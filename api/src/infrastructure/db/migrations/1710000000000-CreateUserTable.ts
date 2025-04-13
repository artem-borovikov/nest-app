import { MigrationInterface, QueryRunner } from 'typeorm';

export class CreateUserTable1710000000000 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
      CREATE TABLE users (
        id INT AUTO_INCREMENT PRIMARY KEY,
        full_name VARCHAR(255) NOT NULL UNIQUE,
        role VARCHAR(50) NOT NULL,
        efficiency INT NOT NULL DEFAULT 0
      )
    `);

    await queryRunner.query(`
      CREATE FULLTEXT INDEX idx_users_full_name ON users(full_name)
    `);

    await queryRunner.query(`
      CREATE INDEX idx_users_role ON users(role)
    `);

    await queryRunner.query(`
      CREATE INDEX idx_users_efficiency ON users(efficiency)
    `);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`DROP INDEX idx_users_efficiency ON users`);
    await queryRunner.query(`DROP INDEX idx_users_role ON users`);
    await queryRunner.query(`DROP INDEX idx_users_full_name ON users`);
    await queryRunner.query(`DROP TABLE users`);
  }
}
