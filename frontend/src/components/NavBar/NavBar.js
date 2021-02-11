import React, { useState } from "react";
import { NavLink } from "react-router-dom";
// import { AiOutlineClose } from "react-icons/ai";
import { Button, Flex, HStack, Input, MenuIcon, Stack, Text } from "@chakra-ui/react";
import { useSelector } from "react-redux";
import Logo from "./Logo";
// import { logout } from "../../store/session";


const REMOVE_SESSION_USER = "REMOVE_SESSION_USER";


const NavBarContainer = (props) => {
	return (
		<Flex
			as="nav"
			align="center"
			justify="space-between"
			position="sticky"
			top="0"
			wrap="wrap"
			w="100%"
			mb={8}
			p={3}
			fontWeight="bold"
			opacity="0.8"
			bg={["red.200"]}
			color={["black", "black", "primary.700", "primary.700"]}
			// borderBottom="1px solid red"
		>
			{props.children}
		</Flex>
	);
};

const NavBar = () => {
	// const [isOpen, setIsOpen] = useState(false);

	// const toggle = () => setIsOpen(!isOpen);
	const sessionUser = useSelector((state) => state.session.user);
	const removeSessionUser = () => {
		return {
			type: REMOVE_SESSION_USER,
			user: null,
		};
	};
	 const logout = () => async (dispatch) => {
			console.log("Logout function");
			const res = await fetch("/api/session", {
				method: "DELETE",
			});
			dispatch(removeSessionUser());
			return res;
		};
	return (
		// <Flex >
		<NavBarContainer>
			<HStack>
				<Logo/>
			</HStack>
			<HStack>
				<Input placeholder="Search here" bg="white" />
			</HStack>
			<HStack>
				{sessionUser && <NavLink to="/users" exact={true} activeClassName="active">
						<Stack spacing="0" direction="column" align="center">
							{/* <RiAncientGateLine size="30px" /> */}
							<NavLink to="/">My Kindling Shelves</NavLink>
						</Stack>
					</NavLink>}
				{!sessionUser && (
					<>
						<NavLink to="/login" exact={true} activeClassName="active">
							Login
						</NavLink>
						<NavLink to="/signup" exact={true} activeClassName="active">
							Sign Up
						</NavLink>
					</>
				)}
				{sessionUser && <Button onClick={()=> logout()}>Logout</Button>}
			</HStack>
		</NavBarContainer>
		// </Flex>
	);
};

export default NavBar;
