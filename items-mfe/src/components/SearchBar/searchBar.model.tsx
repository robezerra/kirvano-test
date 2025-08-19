import { useState } from "react";

type SearchBarModelProps = {
	setSearchQuery: (city: string) => void;
};

export const useSearchBarModel = ({ setSearchQuery }: SearchBarModelProps) => {
	const [city, setCity] = useState("");

	const handleSearch = (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();

		if (city.trim()) {
			setSearchQuery(city.trim());
		}
	};

	return {
		city,
		setCity,
		handleSearch,
	};
};
