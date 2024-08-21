import { Test, TestingModule } from '@nestjs/testing';
import { SellerController } from './seller.controller';
import { SellerService } from './seller.service';

describe('SellerController', () => {
  let controller: SellerController;
  let service: SellerService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [SellerController],
      providers: [
        {
          provide: SellerService,
          useValue: {
            findAll: jest.fn(),
          },
        },
      ],
    }).compile();

    controller = module.get<SellerController>(SellerController);
    service = module.get<SellerService>(SellerService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('findAll', () => {
    it('should return an array of sellers', async () => {
      const result = [{ id: 1, name: 'Seller 1' }];
      jest.spyOn(service, 'findAll').mockResolvedValue(result);

      expect(await controller.findAll()).toBe(result);
      expect(service.findAll).toHaveBeenCalled();
    });
  });
});
