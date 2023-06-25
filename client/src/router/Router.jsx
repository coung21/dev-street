import { createBrowserRouter } from 'react-router-dom';
import {useSelector} from 'react-redux'
import RootLayout from '../pages/RootLayout/RootLayout';
import SignUp from '../pages/Enter/SignUp';
import Home from '../pages/Home/Home';
import SignIn from '../pages/Enter/SignIn';
import SignOut from '../pages/SignOut/SignOut';
import UserProfile from '../pages/UserProfile/UserProfile';
import GoogleLoading from '../components/Loading/GoogleLoading';
import CreatePost from '../pages/CreatePost/CreatePost'
import Tags from '../pages/Tags/Tags';

function Router(){
  const { current_user } = useSelector((state) => state.auth);
  let routes;
  if (current_user) {
    routes = [
      {
        path: '/',
        element: <Home />,
      },
      {
        path: '/signup',
        element: <SignUp />,
      },
      {
        path: '/signin',
        element: <SignIn />,
      },
      {
        path: '/signout',
        element: <SignOut />,
      },
      {
        path: '/:userid',
        element: <UserProfile />
      },
      {
        path: '/new',
        element: <CreatePost />
      },
      {
        path: '/tags',
        element: <Tags />
      }
    ];
  } else {
    routes = [
      {
        path: '/',
        element: <Home />,
      },
      {
        path: '/signup',
        element: <SignUp />,
      },
      {
        path: '/signin',
        element: <SignIn />,
      },
      {
        path: '/signout',
        element: <SignOut />,
      },
      {
        path: '/:userid',
        element: <UserProfile />,
      },
      {
        path: '/tags',
        element: <Tags />,
      },
    ];
  }
const router = createBrowserRouter([
  {
    element: <RootLayout />,
    children: routes,
  },
  {
    path: '/oauth/google',
    element: <GoogleLoading />,
  },
]);
  return {router}
}

export default Router;
