import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Referer {
  @PrimaryGeneratedColumn()
  id: string;

  @Column({
    unique: true,
    nullable: false,
    default: '',
  })
  referer: string;

  @Column({
    unique: true,
    nullable: false,
    default: '',
  })
  code: string;
}
