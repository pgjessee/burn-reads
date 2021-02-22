import React, { useState } from 'react';
import * as sessionActions from '../../store/session';
import { useDispatch, useSelector } from 'react-redux';
import { Redirect } from 'react-router-dom';
import SignUpFormPage from '../SignupFormPage/SignUpForm';

import './LoginFormPage.css';
import {
	Box,
	Button,
	Flex,
	Input,
	Stack,
	Tab,
	TabList,
	TabPanel,
	TabPanels,
	Tabs,
} from '@chakra-ui/react';

const LoginFormPage = () => {
	const dispatch = useDispatch();
	const sessionUser = useSelector(state => state.session.user);
	const [credential, setCredential] = useState('');
	const [password, setPassword] = useState('');
	const [errors, setErrors] = useState([]);

	if (sessionUser) return <Redirect to='/' />;

	const handleSubmit = e => {
		e.preventDefault();
		setErrors([]);
		return dispatch(sessionActions.login({ credential, password })).catch(res => {
			if (res.data && res.data.errors) setErrors(res.data.errors);
		});
	};

	const demoLogin = e => {
		e.preventDefault();
		return dispatch(sessionActions.login({ credential: 'demo@aa.io', password: '123' })).catch(
			res => {
				if (res.data && res.data.errors) setErrors(res.data.errors);
			}
		);
	};

	return (
		// <div>
		<Flex
			// justify="space-evenly"
			justify='center'
			align='center'
			bgImage='url(/matchSticks.jfif)'
			bgSize='cover'
			backgroundRepeat='no-repeat'
			height='100vh'
			width='100vw'
			overflow='hidden'
		>
			<Box
				color='white'
				// border="solid"
				width='50vw'
				textAlign='center'
				fontSize='70px'
				alignSelf='flex-start'
				mt='10vh'
				fontFamily='Big Shoulders Display, cursive'
				p={10}
				m={7}
			>
				Welcome to BurnReads
			</Box>
			<Box
				className='form'
				bg='red.500'
				// bg="#F7B05B"
				// bg="#CC232A"
				// border="2px"
				// borderColor="red.500"
				width='350px'
				margin='10px'
				p={5}
				// pt={10}
				boxShadow='sm'
				rounded='lg'
				textAlign='center'
				// height="220px"
				minWidth='200px'
				opacity='0.9'
			>
				<Tabs
					variant='soft-rounded'
					colorScheme='red'
					// bg="yellow.200"
					isFitted
					m={2}
					// defaultIndex={formTab}
					rounded='lg'
				>
					<TabList>
						<Tab color='white'>Login</Tab>
						<Tab color='white'>Sign Up</Tab>
					</TabList>
					<TabPanels>
						<TabPanel>
							<form onSubmit={handleSubmit}>
								<Stack spacing={4}>
									<ul>
										{errors.map((error, idx) => (
											<li key={idx}>{error}</li>
										))}
									</ul>
									<div>
										<label htmlFor='email'></label>
										<Input
											name='email'
											type='text'
											value={credential}
											onChange={e => setCredential(e.target.value)}
											placeholder='Email'
											bg='white'
											required
										/>
									</div>
									<div>
										{/* <Text>Password</Text> */}
										<Input
											name='password'
											type='password'
											value={password}
											onChange={e => setPassword(e.target.value)}
											placeholder='Password'
											bg='white'
											required
										/>
									</div>
									<div className='login-form-submit-button-div'>
										<Button type='submit' boxShadow='md' width='100%'>
											Login
										</Button>
										<Button boxShadow='md' width='100%' mt={4} onClick={demoLogin}>
											Demo Login
										</Button>
									</div>
								</Stack>
							</form>
						</TabPanel>
						<TabPanel>
							<SignUpFormPage />
						</TabPanel>
					</TabPanels>
				</Tabs>
			</Box>
		</Flex>
		// </div>
	);
};

export default LoginFormPage;
