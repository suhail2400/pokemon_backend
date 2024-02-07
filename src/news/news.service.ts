import { Injectable, InternalServerErrorException, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { News } from './news.model';


@Injectable()
export class NewsService {
  constructor(@InjectModel('News') readonly newsModel: Model<News>) {}

  async getAllArticles(page: number = 1, pageSize: number =10): Promise<News[]> {
    try {
      const skip = (page-1) * pageSize;
      const news = await this.newsModel.find().skip(skip).limit(pageSize).exec();
      return news;
    }catch(error){
      throw new InternalServerErrorException(error);
    }
  }

  async getOneArticle(newsId: number):Promise<News> {
    try {
      return await this.newsModel.findOne({ newsId:newsId});
    } catch (error) {
      throw new NotFoundException(error.message)

    }
  }
}
