import axios from 'axios';
import { Redis } from 'ioredis';
import { Inject, Injectable } from '@nestjs/common';

import { FindWeatherDto } from './dto/find-by-coords.dto';
import { Weather } from './types/weather';
import { Forecast } from './types/forecast';

@Injectable()
export class WeatherService {
  private openWeatherMapApiUrl = 'https://api.openweathermap.org/data/2.5';
  private weatherUrl = `${this.openWeatherMapApiUrl}/weather`;
  private forecastWeatherUrl = `${this.openWeatherMapApiUrl}/forecast`;

  constructor(@Inject('REDIS_CLIENT') private readonly redisClient: Redis) {}

  async findWeather(dto: FindWeatherDto): Promise<{
    weather: Weather;
    weatherForecast: Forecast;
  }> {
    const params = {
      q: dto.query || undefined,
      lat: dto.coords.latitude || undefined,
      lon: dto.coords.longitude || undefined,
      appid: process.env.OPENWEATHERMAP_API_KEY,
      units: dto.units,
    };

    const redisKey = `weather:${JSON.stringify(params)}`;
    const cachedData = await this.redisClient.get(redisKey);

    if (cachedData) {
      return JSON.parse(cachedData) as {
        weather: Weather;
        weatherForecast: Forecast;
      };
    }

    const [weatherResponse, forecastResponse] = await Promise.all([
      axios.get<Weather>(this.weatherUrl, { params }),
      axios.get<Forecast>(this.forecastWeatherUrl, { params }),
    ]);

    const data = {
      weather: weatherResponse.data,
      weatherForecast: forecastResponse.data,
    };

    await this.redisClient.set(redisKey, JSON.stringify(data), 'EX', 60 * 10);

    return data;
  }
}
