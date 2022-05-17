import {
    useState,
    useEffect
} from "react";

import logo from "../images/logo.png"

import {
    Link as ReactLink
} from "react-router-dom";

import {
    Button,
    Image,
    Wrap,
    Link,
    Flex,
    Menu,
    MenuButton,
    IconButton,
    MenuList,
    VStack
} from "@chakra-ui/react";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
    faAlignJustify
} from "@fortawesome/free-solid-svg-icons";

export default function NavBar({address, isOwner}) {

    const [width, setWidth] = useState(null);

    useEffect(() => {
        updateDims();
        window.addEventListener("resize", updateDims);
        return () =>
            window.removeEventListener("resize", updateDims);
    }, [])

    const updateDims = () => {
        setWidth(window.innerWidth);
    }

    const desktop = width > 1200;
    return (
        <Flex
            position="relative"
            maxW="100vw"
            top="0px"
            left="0px"
            justify={desktop ? "left" : "center"}
            align="center">

            <Image
                src={logo}
                alt="OpenTicket logo"
                maxW="25vw"
                minW="10vw"
                m="4"
            />

            {desktop &&
                <Wrap justify="center">
                    <Link p="4" as={ReactLink} to="/"><Button minW="130px">Buy</Button></Link>
                    {address && <Link p="4" as={ReactLink} to="/wallet">
                        <Button minW="130px">Owned Tickets</Button></Link>}
                    {address && isOwner && <Link p="4" as={ReactLink} to="/check-in">
                        <Button minW="130px" colorScheme="yellow" color="white">Check In</Button></Link>}
                    {address && isOwner && <Link p="4" as={ReactLink} to="/admin">
                        <Button minW="130px" colorScheme="yellow" color="white">Admin Panel</Button></Link>}
                </Wrap>
            }

            {!desktop &&
                <Menu>
                    <MenuButton
                        as={IconButton}
                        aria-label='Options'
                        icon={<FontAwesomeIcon icon={faAlignJustify}></FontAwesomeIcon>}
                        variant='outline'
                    />
                    <MenuList>
                        <VStack justify="center">
                            <Link p="1" as={ReactLink} to="/"><Button minW="130px">Buy</Button></Link>
                            {address && <Link p="1" as={ReactLink} to="/wallet">
                                <Button minW="130px">Owned Tickets</Button></Link>}
                            {address && isOwner && <Link p="1" as={ReactLink} to="/check-in">
                                <Button minW="130px" colorScheme="yellow" color="white">Check In</Button></Link>}
                            {address && isOwner && <Link p="1" as={ReactLink} to="/admin">
                                <Button minW="130px" colorScheme="yellow" color="white">Admin Panel</Button></Link>}
                        </VStack>
                    </MenuList>
                </Menu>
            }
        </Flex>
    )
}