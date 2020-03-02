# Trabalho sobre Kafka 

Exemplo de aplicação utilizando kafka.

## Tecnologias utilizadas

- [Postgres](https://www.postgresql.org/)
- [PgAdmin 4](https://www.pgadmin.org/)
- [Apache Kafka](http://kafka.apache.org/)
- [Apache Zookeeper](https://zookeeper.apache.org/)
- [Flyway](https://flywaydb.org/)
- [Traefik](https://traefik.io)
- [NestJs](https://nestjs.com/) (produz os eventos)
- [Node.js](https://nodejs.org/) (consome os eventos)

## Instalação

```bash
$ git clone https://github.com/MarcusGoldschmidt/Kafka-lab-bd.git
$ cd Kafka-lab-bd
$ docker-compose up -d
```

### Links de acesso

- Web Api: http://localhost
- PgAdmin: http://pg.localhost
- Traefik: http://traefik.localhost
- WebApi: http://producer.localhost

## Aplicação

Producer é uma web api escrita em Node.js usando nest. Tem como objetivo receber uma requisição e emitir um evento.  
A princípio, é um sistema parecido com o [Uri Online Judge](https://www.urionlinejudge.com.br), onde o usuario envia um código e o servidor o analisa e responde com erros ou acerto conforme o resultado de saída.  
O request é recebido pela web api que persiste no banco uma questão em analise e dispara um evento que será analisado de forma assíncrona pelos consumers, salvando o resultado no mesmo banco.  
O projeto tem como objetivo apenas o aprendizado do Kafka e não implementará a análise da saída que o código dos usuários produz.  
