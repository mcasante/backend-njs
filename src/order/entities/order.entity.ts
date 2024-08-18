import { Entity, Column, PrimaryGeneratedColumn, ManyToOne } from 'typeorm';
import { Seller } from '../../seller/entities/seller.entity';

@Entity()
export class Order {
  @PrimaryGeneratedColumn()
  orderId: number;

  @Column()
  product: string;

  @ManyToOne(() => Seller, (seller) => seller.orders)
  seller: Seller;

  @Column()
  country: string;

  @Column()
  price: number;
}
