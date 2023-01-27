import { Injectable } from '@nestjs/common';
import axios from 'axios';
import * as jsdom from 'jsdom';
import { CATEGORIES } from './app.constants';
import { GetLeadsQuery } from './app.controller';
export interface Lead {
  name: string;
  logo: string;
  data: Array<string>;
}
@Injectable()
export class AppService {
  async getRawHTML(path = '22/aditivos'): Promise<string> {
    try {
      const target = `https://expoplastperu.com/guia/rubro/${path}`;
      const response = await axios.get(target);
      const rawHTML = response.data.trim();

      return rawHTML;
    } catch (error) {
      throw new Error(error);
    }
  }

  async htmlToJson(html: string, category: string): Promise<Lead[]> {
    try {
      const leads: Lead[] = [];

      const { JSDOM } = jsdom;
      const { document } = new JSDOM(html).window;
      const container = document.createElement('div');
      container.innerHTML = html;

      const premiumElements = container.querySelectorAll('.premium');

      for (const element of premiumElements) {
        const lead = {
          name: '',
          logo: '',
          data: [],
          category,
          tiers: Math.floor(Math.random() * 10),
          teus: Math.floor(Math.random() * 10),
        };

        const name = element.querySelector('.premium-titulo').textContent;
        const logo = element.querySelector('.premium-logo');
        const logoSRC = logo.getAttribute('src');
        const premiumData = element.querySelectorAll('.premium-dato');

        lead.name = name;
        lead.logo = logoSRC;

        for (const data of premiumData) {
          lead.data.push(data.textContent.trim());
        }

        leads.push(lead);
      }

      return leads;
    } catch (error) {
      throw new Error(error);
    }
  }

  async getLeads(query: GetLeadsQuery): Promise<Lead[]> {
    try {
      const { category } = query;
      const { path } = CATEGORIES.find((c) => c.slug === category);
      const rawHTML: string = await this.getRawHTML(path);
      const leads = await this.htmlToJson(rawHTML, category);

      return leads;
    } catch (error) {
      throw new Error(error);
    }
  }
}
