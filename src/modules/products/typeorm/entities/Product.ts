import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

//Representação da tabela do BD

@Entity('products')
export class Product {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  name: string;

  @Column('decimal')
  price: number;

  @Column('int')
  quantity: number;

  @Column()
  created_at: Date;

  @Column()
  updated_at: Date;
}
