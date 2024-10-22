import { ActorModel } from 'src/modules/actors/domain/models/actor.model';
import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('actor')
export class ActorEntity {
  @PrimaryGeneratedColumn({ name: 'actor_id', type: 'integer' })
  actor_id: number;

  @Column()
  first_name: string;

  @Column()
  last_name: string;

  @Column()
  last_update: Date;

  toModel() {
    return new ActorModel(
      this.actor_id,
      this.first_name,
      this.last_name,
      this.last_update,
    );
  }
}
