import { Card, Col, Flex, Image } from "antd";
import { Link } from "react-router-dom";
import { IMovie } from "../types/movies";

interface CardComponentProps {
    movie: IMovie;
}

export const CardComponent: React.FC<CardComponentProps> = ({ movie }) => {
    return (
        <Col>
            <Link to={`/movies/${movie.name}`}>
                <Card title={<div style={{ textAlign: "center" }}>{movie.name}</div>} hoverable>
                    <Flex vertical justify="center">
                        <Image
                            src={movie.bild}
                            alt="Kinofilm Poster"
                            preview={false}
                            style={{ objectFit: "cover", height: 300 }}
                        />
                    </Flex>
                </Card>
            </Link>
        </Col>
    );
};