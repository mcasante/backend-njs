import { Injectable } from '@nestjs/common';

@Injectable()
export class SellerService {
  findAll() {
    return `This action returns all seller`;
  }

  findOne(id: number) {
    return `This action returns a #${id} seller`;
  }
}
