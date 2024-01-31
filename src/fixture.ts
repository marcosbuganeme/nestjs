import { NestFactory } from '@nestjs/core';
import { getDataSourceToken } from '@nestjs/typeorm';
import { DataSource } from 'typeorm';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  await app.init();

  const dataSource = app.get<DataSource>(getDataSourceToken());
  await dataSource.synchronize(true);
  const productRepository = dataSource.getRepository('Product');
  await productRepository.insert([
    {
      id: '45d368e9-7cb0-48aa-b13b-3275ccbb0882',
      name: 'Product 1',
      description: 'Product description 1',
      price: 100,
      image_url: 'http://localhost:9000/products/1.png',
    },
    {
      id: 'd84b04d4-9517-4d20-aede-b65f7ba99c1c',
      name: 'Product 2',
      description: 'Product description 2',
      price: 200,
      image_url: 'http://localhost:9000/products/2.png',
    },
    {
      id: '9082016c-4db0-4a52-8b1b-9bd80d949150',
      name: 'Product 3',
      description: 'Product description 3',
      price: 300,
      image_url: 'http://localhost:9000/products/3.png',
    },
    {
      id: '7bcf8fd2-f56d-4134-a18a-17457a7f2ee2',
      name: 'Product 4',
      description: 'Product description 4',
      price: 400,
      image_url: 'http://localhost:9000/products/4.png',
    },
  ]);

  await app.close();
}

bootstrap();
