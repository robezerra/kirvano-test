export interface Forecast {
  city: City;
  cod: string;
  message: number;
  cnt: number;
  list: ForecastDay[];
}

interface City {
  id: number;
  name: string;
  coord: Coordinates;
  country: string;
  population: number;
  timezone: number;
}

interface Coordinates {
  lon: number;
  lat: number;
}

interface ForecastDay {
  dt: number;
  sunrise: number;
  sunset: number;
  temp: Temperature;
  feels_like: FeelsLike;
  pressure: number;
  humidity: number;
  weather: WeatherCondition[];
  speed: number;
  deg: number;
  gust: number;
  clouds: number;
  pop: number;
  rain?: number;
}

interface Temperature {
  day: number;
  min: number;
  max: number;
  night: number;
  eve: number;
  morn: number;
}

interface FeelsLike {
  day: number;
  night: number;
  eve: number;
  morn: number;
}

interface WeatherCondition {
  id: number;
  main: string;
  description: string;
  icon: string;
}
