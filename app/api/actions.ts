import { userLogIn } from ".";
import { LogInData } from "../login/page";

export const authenticate = async (formData: LogInData) => {
  const result = await userLogIn(formData);
  return result;
};
