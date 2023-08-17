export interface CountryAPIResponse {
  name:         Name;
  currencies:   Currencies;
  capital?:      string[];
  translations: { [key: string]: Translation };
  latlng:       number[];
  maps:         Maps;
  population:   number;
  continents:   string[];
  flags:        Flags;
}

 export interface Currencies {
  curr: {};
}

interface Flags {
  png: string;
  svg: string;
  alt: string;
}

interface Maps {
  googleMaps:     string;
  openStreetMaps: string;
}

interface Name {
  common:     string;
  official:   string;
}


interface Translation {
  official: string;
  common:   string;
}
