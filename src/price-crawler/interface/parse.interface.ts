import { ISelectedStore } from "./store.interface";

export interface IParserElementSpec {
  elementName: string;
  contextSelector: string;
  targetSelector: string;
  targetAttribute: {
    type: string;
    attribute?: string
  }
}

export interface IParserStoreTarget extends ISelectedStore{
  crawlerSpecs: Array<IParserElementSpec>
}