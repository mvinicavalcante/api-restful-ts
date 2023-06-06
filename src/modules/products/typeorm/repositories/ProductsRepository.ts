import { EntityRepository, Repository } from 'typeorm';
import { Product } from '../entities/Product';

@EntityRepository(Product)
export default class ProductRepository extends Repository<Product> {
  public async findByName(name: string): Promise<Product | undefined> {
    const product = await this.findOne({
      where: {
        name,
      },
    });

    return product;
  }

  public async findAllByPrice(price: number): Promise<Product[] | undefined> {
    const products = await this.find({
      where: {
        price,
      },
    });
    return products;
  }
}

//repositórios fazem a manipulação(ações) da Entity com o BD

//Repositório personalizado
