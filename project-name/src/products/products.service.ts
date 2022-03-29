import { Injectable } from '@nestjs/common';
import { Product } from './product.module';
@Injectable()
export class ProductsService {
  products: Product[] = [];
  insertProduct(title: string, des: string, price: number) {
    const productId = new Date().toString();
    const newProduct = new Product(new Date().toString(), title, des, price);
    this.products.push(newProduct);
    return productId;
  }
}
