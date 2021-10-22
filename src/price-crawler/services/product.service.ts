import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { createHash } from 'crypto';
import { Model } from 'mongoose';
import { IProduct, IProductCreate } from '../interface/product.interface';
import { ITracking } from '../interface/tracking.interface';
import { Product, ProductDocument } from '../schema/product.schema';

@Injectable()
export class ProductService {
  constructor(@InjectModel(Product.name) private ProductModel: Model<ProductDocument>) { }

  async create(createProduct: IProductCreate): Promise<IProduct> {

    createProduct = {
      ...createProduct,
      sku: this.skuHash(createProduct.url)
    }

    const product = new this.ProductModel(createProduct);
    return product.save();
  }

  async list(): Promise<IProduct[]> {
    return this.ProductModel.find().exec();
  }

  async getProductByUrl(url: string): Promise<IProduct> {
    const sku = this.skuHash(url);

    return this.ProductModel.findOne({ sku }).exec();
  }

  public skuHash(url: string): string {
    return createHash('md5').update(url).digest('hex');
  }
}
