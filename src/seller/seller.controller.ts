import { Controller, Res, Get, Param } from '@nestjs/common';
import { SellerService } from './seller.service';
import type { Response } from 'express';

import * as sellers from '../data/sellers.json';

@Controller('sellers')
export class SellerController {
  constructor(private readonly sellerService: SellerService) {}

  @Get()
  findAll(@Res() res: Response) {
    // return this.sellerService.findAll();
    return res.json(sellers);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.sellerService.findOne(+id);
  }
}
