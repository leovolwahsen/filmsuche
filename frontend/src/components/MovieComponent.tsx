import { useEffect, useState } from "react";
import { useAxios } from "../data/useAxios";
import { useParams } from "react-router-dom";
import { Col, Divider, Row, Typography, Image, Rate } from "antd";
import { IMovie } from "../types/movies";

const { Title, Text, Paragraph } = Typography;

export const MovieComponent: React.FC = () => {
    const axiosInstance = useAxios();
    const [movies, setMovies] = useState<IMovie[]>([]);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        axiosInstance.get("/movies")
            .then((res) => {
                setMovies(res.data);
                setIsLoading(false);
            })
            .catch((error) => {
                console.error("Error fetching movies: ", error);
                setIsLoading(false);
            });
    }, [axiosInstance]);

    const { name } = useParams();

    if (isLoading) {
        return <Text>Loading...</Text>;
    }

    const selectedMovie = movies.find((movie) => movie.name === name);

    if (!selectedMovie) {
        return <Text style={{ color: "white", textAlign: "center" }}>Diesen Film gibt es leider nicht mehr!</Text>;
    }

    return (
        <Row
            style={{
                width: "100%",
                minHeight: "90vh",
                color: "white",
                overflowY: "auto",
                padding: "2rem",
            }}
        >
            <Col span={24} style={{ textAlign: "center", padding: "2rem" }}>
                <article>
                    <Title level={1} style={{ color: "white" }}>{name}</Title>
                    <div style={{ margin: "1rem 0" }}>
                        <Rate
                            allowHalf
                            disabled
                            value={parseFloat(selectedMovie.bewertung)}
                            style={{ fontSize: 40 }}
                        />
                    </div>
                    <iframe
                        width="70%"
                        height="80%"
                        src={selectedMovie.trailer}
                        title="YouTube video player"
                        style={{ borderBottom: "0.05rem solid lightgray", marginBottom: "1rem" }}
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                        allowFullScreen
                    />
                    <Paragraph style={{ color: "lightgray", fontSize: "smaller", textAlign: "center" }}>
                        © Universal Studios
                    </Paragraph>
                </article>
                <Divider />
                <Row justify="space-around" style={{ marginTop: "2rem" }}>
                    <Col xs={24} md={8} style={{ textAlign: "center" }}>
                        <Image
                            src={selectedMovie.bild}
                            alt="Kinofilm"
                            preview={false}
                            style={{ maxWidth: "100%", height: "auto", objectFit: "cover" }}
                        />
                    </Col>
                    <Col xs={24} md={14} style={{ color: "white" }}>
                        <Paragraph>{selectedMovie.beschreibung}</Paragraph>
                    </Col>
                </Row>
            </Col>
        </Row>
    );
};