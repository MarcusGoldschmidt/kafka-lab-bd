const {Kafka} = require('kafkajs');
const log = require('log');

const kafka = new Kafka({
    clientId: '1',
    brokers: ['127.0.0.1:29092']
});

const consumer = kafka.consumer({groupId: '1'});

const bootstrap = async () => {
    // Consuming
    await consumer.connect();
    log("Kafka has connected");

    await consumer.subscribe({
        topic: 'questaoSubmetidaTopic',
        fromBeginning: true
    });

    await consumer.run({
        eachMessage: async ({topic, partition, message}) => {

            // 0 to 5
            switch (Math.random() * 6) {
                case 0:
            }

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
