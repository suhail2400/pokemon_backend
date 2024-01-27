// src/news/news.service.ts
import { Injectable } from '@nestjs/common';
import { AxiosError, AxiosResponse } from 'axios';
import axios from 'axios';


@Injectable()
export class NewsService {
  private readonly apiKey: string = '3ca354d577ae49df8e291ce88fe2d951';
  private readonly apiUrl: string = 'https://newsapi.org/v2/everything?q=pokemon';

  async getTopHeadlines(): Promise<AxiosResponse | AxiosError> {
    try {
      const response = await axios.get(this.apiUrl, {
        params: {
          apiKey: this.apiKey,
        },
      });
      // Use CircularJSON.stringify to handle circular references
      console.log('News API Response:', response.data);
      return response;
    } catch (error) {
      console.error('Error from News API:', (error.message));
      return error;
    }
  }

}
