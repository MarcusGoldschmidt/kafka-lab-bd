const {Kafka} = require('kafkajs');
const log = require('log');

const connectionString = process.env.CONNECTION || 'postgresql://postgres:admin@postgres:5432/maratona';

const kafka = new Kafka({
    clientId: '1',
    brokers: ['kafka:29092']
});

const consumer = kafka.consumer({groupId: '1'});

const bootstrap = async () => {
    // Consuming
    await consumer.connect();
    log("Kafka has connected");

    await consumer.subscribe({
        topic: 'test-topic',
        fromBeginning: true
    });

    await consumer.run({
        eachMessage: async ({topic, partition, message}) => {
            console.log({
                topic,
                partition,
                offset: message.offset,
                value: message.value.toString(),
            });
        },
    })
};

bootstrap().catch(console.error);
