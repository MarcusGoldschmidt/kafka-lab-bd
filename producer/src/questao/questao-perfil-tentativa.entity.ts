import {BeforeInsert, Column, Entity, ManyToOne, PrimaryGeneratedColumn} from 'typeorm';
import {QuestaoEnviadaStatus} from './questao-status.enum';
import {PerfilEntity} from '../perfil/perfil.entity';
import {QuestaoEntity} from './questao.entity';

@Entity({name: 'tentativaQuestao'})
export class QuestaoPerfilTentativaEntity {
    @PrimaryGeneratedColumn({name: 'id'})
    id: number;

    @Column({name: 'perfil_id'})
    perfilId: number;

    @Column({name: 'questao_id'})
    questaoId: number;

    @Column()
    status: QuestaoEnviadaStatus;

    @Column()
    entrada: string;

    @Column({name: 'criado_em', nullable: true})
    criadoEm: Date;

    @Column({name: 'porcentagem_erro', nullable: true})
    porcentagemErro: number;

    @ManyToOne(type => PerfilEntity, user => user.questoesAvulsas)
    user: PerfilEntity;

    @ManyToOne(type => QuestaoEntity)
    questao: QuestaoEntity;

    @BeforeInsert()
    OnBefore() {
        this.criadoEm = new Date();
        this.status = QuestaoEnviadaStatus.PROCESSANDO;
    }
}
