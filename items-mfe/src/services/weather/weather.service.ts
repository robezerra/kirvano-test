import { IWeatherService } from "./weather.interface";
// @ts-ignore
const { default: api } = await import("host_app/api");

export const weatherIconUrl = "https://openweathermap.org/img/wn/";
export class WeatherService implements IWeatherService {
	async findWeather(
		units: string,
		query?: string,
		geoData?: { latitude: number; longitude: number }
	): Promise<{
		currentWeather: CurrentWeather;
		weatherForecast: WeatherForecast;
	}> {
		if (!geoData?.latitude || !geoData?.longitude) {
			throw new Error("Invalid coordinates");
		}

		const params = {
			query: query,
			latitude: geoData.latitude,
			longitude: geoData.longitude,
			units: units,
		};

		const response = await api.get(`/weather`, {
			params,
		});

		return {
			currentWeather: response.data.weather,
			weatherForecast: response.data.weatherForecast,
		};
	}
}
