import { describe, it, expect } from "vitest";
import { renderHook, waitFor } from "@testing-library/react";

import { useFetchWeather } from "./useFetchWeather";
import { mockWeatherService } from "./mocks";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

const queryClient = new QueryClient();

const queryClientProviderWrapper = ({
	children,
}: {
	children: React.ReactNode;
}) => {
	return (
		<QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
	);
};

describe("useFetchWeather", () => {
	it("should fetch weather by city", async () => {
		const { result } = renderHook(
			() => useFetchWeather("London", mockWeatherService),
			{ wrapper: queryClientProviderWrapper }
		);

		await waitFor(() => expect(result.current.data).toBeDefined());

		expect(mockWeatherService.findWeatherByCity).toHaveBeenCalledWith(
			"London",
			"metric"
		);
		expect(result.current.data?.currentWeather.main.temp).toBe(26.22);
	});

	it("should fetch weather by coordinates", async () => {
		const { result } = renderHook(
			() =>
				useFetchWeather("", mockWeatherService, {
					latitude: 51.5074,
					longitude: -0.1278,
				}),
			{ wrapper: queryClientProviderWrapper }
		);

		await waitFor(() => expect(result.current.data).toBeDefined());

		expect(mockWeatherService.findWeather).toHaveBeenCalledWith(
			{ latitude: 51.5074, longitude: -0.1278 },
			"metric"
		);
		expect(result.current.data?.currentWeather.main.temp).toBe(26.22);
	});

	it("should not fetch if no location is provided", async () => {
		const { result } = renderHook(
			() => useFetchWeather("", mockWeatherService),
			{ wrapper: queryClientProviderWrapper }
		);

		expect(result.current.data).toBeUndefined();
	});
});
