const {Kafka} = require('kafkajs');
const log = require('log');
const {Pool} = require('pg');
const connectionString = process.env.CONNECTION || 'postgresql://postgres:admin@postgres:5432/maratona';

const kafkaBroker = process.env.KAFKA_HOST ? process.env.KAFKA_HOST + ':29092' : 'localhost:9092';

const kafka = new Kafka({
    clientId: '1',
    brokers: [kafkaBroker]
});

const consumer = kafka.consumer({groupId: 'questaoJob'});
const status = {
    REPROVADO: 1,
    ERRO_COMPILADOR: 2,
    APROVADO: 3,
};

const randonString = (length) => {
    let result = '';
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    const charactersLength = characters.length;
    for (let i = 0; i < length; i++) {
        result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }
    return result;
};

const bootstrap = async () => {
    // Consuming
    await consumer.connect();
    console.log("Kafka has connected");

    await consumer.subscribe({
        topic: 'QuestaoSubmetida',
        fromBeginning: true
    });
    console.log("Subscribe on: QuestaoSubmetida");

    await consumer.run({
        autoCommit: true,
        eachMessage: async ({topic, partition, message}) => {

            let data = message.value.toJSON();

            const pool = new Pool({
                connectionString: connectionString
            });

            pool.connect((err, client, done) => {

                console.log({
                    topic,
                    partition,
                    offset: message.offset,
                    value: data.toString(),
                });

                const id = 1;
                let sql;
                // 1 to 3
                switch ((Math.random() * 3 | 0) + 1) {
                    case 1:
                        const porcentagemErro = (Math.random() * 100 | 0) + 1;
                        sql = `UPDATE tentativaQuestao SET status = 1, porcentagem_erro = ${porcentagemErro} WHERE id = ${id}`;
                        break;
                    case 2:
                        sql = `UPDATE tentativaQuestao SET status = 2, saida_erro = ${randonString(500)} WHERE id = ${id}`;
                        break;
                    case 3:
                        sql = `UPDATE tentativaQuestao SET status = 3 WHERE id = ${id}`;
                        break;
                }

                client.query(sql);
                done();

            });
        },
    })
};

bootstrap().catch(console.error);
