import {Controller, Get, Post} from '@nestjs/common';
import {QuestaoService} from './questao.service';
import {PublisherService} from '../publisher/publisher.service';

@Controller('api/questao')
export class QuestaoController {
    constructor(
        private readonly questaoService: QuestaoService,
    ) {
    }

    @Get()
    getHello(): string {
        return 'good';
    }

    @Get('processando')
    async obterProcessando(): Promise<any> {
        return await this.questaoService.obterQuestoesProcessando();
    }

    @Get('processadas')
    async obterProcessados(): Promise<any> {
        return await this.questaoService.obterQuestoesJaProcessadas();
    }

    @Post()
    async enviarQuestao(data: {
        entrada: string,
        questaoId: number,
        perfilId: number,
    }): Promise<any> {
        return await this.questaoService.submeterTentativaAvulsa(data);
    }

    @Get('fake')
    async criarMultiplasSubmicoes(): Promise<any> {
        return await this.questaoService.createFakeSubmicoes(1);
    }
}
