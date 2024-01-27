// src/news/news.controller.ts
import { Controller, Get } from '@nestjs/common';
import { NewsService } from './news.service';

@Controller('news')
export class NewsController {
  constructor(private readonly newsService: NewsService) {}

  @Get('top-headlines')
  async getTopHeadlines() {
    const headlines = await this.newsService.getTopHeadlines();
    return headlines;
  }
}
