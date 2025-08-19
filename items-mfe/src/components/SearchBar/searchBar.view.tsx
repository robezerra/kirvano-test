import { IoIosSearch } from "react-icons/io";
import { Input } from "../Input";

type SearchBarViewProps = {
	handleSearch: (e: React.FormEvent<HTMLFormElement>) => void;
	city: string;
	setCity: (city: string) => void;
	inputProps?: React.InputHTMLAttributes<HTMLInputElement>;
};

export const SearchBarView = (props: SearchBarViewProps) => {
	const { handleSearch, city, setCity, inputProps } = props;

	return (
		<form onSubmit={handleSearch} className="flex items-center relative w-1/3">
			<Input
				placeholder="Search city..."
				value={city}
				onChange={(e) => setCity(e.target.value)}
				{...inputProps}
			/>
			<button
				type="submit"
				className="text-xl absolute right-3 light:text-gray-500"
			>
				<IoIosSearch />
			</button>
		</form>
	);
};
