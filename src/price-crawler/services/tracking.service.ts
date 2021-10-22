import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { ITracking, ITrackingCreate } from '../interface/tracking.interface';
import { Tracking, TrackingDocument } from '../schema/tracking.schema';

@Injectable()
export class TrackingService {
  constructor(@InjectModel(Tracking.name) private TrackingModel: Model<TrackingDocument>) { }

  async create(createTracking: ITrackingCreate): Promise<Tracking> {
    const tracking = new this.TrackingModel(createTracking);
    return tracking.save();
  }

  async list(): Promise<Tracking[]> {
    return this.TrackingModel.find()
          .populate('user')
          .populate('produto')
          .exec()
  }

  async remove(id: string): Promise<any> {
    return this.TrackingModel.deleteOne({ _id: id })
  }
}
