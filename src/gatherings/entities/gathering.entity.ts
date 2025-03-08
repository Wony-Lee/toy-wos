import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

export enum CHARGE_STATUS {
  FREE = 1,
  PAID = 2,
}

@Entity()
export class Gathering {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  title: string;

  @Column()
  region: string;

  @Column()
  content: string;

  @Column()
  charge: number;

  @Column({
    type: 'enum',
    enum: CHARGE_STATUS,
    default: CHARGE_STATUS.FREE,
  })
  chargeStatus: CHARGE_STATUS;

  @Column()
  maxMember: number;

  @Column()
  minMember: number;

  @Column()
  images: string;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @DeleteDateColumn()
  deletedAt: Date;
}
