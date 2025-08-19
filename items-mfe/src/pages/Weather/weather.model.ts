import { useState } from "react";

import { useFetchWeather } from "@/hooks/useFetchWeather/useFetchWeather";
import { useGeolocation } from "@/hooks/useGeolocation";
import { WeatherService } from "@/services/weather/weather.service";

export const useWeatherModel = () => {
	const [searchQuery, setSearchQuery] = useState("");
	const {
		isGeolocationLoading,
		error: geoError,
		data: geoData,
	} = useGeolocation();

	const weatherService = new WeatherService();

	const {
		data,
		error: apiError,
		isLoading: isApiLoading,
	} = useFetchWeather(weatherService, searchQuery, geoData);

	const { currentWeather, weatherForecast } = data || {};

	return {
		isGeolocationLoading,
		geoError,
		geoData,
		searchQuery,
		setSearchQuery,
		data,
		apiError,
		isApiLoading,
		currentWeather,
		weatherForecast,
	};
};
