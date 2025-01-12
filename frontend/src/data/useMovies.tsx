import { useEffect, useState } from "react";
import { IMovie } from "../types/movies";
import { useAxios } from "./useAxios";

export const useMovies = () => {
    const axiosInstance = useAxios();
    const [movies, setMovies] = useState<IMovie[]>([]);
    const [isLoading, setIsLoading] = useState<boolean>(false)
    console.log(`Movies data: ${movies}`);

    useEffect(() => {
        setIsLoading(true);
        axiosInstance.get("/movies").then((res) => {
            setMovies(res.data);
            setIsLoading(false);
        }).catch((error) => {
            console.error("Error fetching movies: ", error);
        }).finally(() => {
            setIsLoading(false)
        });
    }, [axiosInstance]);

    return { movies, isLoading };

};