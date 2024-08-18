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

  async findAll(
    query: ListOrdersDTO,
  ): Promise<{ data: Order[]; total: number; page: number; limit: number }> {
    const sortBy =
      query.sort === 'seller' ? 'seller.name' : `order.${query.sort}`;

    const [data, total] = await this.orderRepository
      .createQueryBuilder('order')
      .leftJoinAndSelect('order.seller', 'seller')
      .orderBy(sortBy, query.order)
      .take(query.limit)
      .skip((query.page - 1) * query.limit)
      .getManyAndCount();

    return {
      data,
      total,
      page: query.page,
      limit: query.limit,
    };
  }
}
