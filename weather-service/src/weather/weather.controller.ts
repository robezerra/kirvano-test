import { Controller, Get, Query, UseGuards } from '@nestjs/common';

import { WeatherService } from './weather.service';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';

@UseGuards(JwtAuthGuard)
@Controller('weather')
export class WeatherController {
  constructor(private readonly weatherService: WeatherService) {}

  @Get()
  findWeather(
    @Query('query') query: string,
    @Query('latitude') latitude: number,
    @Query('longitude') longitude: number,
    @Query('units') units: 'metric' | 'imperial',
  ) {
    const dto = {
      coords: { latitude, longitude },
      units,
      query,
    };

    if (!dto.query && !dto.coords.latitude && !dto.coords.longitude) {
      throw new Error('No location information provided');
    }

    return this.weatherService.findWeather(dto);
  }
}
