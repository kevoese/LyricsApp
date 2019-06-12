import React from 'react';
import { Link } from 'react-router-dom'

const Song = ({ trackInfo }) => {
  const { track_name, track_id, album_name, artist_name} = trackInfo;
  return (
    <div className="card w-25 card-body w-30 mx-4 my-4">
      <h5 className="card-title mx-auto">{track_name}</h5>
      <p className="card-text overflow-ellipsis">
        <strong>Artist Name:</strong> {artist_name}
      </p>
      <p className="card-text overflow-ellipsis">
        <strong>Album Name:</strong> {album_name}
      </p>
      <Link to={`/lyrics/${track_id}`} className="btn btn-primary"> <i className="icon-play icon-large mx-auto pr-2"></i> Show Lyrics</Link>
    </div>
  )
}

export default Song;
