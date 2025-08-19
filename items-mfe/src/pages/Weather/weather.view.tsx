import { Header } from "@/components/Header";
import { Toast } from "@/components/Toast";
import { WeatherCard } from "@/components/WeatherCard";
import { WeatherForecast } from "@/components/WeatherForecast";

type WeatherViewProps = {
	geoError: GeolocationPositionError | null;
	apiError: Error | null;
	currentWeather: CurrentWeather | undefined;
	weatherForecast: WeatherForecast | undefined;
	setSearchQuery: React.Dispatch<React.SetStateAction<string>>;
};

export const WeatherView = (props: WeatherViewProps) => {
	const {
		geoError,
		apiError,
		currentWeather,
		weatherForecast,
		setSearchQuery,
	} = props;

	return (
		<div className="container mx-auto w-[70%] p-4">
			<Header setSearchQuery={setSearchQuery} />
			<div>
				{geoError && (
					<Toast message="Browser location is blocked" type="warning" />
				)}
				{apiError && <Toast message={apiError.message} type="error" />}

				{currentWeather && (
					<div className="bg-white shadow-md p-6 rounded-lg mb-4 w-full dark:bg-gray-800 dark:text-white">
						<WeatherCard currentWeather={currentWeather} />
					</div>
				)}

				{weatherForecast && (
					<div className="bg-white shadow-md p-6 rounded-lg mb-4 w-full dark:bg-gray-800 dark:text-white">
						<WeatherForecast forecast={weatherForecast} />
					</div>
				)}
			</div>
		</div>
	);
};
