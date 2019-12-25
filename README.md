# Trabalho sobre Kafka 

Repositório iniciado para exemplo de aplicação utilizando kafka.

## O que foi utilizado

* Postgres

* PgAdmin 4

* Kafka

* Zookeeper

* Traefik
 
* NestJs (Para produzir os eventos)

* Go ou Node js (Para consumir os eventos)

## Instalando 

`git clone https://github.com/MarcusGoldschmidt/Kafka-lab-bd.git`

`cd Kafka-lab-bd`

`docker composer up -d `

## Aplicações

Producer é uma web api escrita em Node js usando nest, tem como objetivo receber uma requisição e emitir um evento

