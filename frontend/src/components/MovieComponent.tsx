import { useEffect, useState, CSSProperties } from "react";
import { useAxios } from "../data/useAxios";
import { useParams } from "react-router-dom";
import { Col, Divider, Row, Typography, Image, Rate, Grid } from "antd";
import { IMovie } from "../types/movies";

const { Title, Text, Paragraph } = Typography;
const { useBreakpoint } = Grid;

export const MovieComponent: React.FC = () => {
    const axiosInstance = useAxios();
    const { name } = useParams();
    const screens = useBreakpoint();
    const [movies, setMovies] = useState<IMovie[]>([]);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        axiosInstance.get("/movies")
            .then((res) => setMovies(res.data))
            .catch((error) => console.error("Error fetching movies: ", error))
            .finally(() => setIsLoading(false));
    }, [axiosInstance]);

    if (isLoading) return <Text>Loading...</Text>;

    const selectedMovie = movies.find((movie) => movie.name === name);
    if (!selectedMovie) return <Text style={{ color: "white", textAlign: "center" }}>Diesen Film gibt es leider nicht mehr!</Text>;

    const iframeStyles: CSSProperties = {
        width: "100%",
        maxWidth: screens.lg ? "800px" : screens.md ? "600px" : "100%",
        aspectRatio: "16 / 9",
        position: "relative",
        margin: "0 auto",
    };

    return (
        <Row style={{ width: "100%", minHeight: "90vh", overflowY: "auto", padding: "2rem" }}>
            <Col span={24} style={{ textAlign: "center", padding: "2rem" }}>
                <article style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
                    <Title level={1}>{selectedMovie.name}</Title>
                    <Title level={5}>Kinostart: 17.11.2023 - Dramafilm - 130 Min</Title>
                    <Rate allowHalf disabled value={parseFloat(selectedMovie.bewertung)} style={{ fontSize: 40, margin: "1rem auto" }} />
                    <div style={iframeStyles}>
                        <iframe
                            src={selectedMovie.trailer}
                            title="YouTube video player"
                            style={{ position: "absolute", top: 0, left: 0, width: "100%", height: "100%", border: "none" }}
                            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                            allowFullScreen
                        />
                    </div>
                    <Paragraph style={{ color: "lightgray", textAlign: "center" }}>© Universal Studios</Paragraph>
                    <Divider />
                    <Row justify="space-around" style={{ marginTop: "2rem" }}>
                        <Col xs={24} md={8} style={{ textAlign: "center" }}>
                            <Image src={selectedMovie.bild} alt="Kinofilm" preview={false} style={{ maxWidth: "100%", height: "auto", objectFit: "cover" }} />
                        </Col>
                        <Col xs={24} md={14}>
                            <Paragraph>{selectedMovie.beschreibung}</Paragraph>
                        </Col>
                    </Row>
                </article>
            </Col>
        </Row>
    );
};
