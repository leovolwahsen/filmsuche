import { Flex, Typography } from "antd";
import { CardComponent } from "../components/CardComponent";
import { useMovies } from "../data/useMovies";

const { Title, Text } = Typography;

export const Movies: React.FC = () => {
    const { movies, isLoading } = useMovies();

    if (isLoading) {
        return <Text>Loading...</Text>;
    }

    return (
        <Flex vertical align="center" justify="center" style={{ width: "100%", padding: "2rem"}} gap={2}>
            <Title level={2}>Kinofilme</Title>
            <Flex wrap="wrap" justify="center" gap={50}>
                {movies.map((movie) => (
                    <CardComponent 
                        key={movie._id} 
                        data={movie} 
                        linkPath={(movie) => `/movies/${movie.name}`}
                        title={(movie) => movie.name}
                        image={(movie) => movie.bild} 
                    />
                ))}
            </Flex>
        </Flex>
    );
};