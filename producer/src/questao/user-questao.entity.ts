import {Column, Entity, PrimaryGeneratedColumn} from 'typeorm';

@Entity('tentativaQuestao')
export class QuestaoEntity {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ length: 500 })
    entrada: string;

    @Column({ length: 500 })
    questaoId: string;
}
