import Weather from "@/pages/Weather";
import { MetricsProvider } from "./hooks/useMetrics";

function App() {
	return (
		<MetricsProvider>
			<Weather />
		</MetricsProvider>
	);
}

export default App;
