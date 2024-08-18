import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Order {
  @PrimaryGeneratedColumn()
  orderId: number;

  @Column()
  product: string;

  @Column()
  seller: number;

  @Column()
  country: string;

  @Column()
  price: number;
}
