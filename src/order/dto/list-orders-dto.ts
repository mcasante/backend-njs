import { IsInt, IsOptional, IsIn } from 'class-validator';
import { Type } from 'class-transformer';

const sortOrder = ['ASC', 'DESC'] as const;
const sortFields = [
  'orderId',
  'product',
  'seller.name',
  'country',
  'price',
] as const;

export class ListOrdersDTO {
  @IsOptional()
  @Type(() => Number)
  @IsInt()
  page: number = 1;

  @IsOptional()
  @Type(() => Number)
  @IsInt()
  limit: number = 5;

  @IsOptional()
  @IsIn(sortFields)
  sort: (typeof sortFields)[number] = 'orderId';

  @IsOptional()
  @IsIn(sortOrder)
  order: (typeof sortOrder)[number] = 'ASC';

  @IsOptional()
  @Type(() => Number)
  @IsInt()
  sellerId: number;
}
