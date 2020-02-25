const {Kafka} = require('kafkajs');
const log = require('log');
const {Pool, Client} = require('pg');
const connectionString = process.env.CONNECTION || 'postgresql://postgres:admin@postgres:5432/maratona';


const kafka = new Kafka({
    clientId: '1',
    brokers: ['kafka:29092']
});

const consumer = kafka.consumer({groupId: '1'});

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
    log("Kafka has connected");

    await consumer.subscribe({
        topic: 'questaoSubmetidaTopic',
        fromBeginning: true
    });

    await consumer.run({
        eachMessage: async ({topic, partition, message}) => {

            const client = new Client({
                connectionString: connectionString,
            });
            await client.connect();

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

            await client.query(sql);

            console.log({
                topic,
                partition,
                offset: message.offset,
                value: message.value.toString(),
            });

            await client.end();
        },
    })
};

bootstrap().catch(console.error);
