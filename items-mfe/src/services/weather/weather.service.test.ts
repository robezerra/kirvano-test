import { describe, it, expect, vi, beforeEach } from "vitest";
import axios from "axios";

import { WeatherService } from "./weather.service";

vi.mock("axios");

describe("WeatherService", () => {
	let weatherService: WeatherService;

	beforeEach(() => {
		weatherService = new WeatherService();
	});

	it("should fetch weather by coordinates", async () => {
		const mockResponse = {
			data: { temperature: 25, condition: "Sunny" },
		};

		(axios.get as any).mockResolvedValueOnce(mockResponse);
		(axios.get as any).mockResolvedValueOnce(mockResponse);

		const result = await weatherService.findWeather(
			{ latitude: 40.7128, longitude: -74.0011 },
			"metric"
		);

		expect(result.currentWeather).toEqual(mockResponse.data);
		expect(result.weatherForecast).toEqual(mockResponse.data);
	});

	it("should fetch weather by city name", async () => {
		const mockResponse = {
			data: { temperature: 18, condition: "Cloudy" },
		};

		(axios.get as any).mockResolvedValueOnce(mockResponse);
		(axios.get as any).mockResolvedValueOnce(mockResponse);

		const result = await weatherService.findWeatherByCity("New York", "metric");

		expect(result.currentWeather).toEqual(mockResponse.data);
		expect(result.weatherForecast).toEqual(mockResponse.data);
	});

	it("should throw an error if coordinates are invalid", async () => {
		await expect(
			weatherService.findWeather({ latitude: 0, longitude: 0 }, "metric")
		).rejects.toThrow("Invalid coordinates");
	});

	it("should throw an error if city name is empty", async () => {
		await expect(
			weatherService.findWeatherByCity("", "metric")
		).rejects.toThrow("City name is required");
	});
});
