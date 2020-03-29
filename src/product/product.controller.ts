import { Controller, Get, Post, Put, Delete, Res, HttpStatus , Body, Param, NotFoundException, Query } from '@nestjs/common';
import {Request, Response} from 'express';
import {CreateProductDTO} from './dto/product.dto';

import { ProductService } from "./product.service";
import { Product } from './interfaces/product.interface';

@Controller('product')
export class ProductController {

    constructor(private productService : ProductService){}

    @Post('/create')
    async createPost(@Res() res : Response, @Body() createProductDTO : CreateProductDTO): Promise<Response> {
        const product = await this.productService.createProduct(createProductDTO);
        return res.status(HttpStatus.OK).json({
            message: 'Product successfully created',
            product
        })
    }

    @Get('/')
    async getProducts(@Res() res : Response) : Promise<Response>{
        const products = await this.productService.getProducts();
        return res.status(HttpStatus.OK).json({
            products
        })
    }

    @Get('/:productId')
    async getProduct(@Res() res : Response, @Param('productId') productId : string) : Promise<Response>{
        const product = await this.productService.getProduct(productId);
        if (!product) throw new NotFoundException('Product does not exists');
        return res.status(HttpStatus.OK).json(product);
    }

    @Delete('/delete')
    async deleteProduct(@Res() res : Response, @Query('productId') productId : string) : Promise<Response>{
        const product = await this.productService.deleteProduct(productId);
        if (!product) throw new NotFoundException('Product does not exists');
        return res.status(HttpStatus.OK).json({
            message: "Product deleted succesfully",
            product
        });
    }

    @Put('/update')
    async updateProduct(@Res() res : Response, @Body() createProductDTO : CreateProductDTO, @Query('productId') productId : string) : Promise<Response>{
        const product = await this.productService.updateProduct(productId, createProductDTO);
        if (!product) throw new NotFoundException('Product does not exists');
        return res.status(HttpStatus.OK).json({
            message: "Product updated succesfully",
            product
        });
    }

}
