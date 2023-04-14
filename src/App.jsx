import { Route, RouterProvider, createBrowserRouter, createRoutesFromElements } from 'react-router-dom'

import Layout from './components/Layout/Layout'
import Posts from './pages/Posts'
import Post from './pages/Post'
import EditPost from './pages/EditArticle'
import CreateNewArticle from './pages/NewArticle'
import SignIn from './pages/SignIn'
import SignUp from './pages/SignUp'
import Profile from './pages/Profile'

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<Layout />}>
      <Route index element={<Posts />} />
      <Route path="/articles" element={<Posts />} />
      <Route path="articles/:slug" element={<Post />} />
      <Route path="articles/:slug/edit" element={<EditPost />} />
      <Route path="new-article" element={<CreateNewArticle />} />
      <Route path="sign-up" element={<SignUp />} />
      <Route path="sign-in" element={<SignIn />} />
      <Route path="profile" element={<Profile />} />
      <Route path="*" element={<h1>Page not found</h1>} />
    </Route>
  )
)

export default function App() {
  return <RouterProvider router={router} />
}
