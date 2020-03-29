import { Injectable } from '@nestjs/common';

import {Model} from 'mongoose';
import {InjectModel} from '@nestjs/mongoose';
import {Product} from './interfaces/product.interface';
import {CreateProductDTO} from './dto/product.dto';

@Injectable()
export class ProductService {

    constructor(@InjectModel('Product') private readonly productModel : Model<Product>) {}

    async getProducts() : Promise<Product[]>{
        try {
            return await this.productModel.find().lean();
        } catch {
            return null;
        }
    };

    async getProduct(productId: string) : Promise<Product>{
        try {
            return await this.productModel.findById(productId).lean();
        } catch {
            return null;
        }
    };

    async createProduct(createProductDTO : CreateProductDTO ) : Promise<Product>{
        try {
            const product = new this.productModel(createProductDTO);
            return await product.save();
        } catch {
            return null;
        }
    }

    async updateProduct(productId: string, createProductDTO: CreateProductDTO) : Promise<Product>{
        try {
            return await this.productModel.findByIdAndUpdate(productId, createProductDTO, {new: true}).lean();
        } catch {
            return null;
        }
    }

    async deleteProduct(productId: string) : Promise<Product>{
        try {
            return await this.productModel.findByIdAndDelete(productId).lean();
        } catch {
            return null;
        }
    }

}
