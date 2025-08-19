import { useMetrics } from "@/hooks/useMetrics";
import { weatherIconUrl } from "@/services/weather/weather.service";

type CurrentWeatherProps = {
	currentWeather: CurrentWeather;
};

export const WeatherCard = ({ currentWeather }: CurrentWeatherProps) => {
	const { metrics } = useMetrics();
	const { name, main, sys, weather, wind } = currentWeather;

	return (
		<div className="flex flex-col items-center">
			<h2 className="text-lg font-bold">
				{name}, {sys.country}
			</h2>

			<h3 className="mt-2 mb-4 font-semibold">Current Weather</h3>
			<div className="flex items-center justify-center mb-4">
				<img
					src={`${weatherIconUrl}${weather[0].icon}@2x.png`}
					alt={weather[0].description}
				/>

				<span className="text-4xl font-bold pr-6">
					{Math.round(main.temp)}
					<sup>&deg;{metrics.temperature}</sup>
				</span>

				<div className="text-rigth">
					<span className="block font-semibold">{weather[0].main}</span>
					<span className="block text-sm">
						Feels like {Math.round(main.feels_like)}
						<sup>&deg;C</sup>
					</span>
				</div>
			</div>

			<div className="flex justify-between text-sm w-full max-w-md">
				<div className="text-center">
					Wind <br /> {Math.round(wind.speed)} {metrics.wind}
				</div>
				<div className="text-center">
					Humidity <br /> {main.humidity}%
				</div>
				<div className="text-center">
					Pressure <br /> {main.pressure} mb
				</div>
			</div>
		</div>
	);
};
