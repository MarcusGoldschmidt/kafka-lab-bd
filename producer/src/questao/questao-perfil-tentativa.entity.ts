import {BeforeInsert, Column, Entity, ManyToOne, PrimaryGeneratedColumn} from 'typeorm';
import {QuestaoEnviadaStatus} from './questao-status.enum';
import {PerfilEntity} from '../perfil/perfil.entity';
import {QuestaoEntity} from './questao.entity';

@Entity({name: 'tentativaQuestao'})
export class QuestaoPerfilTentativaEntity {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({name: 'perfil_id'})
    perfilId: number;

    @Column({name: 'questao_id'})
    questaoId: number;

    @Column()
    status: QuestaoEnviadaStatus;

    @Column()
    entrada: string;

    @Column({name: 'criado_em'})
    criadoEm: Date;

    @Column({name: 'porcentagem_erro'})
    porcentagemErro: Date;

    @ManyToOne(type => PerfilEntity, user => user.questoesAvulsas)
    user: PerfilEntity;

    @ManyToOne(type => QuestaoEntity)
    questao: QuestaoEntity;

    @BeforeInsert()
    OnBefore() {
        this.status = QuestaoEnviadaStatus.PROCESSANDO;
    }
}
