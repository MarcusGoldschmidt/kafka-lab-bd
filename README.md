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

## Aplicação

Producer é uma web api escrita em Node js usando nest, tem como objetivo receber uma requisição e emitir um evento

A principio, é um sistema parecido com o URI, na qual o usuario envia um codigo e o servidor analisa o codigo e responde com erros ou acerto conforme o resultado de saida.

O request é recebido pela web api que persiste no banco uma questão em analise e dispara um evento que será analisado de forma assincrona pelos consurmers salvando no mesmo banco o resultado.

Projeto tem como objetivo o aprendizado do Kafha e não irá implementar a analise da saida que o codigo dos usuário produzem.