import { Link } from 'react-router-dom';

const Unauthorized = () => {
  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-100 p-4">
      <div className="max-w-md rounded-xl bg-white p-8 text-center shadow-lg">
        <h1 className="mb-4 text-4xl font-bold text-red-600">403</h1>
        <h2 className="mb-4 text-2xl font-semibold text-gray-800">Access Denied</h2>
        <p className="mb-6 text-gray-600">
          You do not have permission to access this page.
        </p>
        <Link
          to="/dashboard"
          className="inline-block rounded-lg bg-blue-600 px-4 py-2 text-sm font-medium text-white hover:bg-blue-700"
        >
          Back to Dashboard
        </Link>
      </div>
    </div>
  );
};

export default Unauthorized;
