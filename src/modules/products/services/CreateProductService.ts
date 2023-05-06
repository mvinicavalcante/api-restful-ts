import { getCustomRepository } from 'typeorm';
import { ProductRepository } from '../typeorm/repositories/ProductsRepository';
import AppError from '@shared/errors/AppError';
import { Product } from '../typeorm/entities/Product';

interface IRequest {
  name: string;
  price: number;
  quantity: number;
}
//Interface feita para tipar os atributos

class CreateProductService {
  public async execute({ name, price, quantity }: IRequest): Promise<Product> {
    const productsRepository = getCustomRepository(ProductRepository);
    const productExists = await productsRepository.findByName(name);

    if (productExists) {
      throw new AppError('There is already one product with this name');
    }

    //Aqui ele só PREPARA o objeto, por isso não usa o await
    const product = productsRepository.create({
      name,
      price,
      quantity,
    });
    //já passo os parâmetros q não são preenchidos automaticamente (name, price e quantity)
    //

    await productsRepository.save(product);

    return product;
  }
}

export default CreateProductService;
