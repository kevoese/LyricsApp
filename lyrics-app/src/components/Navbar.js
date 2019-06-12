import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { lyricsContext } from '../context/context';

const Navbar = () => {
	const { setPageType, setSearchVal, setTitle, dispatch } = useContext(lyricsContext);
	return (
		<nav className="d-flex justify-between navbar navbar-light bg-primary mb-4">
			<h2 className="navbar-brand mx-2 text-white font-weight-bold" href="#">
				LyricsApp
			</h2>
			<Link to="/">
				<span
					onClick={() => {
						setPageType('top');
            setSearchVal('');
            setTitle('Top Nigerian Songs');
						dispatch({});
					}}
					className="text-white mr-5">
					Home
				</span>
			</Link>
		</nav>
	);
};

export default Navbar;
