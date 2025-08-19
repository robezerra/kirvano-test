import LoginForm from "../../components/LoginForm";
import RegisterForm from "../../components/RegisterForm";

interface AuthViewProps {
	selectedTab: "login" | "register";
	handleChangeTab: (tab: "login" | "register") => void;
}

export default function AuthView(props: AuthViewProps) {
	const { selectedTab, handleChangeTab } = props;

	return (
		<div className="flex flex-col items-center justify-center h-full w-full">
			<div className="bg-gray-800 text-white px-20 py-14 rounded-lg shadow-md w-full min-w-full">
				{selectedTab === "login" ? <LoginForm /> : <RegisterForm />}
				<span
					className="flex justify-end mt-2 text-sm text-blue-500 hover:cursor-pointer hover:underline"
					onClick={() =>
						handleChangeTab(selectedTab === "login" ? "register" : "login")
					}
				>
					{selectedTab === "login" ? "Register" : "Login"}
				</span>
			</div>
		</div>
	);
}
