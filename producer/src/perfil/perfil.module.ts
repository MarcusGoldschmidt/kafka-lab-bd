import {Module} from '@nestjs/common';
import {PerfilService} from './perfil.service';

@Module({
    imports: [],
    controllers: [],
    providers: [PerfilService],
    exports: [PerfilService],
})
export class PerfilModule {
}
