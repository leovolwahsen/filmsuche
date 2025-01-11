import { useEffect, useState } from "react";
import { useAxios } from "../data/useAxios";
import { Flex, Typography } from "antd";
import { CardComponent } from "../components/CardComponent";
import { IMovie } from "../types/movies";

const { Title } = Typography;

export const Movies: React.FC = () => {
    const axiosInstance = useAxios();
    const [movies, setMovies] = useState<IMovie[]>([]);

    useEffect(() => {
        axiosInstance.get("/movies").then((res) => setMovies(res.data))
            .catch((error) => {
                console.error("Error fetching movies: ", error);
            });
    }, [axiosInstance]);


    return (
        <Flex vertical align="center" justify="center" style={{ width: "100%", padding: "2rem"}} gap={2}>
            <Title level={2} style={{ }}>Kinofilme</Title>
            <Flex wrap="wrap" justify="center" gap={50}>
                {movies && movies.map((elem, index) => (
                    <CardComponent key={index} movie={elem} />
                ))}
            </Flex>
        </Flex>
    );
}