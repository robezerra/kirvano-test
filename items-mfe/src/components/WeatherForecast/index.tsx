import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";

import { useMetrics } from "@/hooks/useMetrics";
import { weatherIconUrl } from "@/services/weather/weather.service";
import { getShortDate } from "@/utils";

type WeatherForecastProps = {
	forecast: WeatherForecast;
};

export const WeatherForecast = ({ forecast }: WeatherForecastProps) => {
	const { metrics } = useMetrics();

	return (
		<>
			<h2 className="text-lg font-bold mb-4">Forecast</h2>
			<Swiper spaceBetween={10} slidesPerView={5} className="w-full">
				{forecast.list.map((forecastItem: any, index: number) => {
					const { dt, weather, main, wind } = forecastItem;

					return (
						<SwiperSlide key={index} className="p-2 w-32 rounded-lg shadow-md">
							<p className="font-semibold">{getShortDate(dt)}</p>
							<div className="flex justify-center mb-1">
								<img
									src={`${weatherIconUrl}${weather[0].icon}.png`}
									alt={weather[0].description}
								/>
							</div>
							<p className="text-xl font-bold">
								{Math.round(main.temp)}&deg;{metrics.temperature}
							</p>
							<p className="font-semibold">{weather[0].main}</p>
							<div>
								{Math.round(wind.speed)} {metrics.wind}
							</div>
						</SwiperSlide>
					);
				})}
			</Swiper>
		</>
	);
};
