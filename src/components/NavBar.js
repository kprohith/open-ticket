import logo from "../images/logo.png"

import {
    Link as ReactLink
} from "react-router-dom";

import {
    Button,
    Image,
    HStack,
    Link,
} from "@chakra-ui/react";

export default function NavBar(props) {

    return (
        <HStack
            position="relative"
            width="100%"
            top="0px"
            left="0px"
            spacing="50px"
            padding="20px"
            bg="white"
        >
            <Image
                src={logo}
                alt="OpenTicket logo"
                width="400px"
                height="80px"
            />
            {/* 
             TODO: find a way to add icons back in - need to be components not imgs
             rightIcon={faEthereum}
             rightIcon={faTicketAlt}
             rightIcon={faQrcode}
             rightIcon={faTools} */}
            
            <Link as={ReactLink} to="/"><Button minW="130px">Buy</Button></Link>
            {props.address && <Link as={ReactLink} to="/wallet">
                <Button minW="130px">Owned Tickets</Button></Link>}
            {props.address && <Link as={ReactLink} to="/check-in">
                <Button minW="130px">Check In</Button></Link>}
            {props.address && props.isOwner && <Link as={ReactLink} to="/admin">
                <Button minW="130px" colorScheme="yellow" color="white">Admin Panel</Button></Link>} 

        </HStack>
    )

}

