import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Order } from './entities/order.entity';
import { ListOrdersDTO } from './dto';

@Injectable()
export class OrderService {
  constructor(
    @InjectRepository(Order)
    private orderRepository: Repository<Order>,
  ) {}

  async findAll(query: ListOrdersDTO): Promise<{
    data: Order[];
    total: number;
    page: number;
    limit: number;
  }> {
    const sortBy = query.sort.includes('.')
      ? query.sort
      : `order.${query.sort}`;

    const qb = this.orderRepository
      .createQueryBuilder('order')
      .leftJoinAndSelect('order.seller', 'seller');

    if (query.sellerIds && query.sellerIds.length > 0) {
      qb.where('seller.id IN (:...sellerIds)', { sellerIds: query.sellerIds });
    }

    const [data, total] = await qb
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
