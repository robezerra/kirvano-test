import LoginFormView from "./loginForm.view";
import { useLoginFormModel } from "./loginForm.model";

export default function LoginForm() {
	const props = useLoginFormModel();

	return <LoginFormView {...props} />;
}
