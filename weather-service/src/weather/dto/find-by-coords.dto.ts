import { IsString } from 'class-validator';

export class FindWeatherDto {
  coords: { latitude: number; longitude: number };

  @IsString()
  units: 'metric' | 'imperial';

  @IsString()
  query: string;
}
