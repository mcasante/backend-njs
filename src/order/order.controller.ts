import { Controller, Query, Get, Param } from '@nestjs/common';
import { OrderService } from './order.service';
import { ListOrdersDTO } from './dto';

@Controller('orders')
export class OrderController {
  constructor(private readonly orderService: OrderService) {}

  @Get()
  findAll(@Query() query: ListOrdersDTO) {
    return this.orderService.findAll(query);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.orderService.findOne(+id);
  }
}
