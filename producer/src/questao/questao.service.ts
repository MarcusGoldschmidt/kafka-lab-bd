import {Injectable} from '@nestjs/common';
import {PublisherService} from '../publisher/publisher.service';
import {InjectRepository} from '@nestjs/typeorm';
import {Repository} from 'typeorm';
import {QuestaoPerfilTentativaEntity} from './questao-perfil-tentativa.entity';
import {PerfilService} from '../perfil/perfil.service';
import {QuestaoEntity} from './questao.entity';
import {QuestaoEnviadaStatus} from './questao-status.enum';

@Injectable()
export class QuestaoService {

    constructor(
        @InjectRepository(QuestaoPerfilTentativaEntity)
        private readonly tentativaEntityRepository: Repository<QuestaoPerfilTentativaEntity>,
        @InjectRepository(QuestaoEntity)
        private readonly questaoRepository: Repository<QuestaoEntity>,
        private readonly publisherService: PublisherService,
        private readonly perfilService: PerfilService) {
    }

    async obterQuestoesProcessando(): Promise<QuestaoPerfilTentativaEntity[]> {
        return await this.tentativaEntityRepository
            .createQueryBuilder()
            .where({
                status: QuestaoEnviadaStatus.PROCESSANDO,
            })
            .orderBy('criado_em', 'DESC')
            .getMany();
    }

    async obterQuestoesPorStatus(status: QuestaoEnviadaStatus): Promise<QuestaoPerfilTentativaEntity[]> {
        return await this.tentativaEntityRepository
            .createQueryBuilder()
            .where({
                status: QuestaoEnviadaStatus.PROCESSANDO,
            })
            .orderBy('criado_em', 'DESC')
            .getMany();
    }

    async submeterTentativaAvulsa(data: {
        entrada: string,
        questaoId: number,
        perfilId: number,
    }): Promise<QuestaoPerfilTentativaEntity> {

        const submisao = this.tentativaEntityRepository.create();

        submisao.entrada = data.entrada;
        submisao.questaoId = data.questaoId;
        submisao.perfilId = data.perfilId;

        await this.tentativaEntityRepository.save(submisao);

        await this.publisherService
            .sendEvent({
                topicName: 'QuestaoSubmetida',
                data: submisao,
            });
        return submisao;
    }

    async createFakeSubmicoes(lenght: number): Promise<QuestaoPerfilTentativaEntity[]> {
        const vector: any[] = [];

        for (let i = 0; i < lenght; i++) {
            vector.push(
                this.submeterTentativaAvulsa({
                    entrada: QuestaoService.randomString(300),
                    questaoId: await this.obterRandomQuestaoIdAsync(),
                    perfilId: await this.perfilService.obterRandomIdAsync(),
                }),
            );
        }

        return await Promise.all(vector);
    }

    async obterRandomQuestaoIdAsync(): Promise<number> {
        return (await this.questaoRepository.createQueryBuilder().orderBy('RANDOM()').getOne()).id;
    }

    private static randomString(length): string {
        let result = '';
        const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
        const charactersLength = characters.length;
        for (let i = 0; i < length; i++) {
            result += characters.charAt(Math.floor(Math.random() * charactersLength));
        }
        return result;
    }
}
