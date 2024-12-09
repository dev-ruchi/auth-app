import { useNavigate } from "react-router-dom";

function App() {
  const navigate = useNavigate();

  return (
    <>
      <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
        <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-4 text-center">
          Welcome to My AuthApp
        </h1>
        <p className="text-base sm:text-lg text-gray-700 mb-6 text-center">
          Secure your account with our reliable authentication platform.
        </p>
        <div className="flex space-x-4">
          <button
            onClick={() => navigate("/signup")}
            className="px-6 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
          >
            Sign Up
          </button>
          <button
            onClick={() => navigate("/login")}
            className="px-6 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
          >
            Login
          </button>
        </div>
      </div>
    </>
  );
}

export default App;
