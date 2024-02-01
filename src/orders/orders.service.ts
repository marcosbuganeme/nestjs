import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Product } from 'src/products/entities/product.entity';
import { In, Repository } from 'typeorm';
import { CreateOrderDto } from './dto/create-order.dto';
import { Order } from './entities/order.entity';

@Injectable()
export class OrdersService {
  constructor(
    @InjectRepository(Order) private orderRepository: Repository<Order>,
    @InjectRepository(Product) private productRepository: Repository<Product>,
  ) {}

  async create(createOrderDto: CreateOrderDto) {
    const productIds: string[] = createOrderDto.items.map(
      (item) => item.product_id,
    );

    console.table(productIds);

    const uniqueProductIds = [...new Set(productIds)];
    const products: Product[] = await this.productRepository.findBy({
      id: In(uniqueProductIds),
    });

    if (products.length !== uniqueProductIds.length) {
      const messageValidation = this.messageCreateError(productIds, products);
      throw new Error(messageValidation);
    }

    const order: Order = Order.create({
      client_id: 1,
      items: createOrderDto.items.map((item) => {
        const product = products.find(
          (product) => product.id === item.product_id,
        );

        return {
          price: product.price,
          product_id: item.product_id,
          quantity: item.quantity,
        };
      }),
    });

    await this.orderRepository.save(order);

    return order;
  }

  findAll() {
    return this.orderRepository.find();
  }

  findOne(id: string) {
    return this.orderRepository.findOne({
      where: { id },
    });
  }

  private messageCreateError = (productIds: string[], products: Product[]) =>
    `Existe divergência no cadastro de produtos. Produtos enviados na requisição ${productIds}. Produtos encontrados no banco de dados ${products.map(
      (product) => {
        return product.id;
      },
    )}`;
}
