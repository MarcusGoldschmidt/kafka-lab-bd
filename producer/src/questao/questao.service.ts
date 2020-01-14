import {Injectable} from '@nestjs/common';
import {PublisherService} from '../publisher/publisher.service';

@Injectable()
export class QuestaoService {

    constructor(private readonly publisherService: PublisherService) {
    }

    async criarTentativaQuestao(data: {
        entrada: string,
        questaoId: number,
    }): Promise<boolean> {

        await this.publisherService
            .sendEvent({
                topicName: 'questaoSubmetidaTopic',
                data,
            });
        return true;
    }
}
