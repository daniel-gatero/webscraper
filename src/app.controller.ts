import {
  BadRequestException,
  Controller,
  Get,
  HttpException,
  Query,
} from '@nestjs/common';
import { CATEGORIES, Category } from './app.constants';

import { AppService, Lead } from './app.service';

export interface GetLeadsQuery {
  page: string;
  category: string;
}
@Controller('/leads')
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  async getLeads(@Query() query: GetLeadsQuery): Promise<Lead[]> {
    try {
      return await this.appService.getLeads(query);
    } catch (error) {
      throw new HttpException(BadRequestException, error);
    }
  }

  @Get('/categories')
  getCategories(): Category[] {
    return CATEGORIES;
  }
}
