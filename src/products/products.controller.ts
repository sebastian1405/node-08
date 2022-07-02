import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  ParseIntPipe,
  Patch,
  Post,
  Put,
  Query,
  Res,
} from '@nestjs/common';
import { Response } from 'express';
import { Product } from './interfaces/product.interface';
import { ProductsService } from './products.service';

interface IUser {
  name: string;
  description: string;
}

@Controller('products')
export class ProductsController {
  constructor(private readonly productsService: ProductsService) {}

  @Get()
  getAllProducts(): Product[] {
    return this.productsService.getAll();
  }

  @Get('hot')
  getSpecialProducts(): string {
    return 'Te vamos a mostrar los productos más calientes!!';
  }

  @Get(':id/:size')
  findWithSize(@Param('id') id: string, @Param('size') size: string) {
    return `En esta ruta obtenemos el producto ${id}, pero en su tamaño ${size}`;
  }

  @Post()
  @HttpCode(HttpStatus.CREATED)
  createProduct(
    @Body('name') name: string,
    @Body('description') description: string,
  ) {
    return `Creo un producto ${name} con descripción ${description}`;
  }

  @Get('query')
  rutaQuery(@Query('misa') misa: string) {
    // ?misa=genial
    return misa; // genial
  }

  @Get('cars')
  carsQuery(@Query('count', ParseIntPipe) carCount: number) {
    return carCount;
  }

  @Get(':id')
  findOne(@Res() response: Response, @Param('id') id: number) {
    if (id < 100) {
      return response.status(HttpStatus.OK).send(`Página del producto ${id}`);
    } else {
      return response.status(HttpStatus.NOT_FOUND).send(`Producto inexistente`);
    }
  }

  @Put(':id')
  update(@Param('id') id: number, @Body() body: IUser) {
    return `Estás haciendo una operación de actualización del recurso ${id} 
          con ${body.name} y ${body.description}`;
  }

  @Patch(':id')
  partialUpdate(@Param('id') id: number) {
    return `Actualización parcial del ítem ${id}`;
  }

  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  delete(@Param('id') id: number) {
    return `Hemos borrado el producto ${id}`;
  }
}
