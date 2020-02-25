import {Module} from '@nestjs/common';
import {QuestaoController} from './questao.controller';
import {QuestaoService} from './questao.service';
import {PublisherModule} from '../publisher/publisher.module';
import {PerfilModule} from '../perfil/perfil.module';
import {TypeOrmModule} from '@nestjs/typeorm';
import {PerfilEntity} from '../perfil/perfil.entity';
import {QuestaoEntity} from './questao.entity';
import {QuestaoPerfilTentativaEntity} from './questao-perfil-tentativa.entity';

@Module({
    imports: [
        TypeOrmModule.forFeature([QuestaoEntity, QuestaoPerfilTentativaEntity]),
        PublisherModule,
        PerfilModule,
    ],
    controllers: [QuestaoController],
    providers: [QuestaoService],
})
export class QuestaoModule {
}
