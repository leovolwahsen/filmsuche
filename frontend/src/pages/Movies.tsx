import { useEffect, useState } from "react";
import { useAxios } from "../data/useAxios";
import { Card, Flex, Image } from "antd";
import { Typography } from "antd";

const { Title, Text } = Typography;
export const Movies: React.FC = () => {
    const axiosInstance = useAxios();
    const [movies, setMovies] = useState<{ name: string; date: string; time: string; location: string; dressCode: string; additionalDetails: string; shuttleDetails: string; bild: string; bewertung: string; }[]>([]);

    useEffect(() => {
        axiosInstance.get("/movies").then((res) => setMovies(res.data))
            .catch((error) => {
                console.error("Error fetching movies: ", error);
            });
    }, [axiosInstance]);


    return (
        <Flex vertical align="center" justify="center" style={{ width: "100%" }}>
            <Title level={2}>Kinofilme</Title>
            <Flex vertical wrap="wrap" justify="center" gap={50}>
                {movies && movies.map((elem, index) => (
                    <Card title={elem.name} key={index} style={{ width: 300 }}>
                        <Flex vertical align="center">
                            <Image preview={false} src={elem.bild} style={{ maxHeight: "520px", width: "85vw" }} />
                            <Text>{elem.bewertung}</Text>
                        </Flex>
                    </Card>
                ))}
            </Flex>
        </Flex>
    );
}