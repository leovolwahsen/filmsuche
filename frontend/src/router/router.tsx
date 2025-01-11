import { createBrowserRouter } from "react-router-dom";
import { PrimaryLayout } from "../layout/PrimaryLayout";
import { Home } from "../pages/Home";
import { Movies } from "../pages/Movies";
import { ContactUs } from "../pages/ContactUs";
import { Favorites } from "../pages/Favorites";
import { MovieComponent } from "../components/MovieComponent";

const router = createBrowserRouter([
    {
        path: "/",
        element: <PrimaryLayout />,
        children: [
            {
                path: "/",
                element: <Home />,
            },
            {
                path: "/movies",
                element: <Movies />,
            },
            {
                path: "/movies/:name",
                element: <MovieComponent />,
            },
            {
                path: "/favorites",
                element: <Favorites />,
            },
            {
                path: "/contact-us",
                element: <ContactUs />,
            }
        ],
    },
]);

export default router;