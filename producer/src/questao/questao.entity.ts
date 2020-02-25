import {Column, Entity, PrimaryGeneratedColumn} from 'typeorm';

@Entity('questoes')
export class QuestaoEntity {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ length: 500 })
    titulo: string;

    @Column({ length: 500 })
    descricao: string;

    @Column({ length: 500 })
    entrada: string;

    @Column({ length: 500 })
    saida: string;

    @Column({ length: 500 })
    dificuldade: string;
}
