import * as React from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { useAuth } from "./Auth";

export function Login() {
  const [errHeader, setErrHeader] = React.useState<any>();
  let navigate = useNavigate();
  let location = useLocation();
  let auth = useAuth();

  let from = location.state?.from?.pathname || "/";
  const header =
    location.state?.header || `You must log in to view the page at ${from}`;

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();

    let formData = new FormData(event.currentTarget);
    let username = formData.get("username") as string;
    let password = formData.get("password") as string;

    const resp = await auth.signin(
      { username: username, password: password },
      () => {
        navigate(from, { replace: true });
      }
    );
    if (resp === undefined) {
      setErrHeader("Login error, please try again.");
    }
  }

  return (
    <div>
      <p>{errHeader || header}</p>

      <form onSubmit={handleSubmit}>
        <label>
          Username: <input name="username" type="text" />
        </label>{" "}
        <label>
          Password: <input name="password" type="text" />
        </label>{" "}
        <button type="submit">Login</button>
      </form>
    </div>
  );
}

export default Login;
