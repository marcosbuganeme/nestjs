import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('tb_product')
export class Product {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  name: string;

  @Column()
  description: string;

  @Column()
  image_url: string;

  @Column()
  price: number;
}
