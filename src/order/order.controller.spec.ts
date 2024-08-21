import { Test, TestingModule } from '@nestjs/testing';
import { OrderController } from './order.controller';
import { OrderService } from './order.service';
import { ListOrdersDTO } from './dto/list-orders.dto';
import { Order } from './entities/order.entity';

describe('OrderController', () => {
  let orderController: OrderController;
  let orderService: OrderService;

  // Arrange - findAll | parameters
  const query: ListOrdersDTO = {
    page: 1,
    limit: 10,
    sort: 'orderId',
    order: 'ASC',
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [OrderController],
      providers: [
        {
          provide: OrderService,
          useValue: {
            findAll: jest.fn(),
          },
        },
      ],
    }).compile();

    orderController = module.get<OrderController>(OrderController);
    orderService = module.get<OrderService>(OrderService);
  });

  it('should be defined', () => {
    expect(orderController).toBeDefined();
  });

  describe('findAll', () => {
    it('should return an array of orders', async () => {
      // Arrange
      const result = {
        data: <Order[]>[
          {
            orderId: 1,
            product: 'Product 1',
            seller: { name: 'Seller 1', id: 1 },
            country: 'Country 1',
            price: 100,
          },
        ],
        total: 1,
        page: 1,
        limit: 10,
      };

      jest.spyOn(orderService, 'findAll').mockResolvedValue(result);

      // Act
      const response = await orderController.findAll(query);

      // Assert
      expect(response).toEqual(result);
      expect(orderService.findAll).toHaveBeenCalledWith(query);
    });

    it('should call OrderService with the correct parameters', async () => {
      // Act
      await orderController.findAll(query);

      // Assert
      expect(orderService.findAll).toHaveBeenCalledWith(query);
    });
  });
});
