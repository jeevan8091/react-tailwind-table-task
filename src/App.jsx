import { Toaster } from 'react-hot-toast';
import AppRoutes from './routes/AppRoutes';

function App() {
  return (
    <>
      <AppRoutes />
      <Toaster
        position="top-center"
        toastOptions={{
          duration: 3000,
          style: {
            borderRadius: '1rem',
            background: '#f8fafc',
            color: '#0f172a',
            boxShadow: '0 20px 45px rgba(15, 23, 42, 0.12)',
          },
          success: {
            duration: 3000,
            style: {
              background: '#ecfdf5',
              color: '#064e3b',
              border: '1px solid #34d399',
            },
          },
          error: {
            duration: 4000,
            style: {
              background: '#fef2f2',
              color: '#991b1b',
              border: '1px solid #f87171',
            },
          },
        }}
      />
    </>
  );
}

export default App;