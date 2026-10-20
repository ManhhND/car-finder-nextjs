import { DEMO_ACCOUNT } from "@/lib/demoAccount";
import LoginForm from "./LoginForm";

const Login = () => {
  return <LoginForm demoAccount={DEMO_ACCOUNT} />;
};

export default Login;
