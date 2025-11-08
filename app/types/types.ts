export interface deviceType {
  id: number | string,
  signal: number;
  BatteryValue: number;
  IsCharger: boolean;
  SignalType: number;// [1, 2, 3, 4];
  name: string;
  Imei: string;
  phone: string;
  lastheight: number;
  status : 'good' | 'unknown' | 'broken'
  coords: []; //Shu sonlarga yaqin bo'lsin : [41.3251, 69.2402]


  item : any
}