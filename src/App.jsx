import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import NewCourse from "./pages/Courses";
import { Outlet } from "react-router-dom";
import Header from "./components/Header";
import Footer from "./components/Footer";
import HomePage from "./components/Home";


const Layout = () => {
  return (
    <div className="app-layout">
      <Header />
      <Outlet />
      <Footer />
    </div>
  )
}

function App() {
  const router = createBrowserRouter([
    {
      path: "/",
      element: <Layout />,
      errorElement: <h1>404 Page not found</h1>,
      children: [
        { index: true, element: <HomePage /> },
        {
          path: "new-course",
          element: <NewCourse />,
        },
      ],
    },
  ]);

  return (
    <RouterProvider router={router} />
  )
}

export default App
