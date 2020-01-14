import {Injectable} from '@nestjs/common';
import {Kafka, Producer} from '@nestjs/common/interfaces/external/kafka-options.interface';

export interface IEvent {
    topicName: string;
    data: any;
}

@Injectable()
export class PublisherService {

    private readonly producer: Producer;

    constructor() {
        this.producer = new Kafka({
            clientId: '1',
            brokers: ['127.0.0.1:29092'],
        }).producer();
    }

    async sendEvent(data: IEvent) {
        await this.producer.send({
            topic: data.topicName,
            messages: [
                {
                    value: data.data.toString(),
                },
            ],
        });
    }
}
