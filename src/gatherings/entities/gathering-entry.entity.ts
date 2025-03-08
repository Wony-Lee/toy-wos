import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class GatheringEntry {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  gatheringId: number;

  @Column({
    type: 'uuid',
    collation: 'utf8mb4_unicode_ci',
  })
  userId: string;
}
