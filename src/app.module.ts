import { Module } from '@nestjs/common';
import { OrderModule } from './order/order.module';
import { SellerModule } from './seller/seller.module';

@Module({
  imports: [OrderModule, SellerModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
