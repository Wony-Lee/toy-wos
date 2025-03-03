import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

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
    default: '',
  })
  profile: string;

  @Column({
    unique: true,
    nullable: false,
    default: '',
  })
  name: string;

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
    select: false,
    nullable: false,
    default: '',
  })
  password: string;

  @Column({
    unique: true,
  })
  uniqueCode: string;
}
