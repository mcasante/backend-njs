import { Controller, Res, Get, Param } from '@nestjs/common';
import { OrderService } from './order.service';
import type { Response } from 'express';

import * as orders from '../data/orders.json';

@Controller('orders')
export class OrderController {
  constructor(private readonly orderService: OrderService) {}

  @Get()
  findAll(@Res() res: Response) {
    return res.json(orders);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.orderService.findOne(+id);
  }
}
