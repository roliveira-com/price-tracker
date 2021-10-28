import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  resolveEntryContent() {
    return { title: 'Price Looker, rastreador de preços' };;
  }
}
