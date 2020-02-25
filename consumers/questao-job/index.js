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

const pool = new Pool({
    connectionString: connectionString
});

pool.on('error', (err, client) => {
    console.error('Unexpected error on idle client', err);
    process.exit(-1);
});

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

            console.log('INCIANDO PROCESSAMENTO');

            const data = message.value.toString();

            pool.connect(async (err, client, done) => {

                console.log({
                    topic,
                    partition,
                    offset: message.offset,
                    value: JSON.stringify(data),
                });

                const id = JSON.parse(data).id;
                let sql;

                console.log(`Processando Id: ${id}`);
                // 1 to 3
                switch ((Math.random() * 3 | 0) + 1) {
                    case 1:
                        const porcentagemErro = (Math.random() * 100 | 0) + 1;
                        sql = `UPDATE tentativaQuestao SET status = 1, porcentagem_erro = ${porcentagemErro} WHERE id = ${id}`;
                        console.log(`ERROR: REPROVADO COM ${porcentagemErro}% de erro`);
                        break;
                    case 2:
                        sql = `UPDATE tentativaQuestao SET status = 2, saida_erro = ${randonString(500)} WHERE id = ${id}`;
                        console.log(`ERROR: ERRO_COMPILADOR`);
                        break;
                    case 3:
                        sql = `UPDATE tentativaQuestao SET status = 3 WHERE id = ${id}`;
                        console.log(`ERROR: APROVADO`);
                        break;
                }

                try {
                    await client.query(sql);
                    done();
                } catch (e) {

                }

            });
        },
    })
};

bootstrap().catch(console.error);
