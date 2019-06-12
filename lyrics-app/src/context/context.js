import React, { createContext, useState, useReducer } from 'react';

export const lyricsContext = createContext();

export const ContextProvider = ({ children }) => {
	const [page, setPage] = useState(1);
	const [title, setTitle] = useState('Top Nigerian Songs');
	const [pageType, setPageType] = useState('top');
	const [searchVal, setSearchVal] = useState('');
	const urlObj = {
		search: () =>
			`https://cors-anywhere.herokuapp.com/https://api.musixmatch.com/ws/1.1/track.search?q=${searchVal}&page_size=6&page=${page}&s_track_rating=desc&apikey=6fe54f635e9936e32d712c4d3053efb5`,
		top: () =>
			`https://cors-anywhere.herokuapp.com/https://api.musixmatch.com/ws/1.1/chart.tracks.get?chart_name=top&page=${page}&page_size=6&country=NG&f_has_lyrics=1&apikey=6fe54f635e9936e32d712c4d3053efb5`,
	};
	const [tracksUrl, dispatch] = useReducer((state, action) => {
		const { type, searchVal } = action;
		if (searchVal) {
			setPageType('search');
			setSearchVal(searchVal);
		}

		if (type === 'next') {
			setPage(prevPage => (prevPage = prevPage + 1));
			return urlObj[pageType]();
		} else if (type === 'prev') {
			setPage(prevPage => (prevPage = prevPage < 2 ? prevPage : prevPage - 1));
			return urlObj[pageType]();
		}
		console.log('got here >>', searchVal);
		setPage(1);
		return urlObj[pageType](searchVal);
	}, urlObj.top());

	const [songList, setSongList] = useState({
		tracks: [],
		loading: false,
	});
	return (
		<lyricsContext.Provider
			value={{
				songList,
				setSongList,
				tracksUrl,
				dispatch,
				pageType,
				setPageType,
				title,
				setTitle,
				searchVal,
				setSearchVal,
			}}>
			{children}
		</lyricsContext.Provider>
	);
};
