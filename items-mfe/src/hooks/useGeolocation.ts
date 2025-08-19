import { useEffect, useState } from "react";

import { UserGeolocation } from "@/types/userGeolocation";

export const useGeolocation = () => {
	const [isGeolocationLoading, setIsGeolocationLoading] = useState(true);
	const [error, setError] = useState<GeolocationPositionError | null>(null);
	const [data, setData] = useState<UserGeolocation>();

	useEffect(() => {
		const onSucces = (e: GeolocationPosition) => {
			setIsGeolocationLoading(false);
			setError(null);
			setData(e.coords);
		};

		const onError = (e: GeolocationPositionError) => {
			setError(e);
			setIsGeolocationLoading(false);
		};

		navigator.geolocation.getCurrentPosition(onSucces, onError);
	}, []);

	return { isGeolocationLoading, error, data };
};
