import { createBrowserRouter, Navigate, RouterProvider } from 'react-router-dom'
import Login from './auth/Login'
import SignUp from './auth/SignUp'
import ForgetPassword from './auth/ForgetPassword'
import ResetPassword from './auth/ResetPassword'
import VerifyEmail from './auth/VerifyEmail'
import HeroSection from './components/HeroSection'
import MainLayout from './layout/MainLayout'
import Profile from './components/Profile'
import SearchPage from './components/SearchPage'
import RestorentDetail from './components/RestorentDetail'
import Cart from './components/Cart'
import Restourent from './admin/Restourent'
import AdminMenue from './admin/AdminMenue'
import Orders from './admin/Orders'
import Success from './components/Success'
import { useUserStore } from './store/useUserStore'
import { useEffect } from 'react'
import Loading from './components/Loading'


const ProtectedRoutes = ({ children }: { children: React.ReactNode }) => {
  const { isAuthenticated, user } = useUserStore();
  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }
// alert(user?.isVerified)  
if (!user?.isVerified) {
    return <Navigate to="/verify-email" replace />;
  }
  return children;
};

const AuthenticatedUser = ({ children }: { children: React.ReactNode }) => {
  const { isAuthenticated, user } = useUserStore();
  if (isAuthenticated && user?.isVerified) {
    return <Navigate to="/" replace />
  }
  return children;
};

const AdminRoute = ({ children }: { children: React.ReactNode }) => {
  const { user, isAuthenticated } = useUserStore();
  if (!isAuthenticated) {
    return <Navigate to="/login" replace />
  }
  if (!user?.admin) {
    return <Navigate to="/" replace />
  }

  return children;
}

const appRouter = createBrowserRouter([
  {
    path: "/",
    element: <ProtectedRoutes> <MainLayout /></ProtectedRoutes>,
    children: [
      {
        path: '/',
        element: <HeroSection />
      },
      {
        path: '/profile',
        element: <Profile />
      }, {
        path: '/search/:text',
        element: <SearchPage />
      },
      {
        path: '/restaurant/:id',
        element: <RestorentDetail />
      },
      {
        path: '/cart',
        element: <Cart />
      },
      {
        path: '/order/status',
        element: <Success />
      },
      //  admin servises
      {
        path: '/admin/restaurant',
        element: <AdminRoute> <Restourent /></AdminRoute>
      },
      {
        path: '/admin/menu',
        element: <AdminRoute> <AdminMenue /></AdminRoute>
      },
      {
        path: '/admin/orders',
        element: <AdminRoute> <Orders /></AdminRoute>
      },
    ]
  },
  {
    path: '/login',
    element: <AuthenticatedUser> <Login /></AuthenticatedUser>
  },
  {
    path: '/signup',
    element: <AuthenticatedUser> <SignUp /></AuthenticatedUser>
  },
  {
    path: '/forget-password',
    element: <AuthenticatedUser><ForgetPassword /></AuthenticatedUser>
  },
  {
    path: '/reset-passwrod',
    element: <ResetPassword />
  },
  {
    path: '/verify-email',
    element: <VerifyEmail />
  },
])
function App() {

  const { checkAuthentation, isCheckingAuth } = useUserStore()
  useEffect(() => {
    checkAuthentation()
  }, [checkAuthentation]);
  if (isCheckingAuth) return <Loading />
  return (
    <>
      <RouterProvider router={appRouter} >

      </RouterProvider>
    </>
  )
}

export default App
