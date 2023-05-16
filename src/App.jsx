import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
// import NewCourse from "./pages/Courses";
import { Outlet } from "react-router-dom";
import HeaderTop from "./components/Header";
import Footer from "./components/Footer";
// import HomePage from "./components/Home";
import NewCourse from "./components/Home";
import NavBar from "./components/NavBar";
import AboutUs from "./pages/AboutUs";
import Stem from "./pages/STEM";


const Layout = () => {
  return (
    <div className="app-layout">
      <HeaderTop />
        <NavBar/>
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
        { index: true, element: <NewCourse /> },
        {
          index: true,
          element: <NewCourse />,
        },
        {
          path: "about-us",
          element: <AboutUs />,
        },
        {
          path: "stem",
          element: <Stem />,
        },
      ],
    },
  ]);

  return (
    <RouterProvider router={router} />
  )
}

export default App
