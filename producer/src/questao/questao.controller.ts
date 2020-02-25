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
        return await this.questaoService.createFakeSubmicoes(20);
    }
}
