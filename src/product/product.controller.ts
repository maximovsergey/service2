import { Product, ProductService } from './product.service';
import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
} from '@nestjs/common';

@Controller('product')
export class ProductController {
  constructor(private readonly productServica: ProductService) {}

  @Get()
  async getAllProducts(): Promise<Product[]> {
    return await this.productServica.getAllProducts();
  }
  @Get(':id')
  async getOne(@Param('id') id): Promise<Product> {
    return await this.productServica.getOne(id);
  }
  @Post()
  async create(@Body('name') name): Promise<Product | Error> {
    return await this.productServica.create(name);
  }
  @Put()
  async update(@Body() data: Product): Promise<Product | Error> {
    return await this.productServica.update(data);
  }
  @Delete(':id')
  async delete(@Param('id') id): Promise<boolean> {
    return await this.productServica.delete(id);
  }
}
