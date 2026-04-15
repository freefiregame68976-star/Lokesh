import React, { useState } from 'react';
import { motion } from 'motion/react';
import { SnakeGame } from './components/SnakeGame';
import { MusicPlayer } from './components/MusicPlayer';
import { Track } from './types';
import { Trophy, Music, Gamepad2 } from 'lucide-react';

const DUMMY_TRACKS: Track[] = [
  {
    id: '1',
    title: 'Cyber Pulse',
    artist: 'AI-01 Synth',
    url: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3',
    cover: 'https://picsum.photos/seed/cyber/400/400',
    color: '#00f2ff', // Neon Cyan
  },
  {
    id: '2',
    title: 'Magenta Drift',
    artist: 'AI-02 Wave',
    url: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-2.mp3',
    cover: 'https://picsum.photos/seed/magenta/400/400',
    color: '#ff00ff', // Neon Magenta
  },
  {
    id: '3',
    title: 'Emerald Grid',
    artist: 'AI-03 Core',
    url: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-3.mp3',
    cover: 'https://picsum.photos/seed/emerald/400/400',
    color: '#00ff66', // Neon Green
  },
];

export default function App() {
  const [score, setScore] = useState(0);
  const [highScore, setHighScore] = useState(0);
  const [currentTrack, setCurrentTrack] = useState<Track>(DUMMY_TRACKS[0]);

  const handleScoreChange = (newScore: number) => {
    setScore(newScore);
    if (newScore > highScore) {
      setHighScore(newScore);
    }
  };

  return (
    <div className="min-h-screen bg-[#050505] text-white font-sans selection:bg-white selection:text-black overflow-hidden flex flex-col">
      {/* Background Glow */}
      <div 
        className="fixed inset-0 pointer-events-none transition-colors duration-1000 opacity-20 blur-[120px]"
        style={{ 
          background: `radial-gradient(circle at 50% 50%, ${currentTrack.color} 0%, transparent 70%)` 
        }}
      />

      {/* Header */}
      <header className="relative z-10 px-8 py-6 flex justify-between items-center border-b border-white/5 backdrop-blur-md bg-black/20">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-lg bg-white flex items-center justify-center text-black">
            <Gamepad2 size={24} />
          </div>
          <div>
            <h1 className="text-xl font-black tracking-tighter uppercase">Neon Rhythm</h1>
            <p className="text-[10px] text-white/40 uppercase tracking-[0.3em] font-medium">Arcade x Audio</p>
          </div>
        </div>

        <div className="flex items-center gap-12">
          <div className="text-right">
            <p className="text-[10px] text-white/40 uppercase tracking-widest mb-1">Current Score</p>
            <motion.p 
              key={score}
              initial={{ scale: 1.2, color: currentTrack.color }}
              animate={{ scale: 1, color: '#fff' }}
              className="text-4xl font-digital font-black leading-none glitch-text"
            >
              {score.toString().padStart(4, '0')}
            </motion.p>
          </div>
          <div className="h-12 w-px bg-white/10" />
          <div className="text-right">
            <p className="text-[10px] text-white/40 uppercase tracking-widest mb-1">High Score</p>
            <div className="flex items-center gap-3 justify-end">
              <Trophy size={20} className="text-yellow-500" />
              <p className="text-4xl font-digital font-black leading-none glitch-text">
                {highScore.toString().padStart(4, '0')}
              </p>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="relative z-10 flex-1 flex flex-col lg:flex-row items-center justify-center gap-12 p-8">
        {/* Left Side: Info/Visualizer (Desktop) */}
        <div className="hidden xl:flex flex-col gap-8 w-64">
          <div className="p-6 rounded-2xl bg-white/5 border border-white/5">
            <h4 className="text-xs font-bold uppercase tracking-widest text-white/40 mb-4 flex items-center gap-2">
              <Music size={14} /> Now Playing
            </h4>
            <div className="space-y-1">
              <p className="font-bold text-lg leading-tight">{currentTrack.title}</p>
              <p className="text-sm text-white/40 uppercase tracking-wider">{currentTrack.artist}</p>
            </div>
          </div>
          
          <div className="space-y-4">
            <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-white/20">Controls</p>
            <div className="grid grid-cols-2 gap-2">
              {['Arrows', 'Move', 'Space', 'Pause'].map((text, i) => (
                <div key={i} className={`p-2 rounded-lg border border-white/5 text-[10px] uppercase font-bold text-center ${i % 2 === 0 ? 'bg-white/5 text-white/60' : 'text-white/30'}`}>
                  {text}
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Center: Game */}
        <motion.div 
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          className="relative"
        >
          <SnakeGame onScoreChange={handleScoreChange} neonColor={currentTrack.color} />
          
          {/* Decorative Elements */}
          <div className="absolute -top-4 -left-4 w-8 h-8 border-t-2 border-l-2 border-white/20 rounded-tl-xl" />
          <div className="absolute -top-4 -right-4 w-8 h-8 border-t-2 border-r-2 border-white/20 rounded-tr-xl" />
          <div className="absolute -bottom-4 -left-4 w-8 h-8 border-b-2 border-l-2 border-white/20 rounded-bl-xl" />
          <div className="absolute -bottom-4 -right-4 w-8 h-8 border-b-2 border-r-2 border-white/20 rounded-br-xl" />
        </motion.div>

        {/* Bottom/Right: Player */}
        <motion.div
          initial={{ x: 20, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ delay: 0.2 }}
        >
          <MusicPlayer tracks={DUMMY_TRACKS} onTrackChange={setCurrentTrack} />
        </motion.div>
      </main>

      {/* Footer */}
      <footer className="relative z-10 px-8 py-4 flex justify-between items-center text-[10px] text-white/20 uppercase tracking-[0.3em] font-bold border-t border-white/5">
        <p>© 2026 Neon Rhythm Arcade</p>
        <div className="flex gap-6">
          <span className="hover:text-white/60 cursor-pointer transition-colors">System Status: Optimal</span>
          <span className="hover:text-white/60 cursor-pointer transition-colors">Audio Engine: Active</span>
        </div>
      </footer>
    </div>
  );
}
