import { useState } from "react";

export const useAuthModel = () => {
	const [selectedTab, setSelectedTab] = useState<"login" | "register">("login");

	const handleChangeTab = (tab: "login" | "register") => {
		setSelectedTab(tab);
	};

	return {
		selectedTab,
		handleChangeTab,
	};
};
