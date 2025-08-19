import {
	createContext,
	useContext,
	useEffect,
	useState,
	ReactNode,
} from "react";

import { Metric } from "@/types/metrics";

interface MetricsProviderProps {
	children: ReactNode;
}

export const METRIC = "metric";

const metric: Metric = {
	units: METRIC,
	temperature: "C",
	wind: "m/s",
};

const imperial: Metric = {
	units: "imperial",
	temperature: "F",
	wind: "m/h",
};

const MetricsContext = createContext({
	metrics: metric,
	toggleMetric: () => {},
});

export const MetricsProvider = ({ children }: MetricsProviderProps) => {
	const [metrics, setMetrics] = useState<Metric>(metric);

	useEffect(() => {
		const storedMetric = localStorage.getItem(METRIC);

		if (storedMetric === "imperial") {
			setMetrics(imperial);
		}
	}, []);

	const toggleMetric = () => {
		setMetrics((currentMetric) => {
			let newMetric: Metric;

			if (currentMetric.units === METRIC) {
				newMetric = { ...imperial };
			} else {
				newMetric = { ...metric };
			}

			localStorage.setItem(METRIC, newMetric.units);

			return newMetric;
		});
	};

	return (
		<MetricsContext.Provider value={{ metrics, toggleMetric }}>
			{children}
		</MetricsContext.Provider>
	);
};

export const useMetrics = () => useContext(MetricsContext);
