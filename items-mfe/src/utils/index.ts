export const getFormatedDate = () => {
	const currentDate = new Date();

	const options = {
		month: "short" as "short",
		day: "numeric" as "numeric",
		hour: "2-digit" as "2-digit",
		minute: "2-digit" as "2-digit",
	};

	return currentDate.toLocaleString("en-US", options);
};

export const getShortDate = (timestamp: number) => {
	const date = new Date(timestamp * 1000);

	const options: Intl.DateTimeFormatOptions = {
		month: "short",
		day: "numeric",
		hour: "2-digit",
	};

	return date.toLocaleString("en-US", options);
};
