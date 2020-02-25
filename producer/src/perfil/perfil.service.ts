import {Injectable} from '@nestjs/common';
import {PublisherService} from '../publisher/publisher.service';
import {InjectRepository} from '@nestjs/typeorm';
import {Repository} from 'typeorm';
import {PerfilEntity} from './perfil.entity';

@Injectable()
export class PerfilService {

    constructor(
        @InjectRepository(PerfilEntity)
        private readonly questaoRepository: Repository<PerfilEntity>) {
    }

    async obterRandomIdAsync(): Promise<number> {
        return (await this.questaoRepository.createQueryBuilder().orderBy('RANDOM()').getOne()).id;
    }
}
