import React, { useEffect, useContext } from 'react';
import Song from './Song';
import axios from 'axios';
import { lyricsContext } from '../context/context';
import Button from './Button';

const Home = () => {
	const { songList, setSongList, setSearchVal, title, tracksUrl, dispatch } = useContext(
		lyricsContext
	);
	const { tracks, loading } = songList;

	useEffect(() => {
		setSongList(
			prevSongList => (prevSongList = { ...prevSongList, loading: true })
		);
		axios
			.get(tracksUrl)
			.then(res => {
				const result = res.data.message.body.track_list;
				setSongList(
					prevSongList =>
						(prevSongList = { ...prevSongList, tracks: result, loading: false })
				);
			})
			.catch(({ response }) => {
				console.log('error!!!!!');
			});

			return (setSearchVal(''))
	}, [setSongList(songList), tracksUrl]);

	const songLists =
	tracks && tracks.length ? (
		tracks.map(song => (
			<Song trackInfo={song.track} key={song.track.track_id} />
		))
	) : (
		<i className="icon-spinner icon-spin icon-3x mx-auto"></i>
	);

	return (
		<div className="mb-4">
			<div className="card mx-4">
				<h3 className="card-title my-2 mx-auto">
					<i className="icon-music mx-2"></i>
					{title}
				</h3>
				<div className="d-flex flex-wrap justify-content-around">
					{songLists}
				</div>
				<div className="d-flex w-75 mx-auto justify-content-between px-3 mt-2 mb-4">
					<Button customClass="" handleClick={() => dispatch({ type: 'prev' })}>
						{loading ? (
							<React.Fragment>
								<span className="spinner-border spinner-border-sm mr-2"></span>
								Loading...
							</React.Fragment>
						) : (
							<React.Fragment>
								<i className="icon-chevron-left pr-3"></i>Previous
							</React.Fragment>
						)}
					</Button>
					<Button
						customClass=""
						handleClick={() => {
							dispatch({ type: 'next' });
						}}>
						{loading ? (
							<React.Fragment>
								<span className="spinner-border spinner-border-sm mr-2"></span>
								Loading...
							</React.Fragment>
						) : (
							<React.Fragment>
								Next<i className="icon-chevron-right pl-3"></i>
							</React.Fragment>
						)}
					</Button>
				</div>
			</div>
		</div>
	);
};

export default Home;
