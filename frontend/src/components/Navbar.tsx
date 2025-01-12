import { Menu, Typography, Grid, Row, Col, Drawer, Button } from "antd";
import { FaHome, FaVideo, FaStar, FaUser, FaBars, FaCross } from "react-icons/fa";
import { FaXmark } from "react-icons/fa6";
import { useState } from "react";
import { NavLink, useLocation } from "react-router-dom";

const { Title } = Typography;
const { useBreakpoint } = Grid;

export const Navbar: React.FC = () => {
    const [menuOpen, setMenuOpen] = useState(false);

    const toggleMenu = () => {
        setMenuOpen(!menuOpen);
    };

    const navLinks = [
        { name: "Hauptseite", route: "/", icon: <FaHome /> },
        { name: "Filme", route: "/movies", icon: <FaVideo /> },
        { name: "Favorieten", route: "/favorites", icon: <FaStar /> },
        { name: "Kontakt", route: "/contact-us", icon: <FaUser /> },
    ];

    const items = navLinks.map((link) => ({
        label: (
            <NavLink to={link.route} style={{ display: "flex", alignItems: "center", gap: "8px" }}>
                {link.icon}
                {link.name}
            </NavLink>
        ),
        key: link.route,
    }));

    const screens = useBreakpoint();
    const location = useLocation();

    return (
        <nav style={{ backgroundColor: "#001529", padding: "0.5rem 1rem" }}>
            <Row align="middle" justify="space-between" style={{ width: "100%" }}>
                <Col flex="none">
                    <Title level={3} style={{ margin: 0, color: "white" }}>
                        Filmsuche
                    </Title>
                </Col>
                <Col flex="auto" style={{ textAlign: "center" }}>
                    {!screens.md && (
                        <Button
                            icon={<FaBars style={{ fontSize: "20px", color: "white" }} />}
                            type="text"
                            onClick={toggleMenu}
                            style={{
                                background: "transparent",
                                border: "none",
                                boxShadow: "none",
                            }}
                        />
                    )}
                </Col>
            </Row>

            {screens.md ? (
                <Menu
                    mode="horizontal"
                    theme="dark"
                    selectedKeys={[location.pathname]}
                    defaultSelectedKeys={["/"]}
                    items={items}
                    style={{
                        width: "100vw",
                        display: "flex",
                        justifyContent: "start",
                        backgroundColor: "#001529",
                        borderBottom: "none",
                        flexWrap: "wrap",
                    }}
                />
            ) : (
                <Drawer
                    placement="left"
                    onClose={toggleMenu}
                    open={menuOpen}
                    styles={{
                        body: {
                            padding: 0,
                            backgroundColor: "#001529",
                        },
                        header: {
                            backgroundColor: "#001529",
                            color: "white",
                            borderBottom: "none",
                        },
                    }}
                    closeIcon={<FaXmark size={24} style={{ color: "white" }} />}
                >
                    <Menu
                        mode="vertical"
                        theme="dark"
                        selectedKeys={[location.pathname]}
                        defaultSelectedKeys={["/"]}
                        items={items}
                        onClick={toggleMenu}
                        style={{
                            backgroundColor: "#001529",
                            border: "none",
                        }}
                    />
                </Drawer>
            )}
        </nav>
    );
};
