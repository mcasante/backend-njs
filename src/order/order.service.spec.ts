import { Test, TestingModule } from '@nestjs/testing';
import { OrderService } from './order.service';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Order } from './entities/order.entity';
import { Repository } from 'typeorm';
import { ListOrdersDTO } from './dto/list-orders.dto';

describe('OrderService', () => {
  let service: OrderService;
  let repository: Repository<Order>;

  const baseQuery: ListOrdersDTO = {
    sort: 'orderId',
    order: 'ASC',
    limit: 10,
    page: 1,
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        OrderService,
        {
          provide: getRepositoryToken(Order),
          useClass: Repository,
        },
      ],
    }).compile();

    service = module.get<OrderService>(OrderService);
    repository = module.get<Repository<Order>>(getRepositoryToken(Order));
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should return paginated orders with sorting', async () => {
    const orders = [
      { orderId: 1, seller: { id: 1 } },
      { orderId: 2, seller: { id: 2 } },
    ] as Order[];

    jest.spyOn(repository, 'createQueryBuilder').mockReturnValue({
      leftJoinAndSelect: jest.fn().mockReturnThis(),
      where: jest.fn().mockReturnThis(),
      orderBy: jest.fn().mockReturnThis(),
      take: jest.fn().mockReturnThis(),
      skip: jest.fn().mockReturnThis(),
      getManyAndCount: jest.fn().mockResolvedValue([orders, orders.length]),
    } as any);

    const result = await service.findAll(baseQuery);

    expect(result).toEqual({
      data: orders,
      total: 2,
      page: 1,
      limit: 10,
    });
  });

  it('should return paginated orders sorted by seller.name', async () => {
    const orders = [
      { orderId: 1, seller: { id: 1, name: 'Seller 1' } },
      { orderId: 2, seller: { id: 2, name: 'Seller 2' } },
    ] as Order[];

    jest.spyOn(repository, 'createQueryBuilder').mockReturnValue({
      leftJoinAndSelect: jest.fn().mockReturnThis(),
      where: jest.fn().mockReturnThis(),
      orderBy: jest.fn().mockReturnThis(),
      take: jest.fn().mockReturnThis(),
      skip: jest.fn().mockReturnThis(),
      getManyAndCount: jest.fn().mockResolvedValue([orders, orders.length]),
    } as any);

    const query = {
      ...baseQuery,
      sort: 'seller.name' as any,
    };

    const result = await service.findAll(query);

    expect(result).toEqual({
      data: orders,
      total: 2,
      page: 1,
      limit: 10,
    });
  });

  it('should filter orders by seller IDs', async () => {
    const query: ListOrdersDTO = {
      ...baseQuery,
      sellerIds: [1],
    };

    const orders = [{ orderId: 1, seller: { id: 1 } }] as Order[];

    jest.spyOn(repository, 'createQueryBuilder').mockReturnValue({
      leftJoinAndSelect: jest.fn().mockReturnThis(),
      where: jest.fn().mockReturnThis(),
      orderBy: jest.fn().mockReturnThis(),
      take: jest.fn().mockReturnThis(),
      skip: jest.fn().mockReturnThis(),
      getManyAndCount: jest.fn().mockResolvedValue([orders, orders.length]),
    } as any);

    const result = await service.findAll(query);

    expect(result).toEqual({
      data: orders,
      total: 1,
      page: 1,
      limit: 10,
    });

    expect(repository.createQueryBuilder().where).toHaveBeenCalledWith(
      'seller.id IN (:...sellerIds)',
      { sellerIds: query.sellerIds },
    );
  });

  it('should return orders without filtering by seller IDs if none provided', async () => {
    const query: ListOrdersDTO = {
      ...baseQuery,
      sellerIds: [],
    };

    const orders = [
      { orderId: 1, seller: { id: 1 } },
      { orderId: 2, seller: { id: 2 } },
    ] as Order[];

    jest.spyOn(repository, 'createQueryBuilder').mockReturnValue({
      leftJoinAndSelect: jest.fn().mockReturnThis(),
      orderBy: jest.fn().mockReturnThis(),
      take: jest.fn().mockReturnThis(),
      skip: jest.fn().mockReturnThis(),
      getManyAndCount: jest.fn().mockResolvedValue([orders, orders.length]),
    } as any);

    const result = await service.findAll(query);

    expect(result).toEqual({
      data: orders,
      total: 2,
      page: 1,
      limit: 10,
    });
  });
});
