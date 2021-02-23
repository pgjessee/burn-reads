import React from "react";
import { Box, Image } from "@chakra-ui/react";
import { NavLink } from "react-router-dom/cjs/react-router-dom.min";
export default function Logo() {
	return (
		<Box width="65px">
			<NavLink to="/" exact={true} activeClassName="active">
				<Image alt="logo" src={"/favicon.ico"} />
			</NavLink>
		</Box>
	);
}
