import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('users')
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ name: 'full_name', length: 255, nullable: false })
  full_name: string;

  @Column({ length: 50, nullable: false })
  role: string;

  @Column({ nullable: false, default: 0, type: 'int' })
  efficiency: number;
}
