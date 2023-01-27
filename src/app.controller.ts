import {
  BadRequestException,
  Controller,
  Get,
  HttpException,
  Query,
} from '@nestjs/common';
import { AppService, Lead } from './app.service';

export interface GetLeadsQuery {
  page: string;
}
@Controller('/leads')
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  async find(@Query() query: GetLeadsQuery): Promise<Lead[]> {
    try {
      return await this.appService.getLeads(query);
    } catch (error) {
      throw new HttpException(BadRequestException, error);
    }
  }
}
