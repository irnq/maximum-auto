export interface ICar {
  car_id: string;
  '@_id': string;
  brandName: string;
  modelName: string;
  vin: string;
  Year: number;
  Color: string;
  interiorColor: string;
  modelYear: number;
  bodyType: string;
  Complectation: string;
  DriveType: string;
  EngineSize: number;
  Power: number;
  FuelType: string;
  Transmission: string;
  transmissionRu: string;
  steeringWheelSide: string;
  storageAdress: string;
  price: number;
  photos: {
    imgs: Photo[];
    wrap: boolean;
  };
  modificationName: string;
}

export interface Photo {
  _id: string;
  season: string;
  position: number;
  complect: number;
  accepted: boolean;
  url: string;
  urlThumb: string;
}

