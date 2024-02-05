import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  Req,
  UseGuards,
} from '@nestjs/common';
import { CreateOrderDto } from './dto/create-order.dto';
import { OrdersService } from './orders.service';
import { AuthGuard } from 'src/auth/auth.guard';
import { Request } from 'express';

@UseGuards(AuthGuard)
@Controller('orders')
export class OrdersController {
  constructor(private readonly ordersService: OrdersService) {}

  @Post()
  create(@Body() createOrderDto: CreateOrderDto, @Req() req: Request) {
    return this.ordersService.create({
      ...createOrderDto,
      client_id: req['user'].sub,
    });
  }

  @Get()
  findAll(@Req() req: Request) {
    const client_id = req['user'].sub;
    return this.ordersService.findAll(client_id);
  }

  @Get(':id')
  findOne(@Param('id') id: string, @Req() req: Request) {
    const client_id = req['user'].sub;

    return this.ordersService.findOne(id, client_id);
  }
}
