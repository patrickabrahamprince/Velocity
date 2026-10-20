import React, { useState } from 'react';
import { Tag, Sparkles, Check, Flame, ChevronRight, Zap, Users, Gift, Percent } from 'lucide-react';

interface LocoOffersSectionProps {
  onSelectOffer: (offerName: string, offerPrice: string) => void;
}

export function LocoOffersSection({ onSelectOffer }: LocoOffersSectionProps) {
  const [driverCount, setDriverCount] = useState<number>(4);

  const offers = [
    {
      id: 'speed-feast',
      title: 'The Adrenaline Speed & Feast',
      discountBadge: 'SAVE 30%',
      badgeColor: '#ff3366',
      price: '₹999',
      originalPrice: '₹1,450',
      description: 'The ultimate karting + dinner combo for individuals & pairs.',
      includes: [
        '10 Laps on 1166M Track (Honda 4-Stroke 270cc)',
        'Gourmet Smash Burger or Artisanal Pizza Slice at Apex Cafe',
        'Chilled Red Bull or High-Protein Milkshake',
        'Official Transponder RFID Lap Timing Printout'
      ],
      popular: true
    },
    {
      id: 'family-duo',
      title: 'Family Adrenaline Duo Pack',
      discountBadge: 'FAMILY SPECIAL',
      badgeColor: '#00f0ff',
      price: '₹1,299',
      originalPrice: '₹1,750',
      description: 'Designed specifically for parents with kids looking for a thrilling weekend outing.',
      includes: [
        '10 Laps in 2-Seater Tandem Kart (Parent + Child)',
        '2x Cold-Pressed Fruit Juices or Shakes at Apex Rooftop Cafe',
        'Podium Photo Celebration with Winner Cap',
        'Complimentary ₹200 Return Voucher for your next visit'
      ],
      popular: false
    },
    {
      id: 'night-glow',
      title: 'Night Owl Stadium Floodlight GP',
      discountBadge: 'SAVE 35%',
      badgeColor: '#feb000',
      price: '₹899',
      originalPrice: '₹1,399',
      description: 'Experience 1166m of asphalt illuminated by high-lux sports arena floodlights post 7 PM.',
      includes: [
        '15 Full Laps under high-intensity floodlights',
        'Cooler night air offering maximum engine horsepower',
        'Glow-in-the-dark track visor sticker',
        'Complimentary Belgian Waffle or Hot Cocoa'
      ],
      popular: false
    },
    {
      id: 'squad-cup',
      title: 'Squad Championship Cup (10+ Drivers)',
      discountBadge: 'BULK GROUP DEAL',
      badgeColor: '#ff3366',
      price: '₹1,699',
      priceUnit: '/ racer',
      originalPrice: '₹2,300',
      description: 'Turn your friends or colleagues into F1 contenders with qualifiers and podium trophies.',
      includes: [
        '5 Lap Practice + 5 Lap Qualifier + 10 Lap Feature Race',
        'F1 Standing Grid Start with real starting gantry lights',
        '1st, 2nd & 3rd Place Custom Engraved Trophies',
        'Full Paddock Buffet & Refreshment Station'
      ],
      popular: false
    }
  ];

  // Calculate instant group savings
  const baseCostPerPerson = 1200;
  const bulkCostPerPerson = driverCount >= 10 ? 850 : driverCount >= 5 ? 950 : 1050;
  const totalEstimatedCost = driverCount * bulkCostPerPerson;
  const totalSavings = (driverCount * baseCostPerPerson) - totalEstimatedCost;

  return (
    <section id="offers" className="py-24 bg-[#090d16] border-y border-white/5 relative overflow-hidden">
      {/* Background Decor */}
      <div className="absolute top-0 right-1/4 w-96 h-96 bg-[#feb000]/5 rounded-full blur-[140px] pointer-events-none" />
      <div className="absolute bottom-0 left-1/4 w-96 h-96 bg-[#00f0ff]/5 rounded-full blur-[140px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 relative z-10">
        {/* Section Title (Loco Bear Style) */}
        <div className="text-center max-w-3xl mx-auto mb-14">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#ff3366]/10 border border-[#ff3366]/30 text-[#ff3366] text-xs font-black uppercase tracking-wider mb-4">
            <Percent className="w-3.5 h-3.5" />
            <span>Unbelievable Offers</span>
          </div>
          <h2 className="font-bison text-4xl sm:text-6xl md:text-7xl text-white font-black uppercase tracking-tight">
            Unbelievable <span className="text-[#feb000]">Offers & Combos</span>
          </h2>
          <p className="mt-4 text-slate-300 text-sm sm:text-base leading-relaxed">
            Exclusive online discounts, combo passes with gourmet cafe treats, and group packages that guarantee maximum adrenaline for your money.
          </p>
        </div>

        {/* 4 Offer Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
          {offers.map((offer) => (
            <div
              key={offer.id}
              className={`loco-card p-6 flex flex-col justify-between relative transition-all duration-300 ${
                offer.popular ? 'border-[#feb000] shadow-[0_10px_30px_rgba(254,176,0,0.2)]' : ''
              }`}
            >
              {/* Discount Badge */}
              <div
                className="absolute top-4 right-4 px-2.5 py-1 rounded-md text-[10px] font-black uppercase tracking-wider text-black shadow-md"
                style={{ backgroundColor: offer.badgeColor }}
              >
                {offer.discountBadge}
              </div>

              <div>
                {offer.popular && (
                  <div className="flex items-center gap-1 text-[11px] font-extrabold uppercase text-[#feb000] tracking-wider mb-2">
                    <Sparkles className="w-3.5 h-3.5" />
                    <span>Most Popular</span>
                  </div>
                )}

                <h3 className="font-bison text-2xl text-white font-black uppercase tracking-wide mb-2">
                  {offer.title}
                </h3>
                <p className="text-xs text-slate-400 mb-5 leading-relaxed">
                  {offer.description}
                </p>

                {/* Price Display */}
                <div className="flex items-baseline gap-2.5 p-3 rounded-xl bg-black/40 border border-white/5 mb-6">
                  <span className="font-bison text-3xl font-black text-[#feb000]">
                    {offer.price}
                  </span>
                  {offer.priceUnit && (
                    <span className="text-xs text-slate-400 font-bold">{offer.priceUnit}</span>
                  )}
                  <span className="text-xs text-slate-500 line-through font-semibold">
                    {offer.originalPrice}
                  </span>
                </div>

                {/* Offer Inclusions */}
                <ul className="space-y-2 mb-6">
                  {offer.includes.map((inc, i) => (
                    <li key={i} className="flex items-start gap-2 text-xs text-slate-200">
                      <Check className="w-3.5 h-3.5 text-[#feb000] shrink-0 mt-0.5" />
                      <span>{inc}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <button
                onClick={() => onSelectOffer(offer.title, offer.price)}
                className="w-full py-3 rounded-xl bg-[#feb000] hover:bg-[#fcd107] text-black font-extrabold text-xs uppercase tracking-wider transition-all duration-200 flex items-center justify-center gap-1.5 shadow-md cursor-pointer"
              >
                <Flame className="w-4 h-4 fill-current" />
                <span>Claim This Offer</span>
              </button>
            </div>
          ))}
        </div>

        {/* Interactive Group Savings Calculator (Loco Bear Style) */}
        <div className="p-8 sm:p-10 rounded-3xl bg-[#0d121d] border-2 border-[#feb000]/40 shadow-2xl">
          <div className="flex flex-col lg:flex-row items-center justify-between gap-8">
            <div className="space-y-2 max-w-xl text-center lg:text-left">
              <span className="px-3 py-1 rounded-full text-xs font-black uppercase tracking-wider bg-[#feb000]/20 text-[#feb000] border border-[#feb000]/30">
                ⚡ Interactive Group Estimator
              </span>
              <h3 className="font-bison text-3xl sm:text-4xl text-white font-black uppercase tracking-wide">
                Bringing Your Squad? Drag to Calculate Your Savings!
              </h3>
              <p className="text-sm text-slate-300">
                Groups of 5+ unlock automatic tiered discounts on track sessions, cafe vouchers, and reserved grid spots.
              </p>
            </div>

            <div className="w-full lg:w-96 bg-black/60 border border-white/10 rounded-2xl p-6 flex flex-col gap-4">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">Number of Racers:</span>
                <span className="font-bison text-3xl text-[#feb000] font-black">{driverCount} Racers</span>
              </div>

              {/* Slider */}
              <input
                type="range"
                min="2"
                max="25"
                value={driverCount}
                onChange={(e) => setDriverCount(parseInt(e.target.value))}
                className="w-full accent-[#feb000] h-2 bg-slate-800 rounded-lg cursor-pointer"
              />

              <div className="pt-3 border-t border-white/10 flex items-center justify-between">
                <div>
                  <span className="text-[11px] text-slate-400 block uppercase font-bold">Estimated Total</span>
                  <span className="font-bison text-2xl text-white font-black">₹{totalEstimatedCost.toLocaleString()}</span>
                </div>
                <div className="text-right">
                  <span className="text-[11px] text-emerald-400 block uppercase font-bold">You Save</span>
                  <span className="font-bison text-2xl text-emerald-400 font-black">₹{totalSavings.toLocaleString()}</span>
                </div>
              </div>

              <button
                onClick={() => onSelectOffer(`Squad Pass for ${driverCount} Racers`, `₹${totalEstimatedCost}`)}
                className="w-full py-3 rounded-xl bg-[#feb000] hover:bg-[#fcd107] text-black font-extrabold text-xs uppercase tracking-wider transition-all flex items-center justify-center gap-2 cursor-pointer shadow-lg"
              >
                <span>Reserve for {driverCount} Drivers</span>
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
