import axios from 'axios'
import { HttpException, Injectable } from '@nestjs/common';
import cheerio, { CheerioAPI } from 'cheerio';
import { IParserElementSpec, IParserStoreTarget } from '../../interface/parse.interface';
import * as Configs from '../../configs/parse.config.json';
import { ISelectedStore } from '../../interface/store.interface';
import { IProduct } from 'src/price-crawler/interface/product.interface';
import { IQuotation } from 'src/price-crawler/interface/quotation.interface';

@Injectable()
export class PageParseService {

  private _selector: CheerioAPI;
  private _parserSpecs: IParserElementSpec[];

  parsePage(page: string, store: ISelectedStore){
    this._selector = cheerio.load(page);
    this._parserSpecs = this._getElementParserSpecs(store);

    const product = this._getProductTitle();
    const price = this._getProductPrice();
    const image = this._getProductImage();

    return this._parseFromSpecList(this._parserSpecs)

    // return {
    //   product,
    //   price,
    //   image,
    //   parserSpecs: this._parserSpecs
    // }
  }

  async parseUrlToProduct(url: string, loja: ISelectedStore): Promise<IProduct> {
    const page = await this.getPage(url);
    
    this._selector = cheerio.load(page);
    this._parserSpecs = this._getElementParserSpecs(loja);
    
    const product = this._parseFromSpecList(this._parserSpecs);

    return { 
      ...product, 
      url, 
      loja,
      sku: null, 
      precoInicial: product.price 
    }
  }

  async parseUrlToQuotation(url: string, store: ISelectedStore): Promise<IQuotation> {
    const page = await this.getPage(url);

    this._selector = cheerio.load(page);
    this._parserSpecs = this._getElementParserSpecs(store);

    return await this._parseAsyncFromSpecList(this._parserSpecs);
  }

  async getPage(url: string): Promise<any> {
    try {
      const { data } = await axios.get(url);
      return data
    } catch (error) {
      throw new HttpException('Ocorreu um erro ao obter a página do produto', error.code);
    }
  }

  private _parseFromSpecList(specs: IParserElementSpec[], quotation = {}): IQuotation {
    specs.forEach(spec => {
      quotation = {
        ...quotation,
        [spec.elementName]: this._parseFromSpec(spec)
      }
    })

    return quotation as IQuotation;
  }

  private _parseAsyncFromSpecList(specs: IParserElementSpec[], quotation = {}): Promise<IQuotation> {
    return new Promise((res, rej) => {
      specs.forEach(spec => {
        quotation = {
          ...quotation,
          [spec.elementName]: this._parseFromSpec(spec)
        }
      });

      res(quotation as IQuotation)
    })
  }

  private _parseFromSpec(spec: IParserElementSpec): string {

    const elm = this._selector(spec.contextSelector).find(spec.targetSelector);

    return elm[spec.targetAttribute.type](spec.targetAttribute.attribute || undefined);
  }

  private _getProductTitle(): string {

    const spec = this._parserSpecs[1]

    // const titleElement = this._selector('section[itemscope]').find(
    //   this._selector('h1[itemprop=name]')
    // );

    //const titleElement = this._selector('section[itemscope]').find('h1[itemprop=name]');

    const titleElement = this._selector(spec.contextSelector).find(
      spec.targetSelector
    );

    return titleElement[spec.targetAttribute.type](spec.targetAttribute.attribute || undefined);
  }

  private _getProductPrice(): string {

    const priceElement = this._selector('section[itemscope]').find(
      this._selector('h4[itemprop=price]')
    );

    return priceElement.text();
  }

  private _getProductImage(): string {

    const spec = this._parserSpecs[2];

    const imageElement = this._selector(spec.contextSelector).find(spec.targetSelector);

    return imageElement[spec.targetAttribute.type](spec.targetAttribute.attribute || undefined);
  }

  /**
   * Obtem os parametros para o parse a partir do storeId da loja
   * @param selectedStore: ISelectedStore
   * @returns IParserStoreTarget
   */
  private _getParserSpecs(selectedStore: ISelectedStore): IParserStoreTarget{
    return Configs.storesTarget.find(store => {
      return store.storeId === selectedStore.storeId;
    })
  }

  /**
   * Obtem os parametros para o parse a partir do storeId da loja
   * @param selectedStore ISelectedStore
   * @returns IParserStoreTarget
   */
  private _getElementParserSpecs(selectedStore: ISelectedStore): Array<IParserElementSpec>{
    const parserSpecs = this._getParserSpecs(selectedStore);

    return parserSpecs.crawlerSpecs;
  }

}
