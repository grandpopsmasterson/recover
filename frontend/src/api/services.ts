import { awsClient } from './clients';
import { mapsClient } from './clients';
import { matterportClient } from './clients';

export class AWSService {
  constructor(private client = awsClient) {}

  async uploadToS3(data: FormData) {
    return this.client.post('/upload', data, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
  }
}

export class GoogleMapsService {
  constructor(private client = mapsClient) {}

  async geocode(address: string) {
    return this.client.get('/geocode/json', {
      params: {
        address,
        key: process.env.NEXT_PUBLIC_GOOGLE_MAPS_KEY,
      },
    });
  }
}

export class MatterportService {
  constructor(private client = matterportClient) {}

  async getModel(modelId: string) {
    return this.client.get(`/models/${modelId}`);
  }
}