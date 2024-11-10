import React from "react";

export default function SongSpecificMessege({ track }) {
  return (
    <div className="opacity-0 transition-opacity duration-300 group-hover:opacity-100">
      {track.song.preview_url ? (
        <a
          className="absolute text-xs hover:underline"
          href={track.song.external_urls.spotify}
          target="_blank"
          rel="noopener noreferrer"
        >
          Check on Spotify
        </a>
      ) : (
        <p className="pointer-events-none absolute text-xs">Preview not available :/</p>
      )}
    </div>
  );
}
