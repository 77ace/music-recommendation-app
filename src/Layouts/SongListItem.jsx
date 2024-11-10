import React from "react";
import { SnippetPlayer } from "../UI/SnippetPlayer";
import SpotifyRedirect from "../UI/SpotifyRedirect";
import SongSpecificMessege from "../UI/SongSpecificMessege";

export default function SongListItem({ track, handlePlay, isPlaying }) {
  return (
    <div className="group mx-5 mb-2 flex h-20 w-2/3 min-w-44 items-center justify-between overflow-hidden rounded-xl bg-neutral-600/20 px-3 transition hover:bg-neutral-600/30">
      <div>
        <h1 className="text-l -mt-3 line-clamp-1 text-white">{track.song.name}</h1>
        <p className="line-clamp-1 text-sm text-neutral-400">by {track.song.artists[0].name}</p>
        <SongSpecificMessege track={track} />
      </div>
      <div className="flex flex-row justify-between">
        {track.song.preview_url == null && <SpotifyRedirect url={track.song.external_urls.spotify} />}
        {track.song.preview_url && <SnippetPlayer track={track} handlePlay={handlePlay} isPlaying={isPlaying} />}
      </div>
    </div>
  );
}

//html to check sorting algorithm

// <div className={"flex justify-center"}>
//       <h2>
//         {track.song.name} by {track.song.artists[0].name}
//       </h2>
//       <div className="px-10">
//         {/* <p>
//           {song.features.energy} {song.features.acousticness}{" "}
//           {song.features.danceability}
//           {song.features.instrumentalness} {song.features.liveness}
//           {song.popularity}
//           {song.features.tempo}
//           {song.features.valence}
//         </p> */}
//         <h2>
//           Score: {track.score} Explicit: {track.song.explicit ? "true" : "false"}
//         </h2>
//       </div>
//     </div>
