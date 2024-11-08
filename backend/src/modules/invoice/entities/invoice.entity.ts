import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Invoice {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  date: string;

  @Column()
  vendor_name: string;

  @Column()
  description: string;

  @Column()
  due_date: string;

  @Column({ type: 'decimal', precision: 10, scale: 2, nullable: true })
  amount: number | null;

  @Column({ default: false })
  paid: boolean;
} 