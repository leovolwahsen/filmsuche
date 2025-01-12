import { createBrowserRouter } from "react-router-dom";
import { PrimaryLayout } from "../layout/PrimaryLayout";
import { Home } from "../pages/Home";
import { Movies } from "../pages/Movies";
import { ContactUs } from "../pages/ContactUs";
import { Favorites } from "../pages/Favorites";
import { MovieComponent } from "../components/MovieComponent";
import { IMovie } from "../types/movies";
import { IFavorites } from "../types/favorites";

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
                element: (
                    <MovieComponent<IMovie>
                        fetchEndpoint="/movies"
                        entityName="Film"
                    />
                ),
            },
            {
                path: "/favorites",
                element: <Favorites />,
            },
            {
                path: "/favorites/:name",
                element: (
                    <MovieComponent<IFavorites>
                        fetchEndpoint="/favorites"
                        entityName="Favorit"
                    />
                ),
            },
            {
                path: "/contact-us",
                element: <ContactUs />,
            }
        ],
    },
]);

export default router;