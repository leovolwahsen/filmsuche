import { Menu, Typography, Grid, Flex } from "antd";
import { FaHome, FaClipboardList, FaCar, FaUser, FaBars } from "react-icons/fa";
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
        { name: "Home", route: "/", icon: <FaHome /> },
        { name: "Movies", route: "/movies", icon: <FaClipboardList /> },
        { name: "Favorites", route: "/favorites", icon: <FaCar /> },
        { name: "Contact Us", route: "/contact-us", icon: <FaUser /> },
    ];

    const items = navLinks.map((link) => ({
        label: <NavLink to={link.route}>{link.name}</NavLink>,
        key: link.route,
        icon: link.icon
    }));

    const screens = useBreakpoint();
    const location = useLocation();

    return (
        <nav
            style={{
                backgroundColor: "#f5f5f5",
                boxShadow: "0px 2px 4px rgba(0, 0, 0, 0.1)",
                padding: "1rem 0",
                position: "relative",
            }}
        >
            <Flex align="center" justify="around" style={{ width: "100vw" }}>
                <Title level={4} style={{ margin: 0 }}>
                    Menorca
                </Title>
                {!screens.xxl && (
                    <FaBars
                        style={{ fontSize: "24px", cursor: "pointer" }}
                        onClick={toggleMenu}
                    />
                )}
            </Flex>

            {!screens.xxl && menuOpen ? (
                <Menu
                    mode="vertical"
                    selectedKeys={[location.pathname]}
                    defaultSelectedKeys={["/"]}
                    items={items}
                    style={{
                        position: "absolute",
                        top: "100%",
                        left: 0,
                        width: "100vw",
                        backgroundColor: "#f5f5f5",
                        border: "none",
                        boxShadow: "0px 2px 4px rgba(0, 0, 0, 0.1)",
                    }}
                />
            ) : screens.xxl ? (
                <Menu
                    mode="horizontal"
                    theme="light"
                    selectedKeys={[location.pathname]}
                    defaultSelectedKeys={["/"]}
                    items={items}
                    style={{
                        marginTop: "10px",
                        width: "100vw",
                    }}
                />
            ) : null}
        </nav>
    )
}
