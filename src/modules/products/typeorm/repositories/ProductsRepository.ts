import { EntityRepository, Repository } from 'typeorm';
import { Product } from '../entities/Product';

@EntityRepository(Product)
export class ProductRepository extends Repository<Product> {
  public async findByName(name: string): Promise<Product | null> {
    const product = this.findOne({
      where: {
        name,
      },
    });

    return product;
  }
}

//repositórios fazem a manipulação(ações) da Entity com o BD

//Repositório personalizado
