import {Module} from '@nestjs/common';
import {AppController} from './app.controller';
import {TypeOrmModule} from '@nestjs/typeorm';
import {AppService} from './app.service';
import {QuestaoModule} from './questao/questao.module';

@Module({
    imports: [
        TypeOrmModule.forRoot({
            type: 'postgres',
            host: process.env.BD_HOST || 'localhost',
            port: 5432,
            username: 'postgres',
            password: 'admin',
            database: 'maratona',
            entities: ['dist/**/*.entity{.ts,.js}'],
            synchronize: false,
        }),
        QuestaoModule,
    ],
    controllers: [AppController],
    providers: [AppService],
})
export class AppModule {
}
