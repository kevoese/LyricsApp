import React, { useContext, useState } from 'react';
import Button from './Button';
import { lyricsContext } from '../context/context';

const Search = () => {
	const { songList, setTitle, dispatch, searchVal, setSearchVal } = useContext(
		lyricsContext
	);
	const { loading } = songList;
	const [error, setError] = useState('');

	const handleSubmit = e => {
		e.preventDefault();
		if (searchVal === '') setError('Enter a value');
		else {
			dispatch({ type: '', searchVal: searchVal });
			setTitle('Search Result');
		}
	};

	return (
		<form onSubmit={handleSubmit} className="card card-body mb-4 mx-4">
			<div className="input-group mb-2 w-75 p-3 mx-auto">
				<input
					onChange={e => {
						setSearchVal(e.target.value);
						setError('');
					}}
					type="text"
					className="form-control border border-primary"
					value={searchVal}
					placeholder="Search any word in the track name, artists or lyrics..."
				/>
				<div className="input-group-append">
					<Button>
						{' '}
						{loading ? (
								<span className="spinner-border spinner-border-sm mr-2"></span>
						) : (
							''
						)}
						Search
					</Button>
				</div>
			</div>
			{error === '' ? (
				''
			) : (
				<span className="text-danger mx-auto text-center">
					Please Enter a Name
				</span>
			)}
		</form>
	);
};

export default Search;
