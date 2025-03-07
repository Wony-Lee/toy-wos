import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity()
export class User {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({
    unique: true,
    nullable: false,
    default: '',
  })
  email: string;

  @Column({
    select: false,
    nullable: false,
    default: '',
  })
  password: string;

  @Column({
    default: '',
  })
  profile: string;

  @Column({
    nullable: false,
    default: '',
  })
  name: string;

  @Column({
    default: '',
  })
  phoneNumber: string;

  @Column({
    default: 0,
  })
  gender: number;

  @Column({
    default: '',
  })
  introduce: string;

  @Column({
    unique: false,
    nullable: false,
    default: '',
  })
  nickName: string;

  @Column({
    unique: true,
  })
  uniqueCode: string;

  @CreateDateColumn({
    type: 'datetime',
    precision: 6,
    default: () => 'CURRENT_TIMESTAMP(6)',
  })
  createdAt: Date;

  @UpdateDateColumn({
    type: 'datetime',
    precision: 6,
    default: () => 'CURRENT_TIMESTAMP(6)',
    onUpdate: 'CURRENT_TIMESTAMP(6)',
  })
  updatedAt: Date;

  @DeleteDateColumn({
    type: 'datetime',
    precision: 6,
    nullable: true,
  })
  deletedAt: Date;
}
