import AuthView from "./auth.view";
import "../../index.css";
import { useAuthModel } from "./auth.model";

export default function Auth() {
	const props = useAuthModel();

	return <AuthView {...props} />;
}
