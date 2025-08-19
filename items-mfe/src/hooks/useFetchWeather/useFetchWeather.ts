import { useQuery, UseQueryResult } from "@tanstack/react-query";

import { useMetrics } from "../useMetrics";
import { UserGeolocation } from "@/types/userGeolocation";
import { IWeatherService } from "@/services/weather/weather.interface";

type FetchWeatherResponse = {
	currentWeather: CurrentWeather;
	weatherForecast: WeatherForecast;
};

export const useFetchWeather = (
	weatherService: IWeatherService,
	searchQuery?: string,
	geoData?: UserGeolocation
): UseQueryResult<FetchWeatherResponse> => {
	const { metrics } = useMetrics();
	const { units } = metrics;

	const fetchWeather = async () => {
		return weatherService.findWeather(units, searchQuery, geoData);
	};

	return useQuery({
		queryKey: ["weather", searchQuery || geoData, units],
		queryFn: fetchWeather,
		enabled: (!!geoData?.latitude && !!geoData?.longitude) || !!searchQuery,
		staleTime: 60 * 5 * 1000,
	});
};
