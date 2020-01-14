import {Module} from '@nestjs/common';
import {QuestaoController} from './questao.controller';
import {QuestaoService} from './questao.service';
import {PublisherModule} from '../publisher/publisher.module';

@Module({
    imports: [PublisherModule],
    controllers: [QuestaoController],
    providers: [QuestaoService],
})
export class QuestaoModule {
}
