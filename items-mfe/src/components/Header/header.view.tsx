import { Metric } from "@/types/metrics";
import { SearchBar } from "../SearchBar";
import { METRIC } from "@/hooks/useMetrics";
import { RiCelsiusFill, RiFahrenheitFill } from "react-icons/ri";
import { MdDarkMode, MdLightMode } from "react-icons/md";
import { getFormatedDate } from "@/utils";

type HeaderViewProps = {
	setSearchQuery: (query: string) => void;
	metrics: Metric;
	toggleMetric: () => void;
	darkTheme: boolean;
	setDarkTheme: (theme: boolean) => void;
};

export const HeaderView = (props: HeaderViewProps) => {
	const { setSearchQuery, metrics, toggleMetric, darkTheme, setDarkTheme } =
		props;

	return (
		<header className="flex justify-between items-center bg-white shadow-md p-4 rounded-lg mb-4 w-full dark:bg-gray-800 dark:text-white">
			<h3 className="text-sm">{getFormatedDate()}</h3>
			<SearchBar setSearchQuery={setSearchQuery} />
			<div className="text-3xl">
				<button onClick={toggleMetric} title="Unit">
					{metrics.units === METRIC ? <RiFahrenheitFill /> : <RiCelsiusFill />}
				</button>
				<button
					onClick={() => setDarkTheme(!darkTheme)}
					className="ml-2"
					title="Mode"
				>
					{darkTheme ? <MdLightMode /> : <MdDarkMode />}
				</button>
			</div>
		</header>
	);
};
