import { LoadingSpinner } from "@/components/LoadingSpinner";
import { useWeatherModel } from "./weather.model";
import { WeatherView } from "./weather.view";
import "../../index.css";

const Weather = () => {
	const props = useWeatherModel();

	if (props.isGeolocationLoading || props.isApiLoading) {
		return <LoadingSpinner />;
	}

	return <WeatherView {...props} />;
};

export default Weather;
