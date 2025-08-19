import { RegisterFormView } from "./registerForm.view";
import { useRegisterFormModel } from "./registerForm.model";

export default function RegisterForm() {
	const props = useRegisterFormModel();

	return <RegisterFormView {...props} />;
}
