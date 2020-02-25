import {Column, Entity, OneToMany, PrimaryGeneratedColumn} from 'typeorm';
import {QuestaoPerfilTentativaEntity} from '../questao/questao-perfil-tentativa.entity';

@Entity({name: 'perfil'})
export class PerfilEntity {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({length: 500, name: 'nome_completo', nullable: true})
    nomeCompleto: string;

    @Column({length: 500, nullable: true})
    rga: string;

    @Column({length: 500, nullable: true})
    siapi: string;

    @Column({length: 500, nullable: true})
    cpf: string;

    @Column({length: 500, name: 'codigo_uri', nullable: true})
    codigoUri: string;

    @Column({name: 'status_participante'})
    statusParticipante: boolean;

    @Column({name: 'status_voluntario'})
    statusVoluntario: boolean;

    @Column({name: 'status_tecnico'})
    statusTecnico: boolean;

    @OneToMany(type => QuestaoPerfilTentativaEntity, photo => photo.user)
    questoesAvulsas: QuestaoPerfilTentativaEntity[];
}
