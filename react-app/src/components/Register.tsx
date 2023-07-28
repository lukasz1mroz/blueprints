import * as React from "react";
import { useNavigate } from "react-router-dom";

export function Register() {
  let navigate = useNavigate();
  let [header, setHeader] = React.useState<any>(
    "Please provide your credentials to register"
  );

  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();

    let formData = new FormData(event.currentTarget);
    let username = formData.get("username") as string;
    let password = formData.get("password") as string;
    let passwordRepeat = formData.get("passwordRepeat") as string;

    if (password === passwordRepeat && username) {
      console.log("register-success");
      navigate("/login", {
        state: { header: "Registered successfully, you can now log in." },
      });
    } else {
      setHeader("Passwords don't match, please try again.");
    }
  }

  return (
    <div>
      <p>{header}</p>

      <form onSubmit={handleSubmit}>
        <label>
          Username: <input name="username" type="text" />
        </label>{" "}
        <label>
          Password: <input name="password" type="text" />
        </label>{" "}
        <label>
          Repeat password: <input name="passwordRepeat" type="text" />
        </label>{" "}
        <button type="submit">Register</button>
      </form>
    </div>
  );
}

export default Register;
