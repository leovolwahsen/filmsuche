import { Flex, Typography } from "antd";
import { CardComponent } from "../components/CardComponent";
import { useFavorites } from "../data/useFavorites";

const { Title } = Typography;

export const Favorites: React.FC = () => {
    const { favorites, isLoading } = useFavorites();

    if (isLoading) return <div>Loading...</div>;

    return (
        <Flex vertical align="center" justify="center" style={{ width: "100%", padding: "2rem" }} gap={2}>
            <Title level={2}>Favoriten</Title>
            <Flex wrap="wrap" justify="center" gap={50}>
                {favorites.map((favorite) => (
                    <CardComponent
                        key={favorite._id}
                        data={favorite}
                        linkPath={(favorite) => `/favorites/${favorite.name}`}
                        title={(favorite) => favorite.name}
                        image={(favorite) => favorite.bild}
                    />
                ))}
            </Flex>
        </Flex>
    );
};