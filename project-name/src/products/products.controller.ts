import { Body, Controller, Get, Post } from '@nestjs/common';
import { ProductsService } from './products.service';
@Controller('products')
export class ProductController {
  constructor(private readonly productsService: ProductsService) {}

  @Get()
  // @Header('Content-type', 'text/html')
  getHello(): string {
    return 'this.appService.getHello()';
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
}
