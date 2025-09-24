import * as React from "react";
import { useForm, type SubmitHandler } from "react-hook-form";

interface LoginFormInputs {
  username: string;
  password: string;
}

// Hardcoded credentials
const credentials = { username: "admin", password: "admin123" };

const Login: React.FC = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormInputs>();
  const [error, setError] = React.useState<string>("");
  const [isLoading, setIsLoading] = React.useState<boolean>(false);

  const onSubmit: SubmitHandler<LoginFormInputs> = async (data) => {
    setIsLoading(true);
    await new Promise((resolve) => setTimeout(resolve, 1000)); // 1-second delay
    if (
      data.username === credentials.username &&
      data.password === credentials.password
    ) {
      // ✅ Save login state + username
      localStorage.setItem("isAuthenticated", "true");
      localStorage.setItem("username", data.username);
      window.location.reload();
    } else {
      setError("Invalid credentials");
      setIsLoading(false);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-200">
      <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md border border-gray-300 pb-16">
        <h2 className="text-2xl font-bold mb-6 text-center text-purple-900">
          Employee Management Portal
        </h2>
        <h3 className="text-2xl font-bold mb-6 text-center text-purple-950">
          Login
        </h3>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Username
            </label>
            <input
              type="text"
              placeholder="Enter your username"
              {...register("username", { required: "Username is required" })}
              className="w-full p-2 border rounded focus:outline-none focus:ring-1 focus:ring-purple-800"
              disabled={isLoading}
            />
            {errors.username && (
              <p className="text-red-500 text-sm mt-1">
                {errors.username.message}
              </p>
            )}
          </div>
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Password
            </label>
            <input
              type="password"
              placeholder="Enter your password"
              {...register("password", { required: "Password is required" })}
              className="w-full p-2 border rounded focus:outline-none focus:ring-1 focus:ring-purple-800"
              disabled={isLoading}
            />
            {errors.password && (
              <p className="text-red-500 text-sm mt-1">
                {errors.password.message}
              </p>
            )}
          </div>
          {error && <p className="text-red-500 mb-4">{error}</p>}
          <button
            type="submit"
            className="w-full bg-green-700 text-white p-2 rounded cursor-pointer hover:bg-green-800 disabled:bg-green-300"
            disabled={isLoading}
          >
           {isLoading ? "Loading..." : "Login"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default Login;

