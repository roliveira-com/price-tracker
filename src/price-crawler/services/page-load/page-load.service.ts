import { HttpException, Injectable } from '@nestjs/common';
import axios from 'axios'

@Injectable()
export class PageLoadService {
  constructor(){}

  async getPage(): Promise<any> {
    try {
      const { data } = await axios.get('https://www.magazineluiza.com.br/smartphone-samsung-galaxy-s21-128gb-8gb-ram-6-2-camera-tripla-traseira-de-12mp-wide-64mp-telephoto-12mp-ultra-wide-branco/p/ehe859gc28/te/galx/?&seller_id=mobomni&utm_source=google&utm_medium=pla&utm_campaign=&partner_id=54222&gclid=CjwKCAjwn8SLBhAyEiwAHNTJbSLvUSBYJvxybzEmspD1DFmLLIXwr786XNRnN7oisJBrvbdM6lntLBoCk10QAvD_BwE&gclsrc=aw.ds');
      return data
    } catch (error) {
      throw new HttpException('Ocorreu um erro ao obter a página do produto', error.code);
    }
  }
}
