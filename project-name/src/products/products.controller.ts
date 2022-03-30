import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
} from '@nestjs/common';
import { Product } from './product.module';
import { ProductsService } from './products.service';
@Controller('products')
export class ProductController {
  constructor(private readonly productsService: ProductsService) {}

  @Get()
  // @Header('Content-type', 'text/html')
  getProducts() {
    return this.productsService.getProducts();
  }

  @Post()
  addProduct(
    @Body('title') prodTitle: string,
    @Body('description') prodDescription: string,
    @Body('price') prodPrice: number,
  ): any {
    const genId = this.productsService.insertProduct(
      prodTitle,
      prodDescription,
      prodPrice,
    );
    return { id: genId };
  }

  @Get(':id')
  getSingle(@Param('id') id: string): Product {
    return this.productsService.getSingle(id);
  }
  @Patch(':id')
  updateSingle(
    @Param('id') id: string,
    @Body('title') prodTitle: string,
    @Body('description') prodDescription: string,
    @Body('price') prodPrice: number,
  ): Product {
    return this.productsService.updateSingle(
      id,
      prodTitle,
      prodDescription,
      prodPrice,
    );
  }
  @Delete(':id')
  deleteProduct(@Param('id') id: string): Product {
    return this.productsService.deleteProduct(id);
  }
}
