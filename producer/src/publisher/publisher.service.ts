import {Injectable} from '@nestjs/common';
import {Logger} from '@nestjs/common';
import {Kafka, Producer} from 'kafkajs';

const kafkaBroker = process.env.KAFKA_HOST ? process.env.KAFKA_HOST + ':29092' : 'localhost:9092';

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
            brokers: [kafkaBroker],
        }).producer({
            allowAutoTopicCreation: true,
            retry: {
                maxRetryTime: 5,
            },
        });
    }

    async sendEvent(data: IEvent) {
        Logger.log(`Enviando Topic:${data.topicName} Payload: ${JSON.stringify(data.data)}`);

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
