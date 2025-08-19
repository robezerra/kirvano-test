import { useSearchBarModel } from "./searchBar.model";
import { SearchBarView } from "./searchBar.view";

type SearchBarProps = {
	setSearchQuery: (query: string) => void;
};

export const SearchBar = ({ setSearchQuery }: SearchBarProps) => {
	const props = useSearchBarModel({ setSearchQuery });

	return <SearchBarView {...props} />;
};
