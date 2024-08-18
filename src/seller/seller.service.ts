import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Seller } from './entities/seller.entity';

@Injectable()
export class SellerService {
  constructor(
    @InjectRepository(Seller)
    private sellerRepository: Repository<Seller>,
  ) {}

  findAll() {
    return this.sellerRepository
      .createQueryBuilder('seller')
      .leftJoinAndSelect('seller.orders', 'order')
      .select('seller.id', 'id')
      .addSelect('seller.name', 'name')
      .addSelect('COALESCE(SUM(order.price), 0)', 'totalSales')
      .groupBy('seller.id')
      .getRawMany();
  }
}
