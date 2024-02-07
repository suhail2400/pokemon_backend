import { Controller, Get, Post, Body, Patch, Param, Delete, Query } from '@nestjs/common';
import { NewsService } from './news.service';


@Controller('news')
export class NewsController {
  constructor(private readonly newsService: NewsService) {}

  // @Post()
  // create(@Body() createNewsDto: CreateNewsDto) {
  //   return this.newsService.create(createNewsDto);
  // }

  // @Get()
  // findAll() {
  //   return this.newsService.findAll();
  // }

  // @Get(':id')
  // findOne(@Param('id') id: string) {
  //   return this.newsService.findOne(+id);
  // }

  // @Patch(':id')
  // update(@Param('id') id: string, @Body() updateNewsDto: UpdateNewsDto) {
  //   return this.newsService.update(+id, updateNewsDto);
  // }

  // @Delete(':id')
  // remove(@Param('id') id: string) {
  //   return this.newsService.remove(+id);
  // }

  @Get()
  async fetchNews (@Query('page') page:number = 1, @Query('pageSize') pageSize:number = 10){
    return await this.newsService.getAllArticles(page,pageSize)
  }
}
