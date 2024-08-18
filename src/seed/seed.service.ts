import { Injectable, OnModuleInit } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Seller } from '../seller/entities/seller.entity';
import { Order } from '../order/entities/order.entity';
import * as fs from 'fs';
import * as path from 'path';

@Injectable()
export class SeedService implements OnModuleInit {
  constructor(
    @InjectRepository(Seller)
    private sellersRepository: Repository<Seller>,
    @InjectRepository(Order)
    private ordersRepository: Repository<Order>,
  ) {}

  async onModuleInit() {
    await this.seedSellers();
    await this.seedOrders();
  }

  private async seedSellers() {
    const filePath = path.join(__dirname, '../../data/sellers.json');
    const sellersData = JSON.parse(fs.readFileSync(filePath, 'utf8'));

    for (const sellerData of sellersData) {
      const seller = this.sellersRepository.create(sellerData);
      await this.sellersRepository.save(seller);
    }
  }

  private async seedOrders() {
    const filePath = path.join(__dirname, '../../data/orders.json');
    const ordersData = JSON.parse(fs.readFileSync(filePath, 'utf8'));

    for (const orderData of ordersData) {
      const seller = await this.sellersRepository.findOne({
        where: { id: orderData.seller },
      });
      const order = this.ordersRepository.create({
        ...orderData,
        seller,
      });

      await this.ordersRepository.save(order);
    }
  }
}
