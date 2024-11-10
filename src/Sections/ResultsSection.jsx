import BackgroundGrid from "../UI/BackgroundGrid.jsx";
import { Link } from "react-router-dom";
import { TransitionDiv } from "../UI/TransitionDiv.jsx";
import { useEffect, useState } from "react";
import SongListItem from "../Layouts/SongListItem.jsx";
import useSessionStorageState from "../Utils/useSessionStorageState.js";
import useSortSongs from "../Utils/useSortSongs.js";
import HeaderLayout from "../Layouts/Main/HeaderLayout.jsx";

export const ResultsSection = ({ tracksData, error, setTracks, setError }) => {
  //uncomment this when done, for dev its an annoying
  // Clear tracksData and error on unmount
  // useEffect(() => {
  //   return () => {
  //     setTracks([]); // Clear tracks data
  //     setError(null); // Clear error message
  //   };
  // }, [setTracks, setError]);

  //states for audio player
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTrack, setCurrentTrack] = useState(null);
  const [audio] = useState(new Audio()); // Single Audio instance

  // Retrieve user target features
  const [searchParams, setSearchParams] = useSessionStorageState("SearchParams", {});

  // Sort tracks and store in session storage
  const [trackList, setTrackList] = useSessionStorageState("TrackList", []);

  // Sort and update trackList whenever tracksData or searchParams change
  useEffect(() => {
    const sortedTracks = useSortSongs(searchParams, tracksData);
    setTrackList(sortedTracks); // Update session storage with sorted tracks
  }, [searchParams, tracksData, setTrackList]);

  //player Utills
  useEffect(() => {
    if (currentTrack && currentTrack.song.preview_url) {
      audio.src = currentTrack.song.preview_url; // Set the audio source to the new track
      audio.play();
      setIsPlaying(true);
      audio.volume = 0.4; // Set volume level

      audio.onended = () => setIsPlaying(false); // Stop playback when audio ends
    }

    return () => {
      audio.pause(); // Cleanup audio on component unmount
      setIsPlaying(false);
    };
  }, [currentTrack, audio]);

  const handlePlay = (track) => {
    if (isPlaying && currentTrack === track) {
      // If the current track is playing, pause it
      audio.pause();
      setIsPlaying(false);
    } else {
      // If it's a new track or resuming, set the new track
      setCurrentTrack(track);
      audio.play();
      audio.volume = 0.5;
      setIsPlaying(true);
    }
  };

  return (
    <div className="doto flex flex-col">
      <BackgroundGrid />
      <TransitionDiv />
      <Link to="/">
        <HeaderLayout slogan={false} scale={0.8} />
      </Link>

      {/* check the error syntext */}
      <section className="mb-10 mt-10 flex flex-col items-center justify-center">
        {error && trackList.length == 0 ? (
          <h2>We are having trouble Matching you music</h2>
        ) : (
          <>
            <h2 className="mb-4 bg-gradient-to-r from-slate-200/95 to-slate-200/90 bg-clip-text text-center text-4xl transition-all duration-300 sm:text-6xl md:text-8xl">
              We Found{" "}
              <span className="animate-gradient-pulse ml-2 bg-gradient-to-r from-teal-500 to-green-600 bg-clip-text font-bold text-transparent">
                {" "}
                {trackList.length}
              </span>{" "}
              Songs
            </h2>
            <h3 className="text- bg-gradient-to-r from-slate-200/95 to-slate-200/90 bg-clip-text text-center text-xl transition-all duration-300 sm:text-3xl md:text-4xl">
              That we think you'll like!
            </h3>
          </>
        )}
      </section>

      {/* track list section  */}
      <div className="flex flex-col items-center">
        {trackList.map((track, i) => (
          <SongListItem
            key={i}
            track={track}
            handlePlay={() => handlePlay(track)}
            isPlaying={isPlaying && currentTrack === track}
          />
        ))}
      </div>
    </div>
  );
};

export default ResultsSection;
