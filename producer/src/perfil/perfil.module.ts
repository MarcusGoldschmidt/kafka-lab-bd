import {Module} from '@nestjs/common';
import {PerfilService} from './perfil.service';
import {TypeOrmModule} from '@nestjs/typeorm';
import {PerfilEntity} from './perfil.entity';

@Module({
    imports: [TypeOrmModule.forFeature([PerfilEntity])],
    controllers: [],
    providers: [PerfilService],
    exports: [PerfilService],
})
export class PerfilModule {
}
