import { Injectable, NotFoundException } from '@nestjs/common';
import { Product } from './product.module';
@Injectable()
export class ProductsService {
  products: Product[] = [];
  insertProduct(title: string, des: string, price: number) {
    const productId = Math.random().toString();
    const newProduct = new Product(productId, title, des, price);
    this.products.push(newProduct);
    return productId;
  }
  getProducts() {
    return [...this.products];
  }
  getSingle(id: string) {
    const product = this.findProduct(id)[0];

    return { ...product };
  }
  updateSingle(id: string, title: string, des: string, price: number) {
    const [product, productIndex] = this.findProduct(id);
    const updatedProduct = { ...product };
    if (title) {
      updatedProduct.title = title;
    }
    if (des) {
      updatedProduct.description = des;
    }
    if (price) {
      updatedProduct.price = price;
    }
    this.products[productIndex] = updatedProduct;

    return { ...updatedProduct };
  }

  deleteProduct(id: string) {
    const [_, productIndex] = this.findProduct(id);
    const deletedProduct = this.products[productIndex];
    this.products.splice(productIndex, 1);
    return { ...deletedProduct };
  }

  private findProduct(id: string): [Product, number] {
    const productIndex = this.products.findIndex((prod) => prod.id === id);
    const product = this.products[productIndex];
    if (!product) {
      throw new NotFoundException();
    }
    return [product, productIndex];
  }
}
