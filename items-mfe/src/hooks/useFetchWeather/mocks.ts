import { vi } from "vitest";

import { IWeatherService } from "@/services/weather/weather.interface";

const mock = {
	currentWeather: {
		weather: [
			{
				id: 802,
				main: "Clouds",
				description: "scattered clouds",
				icon: "03d",
			},
		],
		main: {
			temp: 26.22,
			feels_like: 26.22,
			temp_min: 25.6,
			temp_max: 27.88,
			pressure: 1013,
			humidity: 79,
			sea_level: 1013,
			grnd_level: 925,
		},
	},
	weatherForecast: [
		{
			main: {
				temp: 22.81,
				feels_like: 22.81,
				temp_min: 22.81,
				temp_max: 22.81,
				pressure: 1013,
				sea_level: 1013,
				grnd_level: 925,
				humidity: 72,
				temp_kf: 0,
			},
			weather: [
				{
					id: 802,
					main: "Clouds",
					description: "scattered clouds",
					icon: "03d",
				},
			],
		},
	],
};

export const mockWeatherService: IWeatherService = {
	findWeather: vi.fn().mockResolvedValue(mock),
	findWeatherByCity: vi.fn().mockResolvedValue(mock),
};
