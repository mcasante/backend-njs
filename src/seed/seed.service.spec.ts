import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Seller } from '../seller/entities/seller.entity';
import { Order } from '../order/entities/order.entity';
import { SeedService } from './seed.service';
import * as fs from 'fs';
import * as path from 'path';

jest.mock('fs');

describe('SeedService', () => {
  let service: SeedService;
  let sellersRepository: Repository<Seller>;
  let ordersRepository: Repository<Order>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        SeedService,
        {
          provide: getRepositoryToken(Seller),
          useClass: Repository,
        },
        {
          provide: getRepositoryToken(Order),
          useClass: Repository,
        },
      ],
    }).compile();

    service = module.get<SeedService>(SeedService);
    sellersRepository = module.get<Repository<Seller>>(
      getRepositoryToken(Seller),
    );
    ordersRepository = module.get<Repository<Order>>(getRepositoryToken(Order));
  });

  it('should call seedSellers and seedOrders', async () => {
    // Spy on seedSellers and seedOrders
    const seedSellersSpy = jest
      .spyOn(service as any, 'seedSellers')
      .mockResolvedValue(undefined);
    const seedOrdersSpy = jest
      .spyOn(service as any, 'seedOrders')
      .mockResolvedValue(undefined);

    await service.onModuleInit();

    expect(seedSellersSpy).toHaveBeenCalled();
    expect(seedOrdersSpy).toHaveBeenCalled();

    // Cleanup spies
    seedSellersSpy.mockRestore();
    seedOrdersSpy.mockRestore();
  });

  it('should seed sellers', async () => {
    const sellersData = [{ id: 1, name: 'Seller 1' }];
    jest.spyOn(fs, 'readFileSync').mockReturnValue(JSON.stringify(sellersData));
    jest
      .spyOn(sellersRepository, 'create')
      .mockReturnValue(sellersData[0] as Seller);
    jest
      .spyOn(sellersRepository, 'save')
      .mockResolvedValue(sellersData[0] as Seller);

    await service['seedSellers']();

    expect(fs.readFileSync).toHaveBeenCalledWith(
      path.join(__dirname, '../../data/sellers.json'),
      'utf8',
    );
    expect(sellersRepository.create).toHaveBeenCalledWith(sellersData[0]);
    expect(sellersRepository.save).toHaveBeenCalledWith(sellersData[0]);
  });

  it('should seed orders', async () => {
    const ordersData = [{ orderId: 1, seller: { id: 1 } }];
    const seller = { id: 1, name: 'Seller 1' } as Seller;
    jest.spyOn(fs, 'readFileSync').mockReturnValue(JSON.stringify(ordersData));
    jest.spyOn(sellersRepository, 'findOne').mockResolvedValue(seller);
    jest
      .spyOn(ordersRepository, 'create')
      .mockReturnValue(ordersData[0] as Order);
    jest
      .spyOn(ordersRepository, 'save')
      .mockResolvedValue(ordersData[0] as Order);

    await service['seedOrders']();

    expect(fs.readFileSync).toHaveBeenCalledWith(
      path.join(__dirname, '../../data/orders.json'),
      'utf8',
    );
    expect(sellersRepository.findOne).toHaveBeenCalledWith({
      where: { id: ordersData[0].seller },
    });
    expect(ordersRepository.create).toHaveBeenCalledWith({
      ...ordersData[0],
      seller,
    });
    expect(ordersRepository.save).toHaveBeenCalledWith(ordersData[0]);
  });
});
