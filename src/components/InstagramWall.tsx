import React from 'react';
import { Trophy, Flame, Heart, MessageCircle, ExternalLink } from 'lucide-react';
import { InstagramIcon } from './Icons';
import { soundFx } from '../utils/soundEngine';

interface InstagramPost {
  id: string;
  type: 'reel' | 'photo';
  caption: string;
  likes: string;
  comments: string;
  tag: string;
  image: string;
}

const instaPosts: InstagramPost[] = [
  {
    id: 'post1',
    type: 'reel',
    caption: 'Pure sunset sparks at Turn 14! Who is challenging this 54.212s lap record this weekend? 🏁🔥 #VelocityBangalore #GoKarting',
    likes: '4.8k',
    comments: '241',
    tag: '@velocity_international',
    image: '/images/hero_racing_kart.jpg',
  },
  {
    id: 'post2',
    type: 'photo',
    caption: '6 AM Dawn Track session hits different. Knee dragging with Bengaluru’s finest superbikes on our 1166m asphalt 🌅🏍️',
    likes: '6.2k',
    comments: '389',
    tag: '#BikersOfBangalore',
    image: '/images/bike_track_sunrise.jpg',
  },
  {
    id: 'post3',
    type: 'photo',
    caption: 'Podium celebrations at Apex Rooftop! Champagne showers, smash burgers & live racing under the floodlights 🏆🍔',
    likes: '3.9k',
    comments: '184',
    tag: '#ApexCafeHoskote',
    image: '/images/velocity_cafe_lifestyle.jpg',
  },
  {
    id: 'post4',
    type: 'reel',
    caption: 'Fresh fleet of SODI RT8 270cc Beasts lined up in the paddock. Ready for full throttle action? 🏎️💨',
    likes: '5.1k',
    comments: '312',
    tag: '#SodiKartsIndia',
    image: '/images/kart_fleet_garage.jpg',
  },
];

const weeklyLeaderboard = [
  { rank: 1, name: 'Arjun "Apex" Rao', kart: 'SODI RT8 270', time: '00:54.212', gap: 'LEADER' },
  { rank: 2, name: 'Vikramaditya S.', kart: 'SODI RT8 270', time: '00:54.648', gap: '+0.436s' },
  { rank: 3, name: 'Nisha "Nitro" Patel', kart: 'TEEN SODI 200', time: '00:55.109', gap: '+0.897s' },
  { rank: 4, name: 'Rohan Mehra', kart: 'SODI RT8 270', time: '00:55.450', gap: '+1.238s' },
  { rank: 5, name: 'Deepak & Tanvi', kart: '2-SEATER TANDEM', time: '00:58.320', gap: '+4.108s' },
];

export const InstagramWall: React.FC = () => {
  return (
    <section id="leaderboard" className="py-20 lg:py-28 px-4 sm:px-6 lg:px-8 max-w-[1480px] mx-auto w-full">
      <div className="space-y-12">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div className="space-y-3">
            <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-blue-50 border border-blue-200 text-xs font-mono font-semibold uppercase tracking-wider text-[#0052FF]">
              <span className="w-2 h-2 rounded-full bg-[#0052FF]" />
              <span>Community & Telemetry Leaderboard</span>
            </div>
            <h2 className="text-3xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-slate-900 leading-tight">
              Track Highlights & <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#0052FF] to-[#2563EB]">Fastest Drivers</span>
            </h2>
            <p className="text-sm text-slate-600 max-w-xl font-sans leading-relaxed">
              Tag @velocity_international in your track reels to be featured on our giant pit screens and win monthly lap vouchers.
            </p>
          </div>

          <a
            href="https://instagram.com/velocity_international"
            target="_blank"
            rel="noopener noreferrer"
            onClick={() => soundFx.playRev(1.0)}
            className="inline-flex items-center gap-2 px-6 py-3.5 rounded-full bg-gradient-to-r from-[#0052FF] to-[#2563EB] hover:brightness-110 text-white font-bold text-xs sm:text-sm uppercase tracking-wider shadow-lg shadow-blue-600/30 transition-all cursor-pointer shrink-0"
          >
            <InstagramIcon className="w-4 h-4 text-white" />
            <span>Follow @velocity_international</span>
            <ExternalLink className="w-3.5 h-3.5 text-white/80" />
          </a>
        </div>

        {/* Grid: Instagram Reels Feed + Weekly Leaderboard */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start w-full">
          {/* Left: Instagram Feed Cards */}
          <div className="lg:col-span-7 grid grid-cols-1 sm:grid-cols-2 gap-4 w-full">
            {instaPosts.map((post) => (
              <a
                key={post.id}
                href="https://instagram.com/velocity_international"
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => soundFx.playGearShift()}
                className="group relative rounded-[28px] overflow-hidden bg-white border border-slate-200 shadow-md hover:shadow-lg transition-all duration-300 block w-full"
              >
                {/* Image */}
                <div className="relative aspect-[4/3] overflow-hidden w-full bg-slate-100">
                  <img
                    src={post.image}
                    alt={post.caption}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 filter contrast-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent opacity-60" />

                  {/* Instagram icon badge */}
                  <div className="absolute top-3 right-3 w-8 h-8 rounded-full bg-black/70 backdrop-blur-md flex items-center justify-center text-white border border-white/20">
                    <InstagramIcon className="w-4 h-4 text-white" />
                  </div>
                </div>

                {/* Caption & Stats */}
                <div className="p-5 space-y-2 bg-white">
                  <div className="flex items-center justify-between text-xs font-mono text-slate-500">
                    <span className="text-[#0052FF] font-medium">{post.tag}</span>
                    <div className="flex items-center gap-3">
                      <span className="flex items-center gap-1">
                        <Heart className="w-3.5 h-3.5 text-rose-500 fill-rose-500" />
                        <span className="text-slate-800 font-semibold">{post.likes}</span>
                      </span>
                      <span className="flex items-center gap-1">
                        <MessageCircle className="w-3.5 h-3.5 text-slate-400" />
                        <span className="text-slate-800 font-semibold">{post.comments}</span>
                      </span>
                    </div>
                  </div>
                  <p className="text-xs text-slate-600 line-clamp-2 font-sans leading-relaxed">
                    {post.caption}
                  </p>
                </div>
              </a>
            ))}
          </div>

          {/* Right: Bangalore Weekly Lap Record Leaderboard */}
          <div className="lg:col-span-5 rounded-[32px] p-2 bg-gradient-to-b from-slate-200/80 via-slate-100 to-white border border-slate-200 shadow-xl w-full">
            <div className="rounded-[24px] bg-white p-6 sm:p-7 border border-slate-200 space-y-4 shadow-sm">
              <div className="flex items-center justify-between pb-4 border-b border-slate-200">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-2xl bg-blue-50 border border-blue-200 flex items-center justify-center text-[#0052FF]">
                    <Trophy className="w-5 h-5 text-[#0052FF]" />
                  </div>
                  <div>
                    <h3 className="font-bold text-lg text-slate-900 tracking-tight">
                      Weekly Hotlaps
                    </h3>
                    <div className="text-[11px] font-mono text-slate-500">
                      1,166M Track • Bangalore Top 5
                    </div>
                  </div>
                </div>
              </div>

              {/* Leaderboard Table List */}
              <div className="space-y-2.5">
                {weeklyLeaderboard.map((entry) => (
                  <div
                    key={entry.rank}
                    className={`p-3.5 rounded-2xl flex items-center justify-between border transition-all ${
                      entry.rank === 1
                        ? 'bg-blue-50 border-blue-200 text-slate-900 shadow-sm'
                        : 'bg-slate-50 border-slate-200 text-slate-700 hover:border-slate-300'
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      {/* Rank Badge */}
                      <div className={`w-7 h-7 rounded-full flex items-center justify-center font-bold text-xs ${
                        entry.rank === 1
                          ? 'bg-gradient-to-br from-[#0052FF] to-[#1d4ed8] text-white shadow-md'
                          : 'bg-slate-200 text-slate-700'
                      }`}>
                        {entry.rank}
                      </div>

                      <div>
                        <div className="font-semibold text-xs sm:text-sm flex items-center gap-1.5 text-slate-900">
                          <span>{entry.name}</span>
                          {entry.rank === 1 && <Flame className="w-3.5 h-3.5 text-[#0052FF] fill-[#0052FF]" />}
                        </div>
                        <div className="text-[10px] font-mono text-slate-500">
                          {entry.kart}
                        </div>
                      </div>
                    </div>

                    <div className="text-right">
                      <div className={`font-mono font-bold text-sm ${
                        entry.rank === 1 ? 'text-[#0052FF]' : 'text-slate-900'
                      }`}>
                        {entry.time}
                      </div>
                      <div className="text-[10px] font-mono text-slate-500">
                        {entry.gap}
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {/* Bottom Challenge Banner */}
              <div className="mt-4 p-4 rounded-2xl bg-slate-50 border border-slate-200 text-center space-y-1">
                <div className="text-xs font-sans text-slate-600">
                  Think you have faster reflexes?
                </div>
                <div className="font-bold text-xs text-slate-900 uppercase tracking-wider">
                  Beat 00:54.212s & Win a Free 1-Month Paddock Pass
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
