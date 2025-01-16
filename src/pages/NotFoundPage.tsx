import { useNavigate } from "react-router";
import { Home, ArrowLeft } from "lucide-react";

const NotFoundPage = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 fixed h-screen w-screen">
      <div className="text-center space-y-8 p-8">
        <div className="space-y-4">
          <h1 className="text-9xl font-bold text-gray-900">404</h1>
          <h2 className="text-3xl font-semibold text-gray-700">
            Page not found
          </h2>
        </div>

        <div className="flex gap-4 justify-center">
          <button
            onClick={() => navigate(-1)}
            className="inline-flex items-center px-4 py-2 gap-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
          >
            <ArrowLeft className="w-4 h-4" />
            Go back
          </button>

          <button
            onClick={() => navigate("/")}
            className="inline-flex items-center px-4 py-2 gap-2 text-sm font-medium text-white bg-blue-600 border border-transparent rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
          >
            <Home className="w-4 h-4" />
            Go home
          </button>
        </div>
      </div>
    </div>
  );
};

export default NotFoundPage;
