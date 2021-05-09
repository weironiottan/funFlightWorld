
import { Address } from './address.model';
import { GeoCode } from './geocode.model';
import { TravelerAnalytics } from './travelers-analytics.model';

export interface LocationInformation {
  address: Address;
  analytics: TravelerAnalytics;
  detailedName: string;
  geoCode: GeoCode;
  iataCode: string;
  id: string;
  name: string;
  subtype: string;
  timeZoneOffset: string;
  type: string;
}
