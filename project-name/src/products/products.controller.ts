import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
} from '@nestjs/common';
import { ApiCreatedResponse, ApiOkResponse, ApiTags } from '@nestjs/swagger';
import { Product } from 'src/dto/create-products.dto';
import {
  ProductResponse,
  ProductResponseCreated,
} from 'src/entites/products.entites';
import { ProductsService } from './products.service';
@ApiTags('products')
@Controller('products')
export class ProductController {
  constructor(private readonly productsService: ProductsService) {}
  @ApiOkResponse({ type: ProductResponse, isArray: true })
  @Get()
  // @Header('Content-type', 'text/html')
  getProducts(): ProductResponse[] {
    return this.productsService.getProducts();
  }

  @Post()
  @ApiCreatedResponse({ type: ProductResponseCreated })
  addProduct(@Body() body: Product): ProductResponseCreated {
    const genId = this.productsService.insertProduct(
      body.title,
      body.description,
      body.price,
    );
    return { id: genId };
  }

  @Get(':id')
  @ApiOkResponse({ type: ProductResponse })
  getSingle(@Param('id') id: string): ProductResponse {
    return this.productsService.getSingle(id);
  }
  @Patch(':id')
  @ApiOkResponse({ type: ProductResponse })
  updateSingle(
    @Param('id') id: string,
    @Body('title') prodTitle: string,
    @Body('description') prodDescription: string,
    @Body('price') prodPrice: number,
  ): ProductResponse {
    return this.productsService.updateSingle(
      id,
      prodTitle,
      prodDescription,
      prodPrice,
    );
  }
  @Delete(':id')
  @ApiOkResponse({ type: ProductResponse })
  deleteProduct(@Param('id') id: string): ProductResponse {
    return this.productsService.deleteProduct(id);
  }
}
