import { useState, useEffect, useRef } from "react";
import Draggable, { DraggableCore } from "react-draggable";
import {
	BrowserView,
	MobileView,
	isBrowser,
	isMobile,
} from "react-device-detect";
// import ReactAudioPlayer from "react-audio-player";
import "./MusicPlayer.scss";
// import imposterSyndrome from "./imposterSyndrome.wav";
// import bootstrapLyrics from "./bootstrapLyrics";
// import bootstrapSong from "./Bootstrap.wav";
// import imposterLyrics from "./imposterLyrics";
import albumCover from "./27Club.jpg";
import React from "react";

const MusicPlayer = (props: any) => {
	interface Song {
		song: string;
		lyrics: string;
	}

	const [maximized, setMaximized] = useState(false);
	const [musicPlayerClass, setMusicPlayerClass] = useState(
		"music-player-focused"
	);
	const [songs, setSongs] = useState<Array<Song>>([
		//		{ song: imposterSyndrome, lyrics: imposterLyrics },
		//		{ song: bootstrapSong, lyrics: bootstrapLyrics },
	]);
	const [currentSong, setCurrentSong] = useState<Song>(songs[0]);
	const audioRef = useRef<HTMLMediaElement>(null);

	let [trackCount, setTrackCount] = useState(0);

	const closeMusicPlayer = () => {
		props.openMusicPlayer(props.musicPlayerOpen);
		console.log(props);
	};

	const setMax = () => {
		if (maximized) {
			setMaximized(false);
		} else if (!maximized) {
			setMaximized(true);
		}
	};

	const focusMusicPlayer = () => {
		setMusicPlayerClass("music-player-focused");
	};

	const blurMusicPlayer = () => {
		setMusicPlayerClass("music-player");
	};

	const nextTrack = () => {
		if (trackCount < songs.length - 1) {
			let counter = trackCount + 1;
			setTrackCount(counter);
			setCurrentSong(songs[counter]);
			//console.log(currentSong);
		}
	};

	const prevTrack = () => {
		if (trackCount > 0) {
			console.log(trackCount);
			let counter = trackCount - 1;
			console.log(counter);
			setTrackCount(counter);
			setCurrentSong(songs[counter]);
			console.log(trackCount);
			//console.log(currentSong);
		}
	};

	useEffect(() => {
		if (isMobile) {
			setMaximized(true);
		}
	}, []);

	useEffect(() => {
		if (audioRef.current !== null) {
			audioRef.current.play();
		}
	}, [currentSong]);

	//if (!maximized) {
	return (
		<Draggable>
			<div
				className={musicPlayerClass}
				tabIndex={0}
				onFocus={focusMusicPlayer}
				onBlur={blurMusicPlayer}
			>
				<div className="windowBar">
					<div
						className="windowButtons minimize"
						onClick={closeMusicPlayer}
					></div>
					<div
						className="windowButtons maximize"
						onClick={nextTrack}
					></div>
					<div
						className="windowButtons close"
						onClick={closeMusicPlayer}
					></div>
				</div>

				<div id="music-player">
					<div id="gallery">
						<img
							id="album-cover"
							src={albumCover}
							alt="Album Cover"
						/>
					</div>
					<div id="lyrics-controls">
						<div id="lyrics">
							<p>{currentSong.lyrics}</p>
						</div>
						<audio ref={audioRef} src={currentSong.song} />
						<div id="controls">
							<span
								className="material-icons"
								onClick={prevTrack}
							>
								skip_previous
							</span>
							<span
								className="material-icons"
								onClick={() => {
									if (audioRef.current !== null) {
										audioRef.current.play();
									}
								}}
							>
								play_circle
							</span>
							<span
								className="material-icons"
								onClick={nextTrack}
							>
								skip_next
							</span>
						</div>
					</div>
				</div>
			</div>
		</Draggable>
	);
	// } else if (maximized) {
	// 	return (
	// 		<div className="maximized">
	// 			<div className="windowBar">
	// 				<div
	// 					className="windowButtons minimize"
	// 					onClick={closeMusicPlayer}
	// 				></div>
	// 				<div
	// 					className="windowButtons maximize"
	// 					onClick={setMax}
	// 				></div>
	// 				<div
	// 					className="windowButtons close"
	// 					onClick={closeMusicPlayer}
	// 				></div>
	// 			</div>
	// 			<embed
	// 				id="MusicPlayerPage"
	// 				src={MusicPlayer}
	// 				type="application/pdf"
	// 			/>
	// 		</div>
	// 	);
	// }
};

export default MusicPlayer;
