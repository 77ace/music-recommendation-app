//this fuction will take the results from the api and sort the songs

//DEFAULT_SEARCH_PARAMS are the non-modified parameters
const DEFAULT_SEARCH_PARAMS = {
  //limit: "100",
  target_danceability: 0.5,
  target_energy: 0.5,
  target_valence: 0.5,
  target_instrumentalness: 0.5,
  target_liveness: 0.5,
  target_tempo: 55,
  target_acousticness: 0.5,
  includeExplicit: true,
  target_popularity: "Any",
  // selectedGenres: [],
};

const SortSongs = (targetFeatures, songList) => {
  let sortedSongs = []; //buffer array

  //normalize target tempo value
  let normalizedTargetTempo = normalizeTempo(targetFeatures.target_tempo);
  if (targetFeatures.target_popularity !== DEFAULT_SEARCH_PARAMS.target_popularity)
    var normalizedTargetPopularity = normalizePopularity(targetFeatures.target_popularity);

  //iterate through the songs
  songList.forEach((song) => {
    //before anything. check if explicit
    if (targetFeatures.includeExplicit == false && song.explicit == true) return; //skip this song

    //normalize values
    //tempo values
    let normalizedSongTempo = normalizeTempo(song.features.tempo);

    //scoring system based on distance
    //only score the feature if they were modified by user
    let score = 0;
    if (targetFeatures.target_acousticness !== DEFAULT_SEARCH_PARAMS.target_acousticness)
      score += Math.pow(targetFeatures.target_acousticness - song.features.acousticness, 2);

    if (targetFeatures.target_danceability !== DEFAULT_SEARCH_PARAMS.target_danceability)
      score += Math.pow(targetFeatures.target_danceability - song.features.danceability, 2);

    if (targetFeatures.target_energy !== DEFAULT_SEARCH_PARAMS.target_energy)
      score += Math.pow(targetFeatures.target_energy - song.features.energy, 2);

    if (targetFeatures.target_instrumentalness !== DEFAULT_SEARCH_PARAMS.target_instrumentalness)
      score += Math.pow(targetFeatures.target_instrumentalness - song.features.instrumentalness, 2);

    if (targetFeatures.target_liveness !== DEFAULT_SEARCH_PARAMS.target_liveness)
      score += Math.pow(targetFeatures.target_liveness - song.features.liveness, 2);

    if (targetFeatures.target_valence !== DEFAULT_SEARCH_PARAMS.target_valence)
      score += Math.pow(targetFeatures.target_valence - song.features.valence, 2);

    if (targetFeatures.target_tempo !== DEFAULT_SEARCH_PARAMS.target_tempo)
      score += Math.pow(normalizedTargetTempo - normalizedSongTempo, 2);

    if (targetFeatures.target_popularity !== DEFAULT_SEARCH_PARAMS.target_popularity) {
      let normalizedSongPopularity = normalizePopularity(song.popularity);
      score += Math.pow(normalizedTargetPopularity - normalizedSongPopularity, 2);
    }

    sortedSongs.push({ song, score });
  });

  //lowest score is to be first on the list
  sortedSongs.sort((a, b) => a.score - b.score);

  return sortedSongs;
};

//func to normalize tempo values to the range 0-1
const normalizeTempo = (tempoValue) => {
  return (tempoValue - 56) / (180 - 56);
};

//func to normalize popularity values to the range 0-1
const normalizePopularity = (popularityValue) => {
  //for traget values (string input)
  if (typeof popularityValue == "string") {
    if (popularityValue == "High") return 1;
    else if (popularityValue == "Mid") return 0.5;
    else if (popularityValue == "Low") return 0;
  }
  //for song values (number input)
  else return popularityValue / 100;
};

export default SortSongs;
