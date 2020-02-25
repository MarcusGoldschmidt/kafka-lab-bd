import {Module} from '@nestjs/common';
import {QuestaoController} from './questao.controller';
import {QuestaoService} from './questao.service';
import {PublisherModule} from '../publisher/publisher.module';
import {PerfilModule} from '../perfil/perfil.module';

@Module({
    imports: [PublisherModule, PerfilModule],
    controllers: [QuestaoController],
    providers: [QuestaoService],
})
export class QuestaoModule {
}
