export interface IWeatherService {
	findWeather(
		units: string,
		query?: string,
		geoData?: { latitude: number; longitude: number }
	): Promise<{
		currentWeather: CurrentWeather;
		weatherForecast: WeatherForecast;
	}>;
}
