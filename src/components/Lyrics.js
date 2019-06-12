import React, {useState, useEffect} from 'react';
import axios from 'axios';
import Button from './Button';
import {Link} from 'react-router-dom';
import Moment from 'react-moment';

const Lyrics = ({match}) => {
	const id = match.params.id;
	const [lyrics, setLyrics] = useState({});
	const [track, setTrack] = useState({});
	const lyricsurl = `https://cors-anywhere.herokuapp.com/https://api.musixmatch.com/ws/1.1/track.lyrics.get?track_id=${id}&apikey=6fe54f635e9936e32d712c4d3053efb5`;
	const trackurl = `https://cors-anywhere.herokuapp.com/https://api.musixmatch.com/ws/1.1/track.get?track_id=${id}&apikey=6fe54f635e9936e32d712c4d3053efb5`;
	useEffect(() => {
		axios
			.get(lyricsurl)
			.then(res => {
				const result = res.data.message.body.lyrics;
				setLyrics(result);
				return axios.get(trackurl);
			})
			.then(res => {
				const result = res.data.message.body.track;
				setTrack(result);
			})
			.catch(({response}) => {
				console.log('error!!!!!');
			});
	}, [lyricsurl, trackurl]);

	return (
		<div className="py-2">
			{Object.keys(track).length === 0 || Object.keys(lyrics).length === 0 ? (
				<div className="mx-4 text-center">
					<i className="icon-spinner icon-spin icon-3x mx-auto"></i>
				</div>
			) : (
				<div className="card mx-4 p-2 w-75 mx-auto">
					<h3 className="card-title mx-3">
						{track.track_name} by {track.artist_name}
					</h3>
					<div className="card-text mx-3 mb-3">{lyrics.lyrics_body}</div>
					<div className="card-body">
						<p className="card-text">
							<strong>Artist Name:</strong> {track.artist_name}
						</p>
						<p className="card-text">
							<strong>Album Name:</strong> {track.album_name}
						</p>
						<p className="card-text">
							<strong>Genre: </strong>{' '}
							{track &&
								track.primary_genres &&
								track.primary_genres.music_genre_list[0] &&
								track.primary_genres.music_genre_list[0].music_genre
									.music_genre_name}
						</p>
						<p className="card-text">
							<strong>Updated-time: </strong>
							<Moment format="MMM D YYYY" withTitle>
								{track.updated_time}
							</Moment>
						</p>
					</div>
					<Link to="/" className=" m-3">
						<Button>Go back</Button>
					</Link>
				</div>
			)}
		</div>
	);
};

export default Lyrics;
