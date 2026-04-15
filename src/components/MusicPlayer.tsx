import React, { useState, useRef, useEffect } from 'react';
import { motion } from 'motion/react';
import { Play, Pause, SkipBack, SkipForward, Volume2, Music2 } from 'lucide-react';
import { Track } from '../types';

interface MusicPlayerProps {
  tracks: Track[];
  onTrackChange: (track: Track) => void;
}

export const MusicPlayer: React.FC<MusicPlayerProps> = ({ tracks, onTrackChange }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [progress, setProgress] = useState(0);
  const audioRef = useRef<HTMLAudioElement>(null);

  const currentTrack = tracks[currentIndex];

  useEffect(() => {
    onTrackChange(currentTrack);
  }, [currentIndex, currentTrack, onTrackChange]);

  const togglePlay = () => {
    if (isPlaying) {
      audioRef.current?.pause();
    } else {
      audioRef.current?.play();
    }
    setIsPlaying(!isPlaying);
  };

  const skipForward = () => {
    setCurrentIndex((prev) => (prev + 1) % tracks.length);
    setIsPlaying(true);
  };

  const skipBackward = () => {
    setCurrentIndex((prev) => (prev - 1 + tracks.length) % tracks.length);
    setIsPlaying(true);
  };

  const handleTimeUpdate = () => {
    if (audioRef.current) {
      const p = (audioRef.current.currentTime / audioRef.current.duration) * 100;
      setProgress(p || 0);
    }
  };

  const handleEnded = () => {
    skipForward();
  };

  return (
    <div className="w-full max-w-md bg-[#151619] border border-white/10 rounded-3xl p-6 shadow-2xl">
      <audio
        ref={audioRef}
        src={currentTrack.url}
        onTimeUpdate={handleTimeUpdate}
        onEnded={handleEnded}
        autoPlay={isPlaying}
      />

      <div className="flex items-center gap-6 mb-8">
        <motion.div
          key={currentTrack.id}
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          className="w-24 h-24 rounded-2xl overflow-hidden shadow-lg shadow-black/50 border border-white/5"
        >
          <img
            src={currentTrack.cover}
            alt={currentTrack.title}
            className="w-full h-full object-cover"
            referrerPolicy="no-referrer"
          />
        </motion.div>

        <div className="flex-1 min-w-0">
          <motion.h3
            key={currentTrack.title}
            initial={{ y: 10, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            className="text-xl font-bold text-white truncate tracking-tight"
          >
            {currentTrack.title}
          </motion.h3>
          <motion.p
            key={currentTrack.artist}
            initial={{ y: 10, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.1 }}
            className="text-white/40 text-sm font-medium uppercase tracking-widest"
          >
            {currentTrack.artist}
          </motion.p>
        </div>
      </div>

      {/* Progress Bar */}
      <div className="mb-8">
        <div className="h-1 w-full bg-white/5 rounded-full overflow-hidden">
          <motion.div
            className="h-full"
            style={{ backgroundColor: currentTrack.color, width: `${progress}%` }}
            animate={{ width: `${progress}%` }}
            transition={{ type: 'spring', bounce: 0, duration: 0.5 }}
          />
        </div>
        <div className="flex justify-between mt-2">
          <span className="text-[10px] font-mono text-white/20 uppercase tracking-tighter">00:00</span>
          <span className="text-[10px] font-mono text-white/20 uppercase tracking-tighter">03:45</span>
        </div>
      </div>

      {/* Controls */}
      <div className="flex items-center justify-between">
        <button className="p-2 text-white/20 hover:text-white transition-colors">
          <Volume2 size={20} />
        </button>

        <div className="flex items-center gap-6">
          <button
            onClick={skipBackward}
            className="p-2 text-white/40 hover:text-white transition-colors active:scale-90"
          >
            <SkipBack size={24} fill="currentColor" />
          </button>

          <button
            onClick={togglePlay}
            className="w-16 h-16 rounded-full flex items-center justify-center bg-white text-black hover:scale-105 transition-transform active:scale-95 shadow-xl shadow-white/10"
          >
            {isPlaying ? <Pause size={28} fill="currentColor" /> : <Play size={28} fill="currentColor" className="ml-1" />}
          </button>

          <button
            onClick={skipForward}
            className="p-2 text-white/40 hover:text-white transition-colors active:scale-90"
          >
            <SkipForward size={24} fill="currentColor" />
          </button>
        </div>

        <button className="p-2 text-white/20 hover:text-white transition-colors">
          <Music2 size={20} />
        </button>
      </div>
    </div>
  );
};
