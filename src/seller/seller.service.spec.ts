import { Test, TestingModule } from '@nestjs/testing';
import { SellerService } from './seller.service';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Seller } from './entities/seller.entity';
import { Repository } from 'typeorm';

describe('SellerService', () => {
  let service: SellerService;
  let repository: Repository<Seller>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        SellerService,
        {
          provide: getRepositoryToken(Seller),
          useClass: Repository,
        },
      ],
    }).compile();

    service = module.get<SellerService>(SellerService);
    repository = module.get<Repository<Seller>>(getRepositoryToken(Seller));
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('findAll', () => {
    it('should return a list of sellers with total sales', async () => {
      const sellersData = [
        { id: 1, name: 'Seller 1', totalSales: 100 },
        { id: 2, name: 'Seller 2', totalSales: 200 },
      ];

      jest.spyOn(repository, 'createQueryBuilder').mockReturnValue({
        leftJoinAndSelect: jest.fn().mockReturnThis(),
        select: jest.fn().mockReturnThis(),
        addSelect: jest.fn().mockReturnThis(),
        groupBy: jest.fn().mockReturnThis(),
        getRawMany: jest.fn().mockResolvedValue(sellersData),
      } as any);

      expect(await service.findAll()).toEqual(sellersData);
      expect(repository.createQueryBuilder).toHaveBeenCalledWith('seller');
    });
  });
});
