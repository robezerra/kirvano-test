import { SetStateAction } from "react";
import { HeaderView } from "./header.view";
import { useHeaderModel } from "./header.model";

interface HeaderProps {
	setSearchQuery: React.Dispatch<SetStateAction<string>>;
}

export const Header = ({ setSearchQuery }: HeaderProps) => {
	const props = useHeaderModel();

	return <HeaderView setSearchQuery={setSearchQuery} {...props} />;
};
