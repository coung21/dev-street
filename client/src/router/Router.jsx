import { createBrowserRouter } from 'react-router-dom';
import { useSelector } from 'react-redux';
import RootLayout from '../pages/RootLayout/RootLayout';
import SignUp from '../pages/Enter/SignUp';
import Home from '../pages/Home/Home';
import SignIn from '../pages/Enter/SignIn';
import SignOut from '../pages/SignOut/SignOut';
import UserProfile from '../pages/UserProfile/UserProfile';
import GoogleLoading from '../components/Loading/GoogleLoading';
import CreatePost from '../pages/CreatePost/CreatePost';
import Tags from '../pages/Tags/Tags';
import Post from '../pages/Post/Post';
import TagPosts from '../pages/TagPosts/TagPosts';
import EditPost from '../pages/EditPost/EditPost';
import Notifications from '../pages/Notifications/Notifications';
import ReadingList from '../pages/ReadingList/ReadingList';
import EditProfile from '../pages/EditProfile/EditProfile';
import SearchPage from '../pages/Search/SearchPage';

function Router() {
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
        element: <UserProfile />,
      },
      {
        path: '/user/:userid/settings',
        element: <EditProfile />
      },
      {
        path: '/:userid/:slug',
        element: <Post />,
      },
      {
        path: '/:userid/:slug/edit',
        element: <EditPost />
      },
      {
        path: '/new',
        element: <CreatePost />,
      },
      {
        path: '/tags',
        element: <Tags />,
      },
      {
        path: '/tags/:tagname',
        element: <TagPosts />,
      },
      {
        path: '/notifications',
        element: <Notifications />
      },
      {
        path: '/readinglist',
        element: <ReadingList />
      },
      {
        path: '/post/search',
        element: <SearchPage />
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
        path: '/:userid/:slug',
        element: <Post />,
      },

      {
        path: '/tags',
        element: <Tags />,
      },
      {
        path: '/tags',
        element: <Tags />,
      },
      {
        path: '/tags/:tagname',
        element: <TagPosts />,
      },
      {
        path: '/post/search',
        element: <SearchPage />,
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
    {
      path: '/*',
      element: <h1>404</h1>
    }
  ]);
  return { router };
}

export default Router;
