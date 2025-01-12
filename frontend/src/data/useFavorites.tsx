import { useEffect, useState } from "react";
import { IFavorites } from "../types/favorites";
import { useAxios } from "./useAxios";

export const useFavorites = () => {
    const axiosInstance = useAxios();
    const [favorites, setFavorites] = useState<IFavorites[]>([]);
    const [isLoading, setIsLoading] = useState<boolean>(false);
    console.log(`Favorites data: ${favorites}`);

    useEffect(() => {
        setIsLoading(true);
        axiosInstance.get("/favorites").then((res) => {
            setFavorites(res.data);
            setIsLoading(false);
        }).catch((error) => {
            console.error("Error fetching favorites: ", error);
        }).finally(() => {
            setIsLoading(false)
        });
    }, [axiosInstance]);

    return { favorites, isLoading };
};