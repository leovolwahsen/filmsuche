import { Typography, Flex, Space, Card, Button, Rate } from "antd";
import React, { useEffect, useState } from "react";
import { useMovies } from "../data/useMovies";
import { IMovie } from "../types/movies";

const { Title, Paragraph } = Typography;

export const Home: React.FC = () => {
  const { movies, isLoading } = useMovies();
  const [featuredMovie, setFeaturedMovie] = useState<IMovie | null>(null);

  useEffect(() => {
    if (!isLoading && movies.length > 0) {
      const today = new Date().toISOString().split('T')[0];
      const cachedMovie = localStorage.getItem("featuredMovie");
      const cachedDate = localStorage.getItem("featuredDate");

      if (cachedMovie && cachedDate === today) {
        setFeaturedMovie(JSON.parse(cachedMovie));
      } else {
        const randomMovie = movies[Math.floor(Math.random() * movies.length)];

        const newFeaturedMovie: IMovie = {
          _id: randomMovie._id,
          name: randomMovie.name,
          bild: randomMovie.bild,
          bewertung: randomMovie.bewertung,
          beschreibung: randomMovie.beschreibung,
          trailer: randomMovie.trailer,
        };

        setFeaturedMovie(newFeaturedMovie);
        localStorage.setItem("featuredMovie", JSON.stringify(newFeaturedMovie));
        localStorage.setItem("featuredDate", today);
      }
    }
  }, [movies, isLoading]);

  if (!featuredMovie) {
    return <Title level={3}>Laden...</Title>;
  }

  return (
    <Flex vertical align="center" justify="center" style={{ width: "100%", padding: "20px" }}>
      <Title level={1}>Willkommen bei der Filmsuche</Title>
      <Space direction="vertical" size="large" style={{ maxWidth: "800px" }}>
        <Paragraph style={{ fontSize: "16px", textAlign: "center" }}>
          Entdecken Sie großartige Filme, finden Sie Inspiration und genießen Sie unsere Empfehlungen!
        </Paragraph>
        <Card
          hoverable
          style={{ width: "100%", maxWidth: "800px", backgroundColor: "#f9f9f9", borderRadius: "10px" }}
          cover={<img alt="Featured Movie" src={featuredMovie.bild} />}
        >
          <Flex vertical gap={15}>
            <Title level={3}>Film des Tages: {featuredMovie.name}</Title>
          {featuredMovie.bewertung && (
            <Rate
              allowHalf
              disabled
              value={parseFloat(featuredMovie.bewertung)}
            />
          )}
          <Paragraph>{featuredMovie.beschreibung}</Paragraph>
          {featuredMovie.trailer && (
            <Button type="primary" href={featuredMovie.trailer} target="_blank">
              Trailer ansehen
            </Button>
          )}
          </Flex>
        </Card>
      </Space>
    </Flex>
  );
};
