import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Order } from './entities/order.entity';
import { ListOrdersDTO } from './dto/list-orders-dto';

@Injectable()
export class OrderService {
  constructor(
    @InjectRepository(Order)
    private orderRepository: Repository<Order>,
  ) {}

  findAll(query: ListOrdersDTO): Promise<Order[]> {
    const sortBy =
      query.sort === 'seller' ? 'seller.name' : `order.${query.sort}`;

    return this.orderRepository
      .createQueryBuilder('order')
      .leftJoinAndSelect('order.seller', 'seller')
      .orderBy(sortBy, query.order)
      .take(query.limit)
      .skip((query.page - 1) * query.limit)
      .getMany();
  }

  findOne(orderId: number): Promise<Order | null> {
    return this.orderRepository.findOneBy({ orderId });
  }
}
