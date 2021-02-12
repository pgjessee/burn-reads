import React, { useState } from 'react';
import { NavLink, useHistory } from 'react-router-dom';
// import { AiOutlineClose } from "react-icons/ai";
import { Button, Flex, HStack, Input, MenuIcon, Stack, Text } from '@chakra-ui/react';
import { useDispatch, useSelector } from 'react-redux';
import Logo from './Logo';
import * as sessionActions from '../../store/session';

const REMOVE_SESSION_USER = 'REMOVE_SESSION_USER';

const NavBarContainer = props => {
	return (
		<Flex
			as='nav'
			align='center'
			justify='space-between'
			position='sticky'
			top='0'
			wrap='wrap'
			w='100%'
			mb={8}
			p={3}
			fontWeight='bold'
			opacity='0.8'
			bg={['red.200']}
			color={['black', 'black', 'primary.700', 'primary.700']}
			// borderBottom="1px solid red"
		>
			{props.children}
		</Flex>
	);
};

const NavBar = () => {
	// const [isOpen, setIsOpen] = useState(false);

	// const toggle = () => setIsOpen(!isOpen);
	const sessionUser = useSelector(state => state.session.user);
	const dispatch = useDispatch();
	const [searchTerm, setSearchTerm] = useState(null);
	const history = useHistory();

	const handleLogoutBtn = e => {
		dispatch(sessionActions.logout());
	};

	const handleSearch = async () => {
		history.push(`/search/${searchTerm}`);
	};

	return (
		// <Flex >
		<NavBarContainer>
			<HStack>
				<Logo />
			</HStack>
			<HStack>
				<form onSubmit={handleSearch}>
					<input
						type='text'
						id='searchInput'
						placeholder='Search...'
						autoComplete='off'
						onChange={e => setSearchTerm(e.target.value)}
						bg='white'
					/>
				</form>
			</HStack>
			<HStack>
				{sessionUser && (
					<NavLink to='/users' exact={true} activeClassName='active'>
						<Stack spacing='0' direction='column' align='center'>
							{/* <RiAncientGateLine size="30px" /> */}
							<NavLink to='/mybooks'>My Books</NavLink>
						</Stack>
					</NavLink>
				)}
				{!sessionUser && (
					<>
						<NavLink to='/login' exact={true} activeClassName='active'>
							Login
						</NavLink>
						<NavLink to='/signup' exact={true} activeClassName='active'>
							Sign Up
						</NavLink>
					</>
				)}
				{sessionUser && <Button onClick={() => handleLogoutBtn()}>Logout</Button>}
			</HStack>
		</NavBarContainer>
		// </Flex>
	);
};

export default NavBar;
