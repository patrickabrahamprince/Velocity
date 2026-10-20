import React, { useState } from 'react';
import { ChevronDown, HelpCircle } from 'lucide-react';
import { soundFx } from '../utils/soundEngine';

export interface FaqItem {
  id: string;
  question: string;
  answer: string;
  category: 'Family & Kids' | 'Track & Racing' | 'Pricing & Offers' | 'Bikers & Track Days' | 'Safety & Rules';
}

export const faqData: FaqItem[] = [
  {
    id: 'why-book-online',
    category: 'Pricing & Offers',
    question: 'Why should I book online on the website instead of buying tickets at the counter?',
    answer: 'Booking on the website offers 4 major benefits: (1) Instant ₹200 discount using promo code VELOCITY200, (2) Fast-track entry to skip weekend waiting lines of 45–90 minutes, (3) Automatic sync with track transponders to receive your official lap sheet and speed rankings on WhatsApp, and (4) An instant ₹200 repeat racer voucher on your phone for future visits.',
  },
  {
    id: 'repeat-rewards',
    category: 'Pricing & Offers',
    question: 'How do the ₹200 repeat vouchers and loyalty points work?',
    answer: 'Every online booking connects your WhatsApp phone number to your personal Velocity Driver profile. After every completed race session, you automatically receive a private ₹200 discount code to use on your next visit (or share with friends) plus 150 Velocity Coins redeemable for free laps and rooftop cafe meals.',
  },
  {
    id: 'track-length',
    category: 'Track & Racing',
    question: 'What is India’s biggest go-karting track?',
    answer: 'Velocity International Circuit in Hoskote, Bangalore is India’s biggest outdoor go-karting track with an FIA-standard length of 1,166 meters (1.166 km), featuring 19 technical apex corners, a 160m high-speed main straightaway, and +4.2m elevation change.',
  },
  {
    id: 'pricing-packages',
    category: 'Pricing & Offers',
    question: 'How much does go-karting cost at Velocity International Circuit?',
    answer: 'Pricing starts at ₹299 (+ 18% Tax) for the 5-Lap Student Special (Mon–Fri 9 AM–6 PM with valid Student ID). The 8-Lap Weekday Thrill is ₹499 (+ Tax), and the 10-Lap All-Days GP (valid all days including weekends) is ₹699 (+ Tax). Kart + Food Combos start at ₹399 with a Mojito & snacks included.',
  },
  {
    id: 'bike-track-days',
    category: 'Bikers & Track Days',
    question: 'Can I ride my superbike or motorcycle on the track?',
    answer: 'Yes! Velocity hosts the Bike Ride Dawn Track Session every morning from 06:00 AM to 10:00 AM. For ₹1,500 (+ Tax), motorcyclists get 4 hours of unlimited open track access for 300cc–1000cc+ bikes, along with a complimentary Protein Breakfast (Bread Omelet / Veg Sandwich) and fresh Cappuccino at the Apex Rooftop Cafe. Full riding gear is mandatory.',
  },
  {
    id: 'timing-location',
    category: 'Track & Racing',
    question: 'Where is Velocity International Circuit located and what are the operating hours?',
    answer: 'The circuit is located at Solur Village, Near NH-75 Highway, Hoskote, Bengaluru (~25 minutes from Whitefield/ITPL). The track is open daily from 06:00 AM to 11:30 PM under stadium-grade floodlights for night racing.',
  },
  {
    id: 'student-discount',
    category: 'Pricing & Offers',
    question: 'Are there student discounts for go-karting in Bangalore?',
    answer: 'Yes, students with a valid original physical or digital student ID card get 5 high-speed laps on the 1166m track for just ₹299 (+ Tax) Monday through Friday from 9:00 AM to 6:00 PM.',
  },
  {
    id: 'safety-gear',
    category: 'Safety & Rules',
    question: 'What safety gear is provided and what are the age/height requirements?',
    answer: 'Every racer receives a sanitized DOT-certified full-face helmet and hygienic balaclava. Drivers must be at least 12 years old (minimum height 4’6” / 137cm). Closed-toe shoes (sneakers) are mandatory. Twin-seater tandem karts are available for adults racing with younger children (ages 4+).',
  },
  {
    id: 'corporate-birthday',
    category: 'Pricing & Offers',
    question: 'Can we book Velocity for corporate team outings or birthday Grand Prix events?',
    answer: 'Yes! The Corporate & Birthday GP package is ₹999 (+ Tax per person for min 20 participants), including 8 flying laps per driver, a customized gourmet buffet at the Apex Cafe, exclusive pit lane access, race marshals, and a podium trophy presentation with champagne celebrations.',
  },
  {
    id: 'family-tandem',
    category: 'Family & Kids',
    question: 'Can young kids experience go-karting with their parents?',
    answer: 'Yes! Velocity offers specialized 2-Seater Tandem Go-Karts designed specifically for parents and young children (ages 4–11). The parent controls the pedals and main steering while the child sits safely in the co-pilot seat with a dual 4-point racing harness, full steel roll cage protection, and a passenger steering wheel.',
  },
];

export const FaqSection: React.FC = () => {
  const [openId, setOpenId] = useState<string | null>(faqData[0].id);
  const [selectedCat, setSelectedCat] = useState<string>('All');

  const categories = ['All', 'Pricing & Offers', 'Track & Racing', 'Family & Kids', 'Bikers & Track Days', 'Safety & Rules'];

  const filteredFaqs = selectedCat === 'All'
    ? faqData
    : faqData.filter((item) => item.category === selectedCat);

  const toggleFaq = (id: string) => {
    soundFx.playGearShift();
    setOpenId(openId === id ? null : id);
  };

  return (
    <section id="faq" className="py-20 lg:py-28 px-4 sm:px-6 lg:px-8 max-w-5xl mx-auto w-full">
      <div className="space-y-12">
        {/* Section Header */}
        <div className="text-center space-y-3 max-w-2xl mx-auto">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-blue-50 border border-blue-200 text-xs font-mono font-semibold uppercase tracking-wider text-[#0052FF]">
            <HelpCircle className="w-3.5 h-3.5 text-[#0052FF]" />
            <span>Frequently Asked Questions</span>
          </div>

          <h2 className="text-3xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-slate-900 leading-tight">
            Track Intel & <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#0052FF] to-[#2563EB]">Racer Guide</span>
          </h2>

          <p className="text-sm text-slate-600 font-sans leading-relaxed">
            Everything you need to know about track specs, prices, timing, safety rules, and booking your race in Hoskote, Bangalore.
          </p>
        </div>

        {/* Category Filter Pills */}
        <div className="flex flex-wrap items-center justify-center gap-2">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => {
                soundFx.playGearShift();
                setSelectedCat(cat);
              }}
              className={`px-4 py-2 rounded-full text-xs font-mono uppercase tracking-wider transition-all cursor-pointer ${
                selectedCat === cat
                  ? 'bg-gradient-to-r from-[#0052FF] to-[#2563EB] text-white font-bold shadow-md shadow-blue-600/30'
                  : 'bg-slate-100 hover:bg-slate-200 text-slate-700 border border-slate-200'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Accordion List */}
        <div className="space-y-3">
          {filteredFaqs.map((faq) => {
            const isOpen = openId === faq.id;
            return (
              <div
                key={faq.id}
                className={`rounded-2xl border transition-all overflow-hidden ${
                  isOpen
                    ? 'bg-white border-blue-200 shadow-md'
                    : 'bg-slate-50 border-slate-200 hover:border-slate-300'
                }`}
              >
                <button
                  onClick={() => toggleFaq(faq.id)}
                  className="w-full p-5 sm:p-6 text-left flex items-center justify-between gap-4 cursor-pointer"
                  aria-expanded={isOpen}
                >
                  <div className="flex items-center gap-3.5">
                    <div
                      className={`w-7 h-7 rounded-xl flex items-center justify-center text-xs font-mono font-bold shrink-0 transition-colors ${
                        isOpen ? 'bg-[#0052FF] text-white shadow-md shadow-blue-600/30' : 'bg-slate-200 text-slate-700'
                      }`}
                    >
                      Q
                    </div>
                    <span className="font-semibold text-sm sm:text-base text-slate-900 leading-snug">
                      {faq.question}
                    </span>
                  </div>

                  <ChevronDown
                    className={`w-4 h-4 text-slate-400 shrink-0 transition-transform duration-200 ${
                      isOpen ? 'rotate-180 text-[#0052FF]' : ''
                    }`}
                  />
                </button>

                {isOpen && (
                  <div className="px-5 pb-6 sm:px-6 pt-0 text-xs sm:text-sm text-slate-600 font-sans leading-relaxed border-t border-slate-200 mt-1 pt-4">
                    <p>{faq.answer}</p>
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {/* Quick Contact Hotline Callout */}
        <div className="rounded-[28px] p-2 bg-gradient-to-b from-slate-200/80 via-slate-100 to-white border border-slate-200 shadow-lg">
          <div className="rounded-[20px] bg-white p-6 sm:p-7 border border-slate-200 flex flex-col sm:flex-row items-center justify-between gap-4 shadow-sm">
            <div className="space-y-1 text-center sm:text-left">
              <div className="text-xs font-mono text-[#0052FF] font-semibold uppercase">Have More Questions?</div>
              <div className="font-bold text-sm sm:text-base text-slate-900">Chat directly with race marshals on WhatsApp</div>
            </div>

            <a
              href="https://wa.me/919071718620?text=Hi%20Velocity%20Circuit,%20I%20have%20a%20question%20about%20karting"
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => soundFx.playGearShift()}
              className="px-6 py-3 rounded-full bg-gradient-to-r from-emerald-600 to-teal-600 hover:brightness-110 text-white font-bold text-xs uppercase tracking-wider transition-all shadow-md shadow-emerald-600/20 shrink-0 cursor-pointer"
            >
              Chat on WhatsApp: +91 90717 18620 →
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};
