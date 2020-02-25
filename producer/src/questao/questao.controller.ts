import {Controller, Get, Param, Post} from '@nestjs/common';
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

    @Get('status/:status')
    async obterStatus(@Param() params: number): Promise<any> {
        return await this.questaoService.obterQuestoesPorStatus(params);
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
