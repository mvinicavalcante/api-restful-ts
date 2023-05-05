import { createConnection } from 'typeorm';

createConnection();

//aqui ele já procura o arquivo 'ormconfig.json' para buscar as configs de conxeão do ORM
//ORM cuidará das tabelas do bd
