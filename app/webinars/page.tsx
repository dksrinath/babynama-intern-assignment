'use client';

import React, { useState, useEffect } from 'react';

interface Webinar {
  id: number;
  title: string;
  speaker: string;
  date: string;
  points: string[];
  thumbnail: string;
  speakerImg: string;
  status: 'live' | 'upcoming' | 'completed';
}

const webinars: Webinar[] = [
  {
    id: 1,
    title: "Live: Evening Insights on Baby Sleep",
    speaker: "Dr. Sumitra Meena, Pediatrician",
    date: "2025-06-08T14:30:00Z",
    status: 'live',
    points: ['Effective evening routines', 'Understanding sleep cycles', 'Peaceful bedtime tips'],
    thumbnail: 'https://images.pexels.com/photos/265987/pexels-photo-265987.jpeg?auto=compress&cs=tinysrgb&w=600&h=338&dpr=1',
    speakerImg: 'https://images.pexels.com/photos/5327585/pexels-photo-5327585.jpeg?auto=compress&cs=tinysrgb&w=100&h=100&dpr=1',
  },
  {
    id: 2,
    title: "Upcoming: Nutrition for New Mothers",
    speaker: "Dr. Priya Sharma, Nutritionist",
    date: "2025-06-09T11:30:00Z",
    status: 'upcoming',
    points: ['Postpartum nutrients', 'Breastfeeding diet', 'Quick meal ideas'],
    thumbnail: 'https://images.pexels.com/photos/5967859/pexels-photo-5967859.jpeg?auto=compress&cs=tinysrgb&w=600&h=338&dpr=1',
    speakerImg: 'https://images.pexels.com/photos/5407206/pexels-photo-5407206.jpeg?auto=compress&cs=tinysrgb&w=100&h=100&dpr=1',
  },
  {
    id: 3,
    title: 'Upcoming: Baby Development Milestones',
    speaker: 'Dr. Anjali Dave, Developmental Pediatrician',
    date: '2025-06-12T09:00:00Z',
    status: 'upcoming',
    points: ['Motor skill tracking', 'Speech development', 'Early intervention signs'],
    thumbnail: 'https://images.pexels.com/photos/7491095/pexels-photo-7491095.jpeg?auto=compress&cs=tinysrgb&w=600&h=338&dpr=1',
    speakerImg: 'https://images.pexels.com/photos/4173239/pexels-photo-4173239.jpeg?auto=compress&cs=tinysrgb&w=100&h=100&dpr=1',
  },
  {
    id: 4,
    title: 'Ended: First Aid Essentials',
    speaker: 'Dr. Vikram Singh, Emergency Physician',
    date: '2025-06-07T07:30:00Z',
    status: 'completed',
    points: ['Common injuries', 'Infant CPR', 'Child-proofing'],
    thumbnail: 'https://images.pexels.com/photos/14624610/pexels-photo-14624610.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
    speakerImg: 'https://images.pexels.com/photos/4225880/pexels-photo-4225880.jpeg?auto=compress&cs=tinysrgb&w=100&h=100&dpr=1',
  }
];

const Timer = ({ date, status }: { date: string; status: string }) => {
  const [timeLeft, setTimeLeft] = useState(0);

  useEffect(() => {
    const updateTimer = () => {
      setTimeLeft(Math.max(0, new Date(date).getTime() - Date.now()));
    };
    updateTimer();
    const timer = setInterval(updateTimer, 60000);
    return () => clearInterval(timer);
  }, [date]);

  if (status === 'live') {
    return <div className="text-xs bg-red-100 text-red-700 p-2 rounded mb-2 text-center font-semibold">Started now!</div>;
  }

  if (timeLeft === 0) {
    return <div className="text-xs bg-green-100 text-green-700 p-2 rounded mb-2 text-center">Starting now!</div>;
  }

  const days = Math.floor(timeLeft / (1000 * 60 * 60 * 24));
  const hours = Math.floor((timeLeft % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
  const minutes = Math.floor((timeLeft % (1000 * 60 * 60)) / (1000 * 60));

  if (days > 0) {
    return <div className="text-xs bg-blue-100 text-blue-700 p-2 rounded mb-2 text-center">Starts in {days} day{days > 1 ? 's' : ''}</div>;
  }

  return <div className="text-xs bg-orange-100 text-orange-700 p-2 rounded mb-2 text-center">Starts in: {hours}h {minutes}m</div>;
};

const NavBar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const navItems = ['Care Plans', 'Programs', 'Courses', 'Live Webinars', 'Blogs', 'Testimonials'];

  return (
    <nav className="bg-white shadow-sm border-b sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex items-center h-16">
          <img alt="Babynama" className="h-8 w-auto" src="https://babynama.com/_next/static/media/logo-light.f8d530c6.svg"/>
          
          <div className="hidden lg:flex flex-1 justify-center space-x-8">
            {navItems.map((item) => (
              <a key={item} href="#" className={`${item === 'Live Webinars' ? 'text-orange-500 font-semibold' : 'text-gray-700 hover:text-orange-500'} px-3 py-2 text-sm`}>
                {item}
              </a>
            ))}
          </div>

          <button className="hidden lg:block bg-orange-50 text-orange-600 border border-orange-300 px-4 py-2 rounded-lg text-sm hover:bg-orange-100">
            Emergency Consultation
          </button>

          <button className="lg:hidden ml-auto p-2" onClick={() => setIsOpen(!isOpen)}>
            <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d={isOpen ? "M6 18L18 6M6 6l12 12" : "M4 6h16M4 12h16M4 18h16"} />
            </svg>
          </button>
        </div>
      </div>

      {isOpen && (
        <div className="lg:hidden bg-white border-t">
          <div className="px-4 py-4 space-y-2">
            {navItems.map((item) => (
              <a key={item} href="#" className={`block px-3 py-2 rounded ${item === 'Live Webinars' ? 'text-orange-500 bg-orange-50' : 'text-gray-700'}`}>
                {item}
              </a>
            ))}
            <button className="w-full bg-orange-50 text-orange-600 border border-orange-300 px-4 py-2 rounded-lg mt-4">
              Emergency Consultation
            </button>
          </div>
        </div>
      )}
    </nav>
  );
};

const WebinarCard = ({ webinar }: { webinar: Webinar }) => {
  const dateObj = new Date(webinar.date);
  const displayDate = dateObj.toLocaleDateString('en-IN', { month: 'long', day: 'numeric', year: 'numeric' });
  const displayTime = dateObj.toLocaleTimeString('en-IN', { hour: 'numeric', minute: 'numeric', hour12: true });
  const [name, credentials] = webinar.speaker.split(',');

  const handleClick = () => {
    console.log(`Viewing details for webinar ID: ${webinar.id}`);
  };

  const buttons = {
    live: { style: 'bg-red-500 hover:bg-red-600', text: 'Join Live' },
    upcoming: { style: 'bg-blue-500 hover:bg-blue-600', text: 'View Details' },
    completed: { style: 'bg-gray-500 hover:bg-gray-600', text: 'View Recording' }
  };

  return (
    <div className="bg-white rounded-lg shadow-sm border p-5 hover:shadow-md transition-shadow relative">
      {webinar.status === 'live' && (
        <span className="absolute top-3 right-3 bg-red-500 text-white text-xs px-2 py-1 rounded-full animate-pulse">LIVE</span>
      )}
      
      <img src={webinar.thumbnail} alt={webinar.title} className="w-full h-48 object-cover rounded-lg mb-4" />
      
      <div className="flex items-center mb-3">
        <img src={webinar.speakerImg} alt={name} className="w-12 h-12 rounded-full mr-3 border-2 border-pink-200" />
        <div>
          <p className="text-pink-600 font-semibold text-sm">{name}</p>
          {credentials && <p className="text-gray-500 text-xs">{credentials.trim()}</p>}
        </div>
      </div>

      <h3 className="text-lg font-bold text-gray-800 mb-2">{webinar.title}</h3>
      <p className="text-sm text-gray-600 mb-1"><span className="font-semibold">Date:</span> {displayDate}</p>
      <p className="text-sm text-gray-600 mb-3"><span className="font-semibold">Time:</span> {displayTime} IST</p>

      {webinar.status !== 'completed' && <Timer date={webinar.date} status={webinar.status} />}
      {webinar.status === 'completed' && (
        <div className="text-sm text-gray-500 bg-gray-50 p-3 rounded mb-3 text-center">Webinar ended</div>
      )}

      <ul className="text-sm text-gray-600 mb-4 space-y-1">
        {webinar.points.map((point, i) => (
          <li key={i} className="flex items-start">
            <span className="text-pink-500 mr-2">•</span>
            {point}
          </li>
        ))}
      </ul>

      <div className="flex gap-2">
        <button 
          onClick={handleClick}
          className={`${buttons[webinar.status].style} text-white font-semibold py-2 px-4 rounded-lg flex-1 text-sm`}
        >
          {buttons[webinar.status].text}
        </button>
        {webinar.status === 'upcoming' && (
          <button 
            onClick={() => console.log(`Registering for webinar ID: ${webinar.id}`)}
            className="bg-teal-500 hover:bg-teal-600 text-white font-semibold py-2 px-4 rounded-lg text-sm"
          >
            Register
          </button>
        )}
      </div>
    </div>
  );
};

export default function WebinarsPage() {
  return (
    <div className="min-h-screen bg-white">
      <NavBar />
      <div className="max-w-7xl mx-auto px-4 py-12">
        <div className="text-center mb-16">
          <h1 className="text-5xl font-bold text-gray-800 mb-6">Live Webinars</h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Join expert pediatricians for sessions on child health and development
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {webinars.map((webinar) => (
            <WebinarCard key={webinar.id} webinar={webinar} />
          ))}
        </div>

        <div className="mt-16 bg-orange-50 p-8 rounded-xl text-center max-w-2xl mx-auto border border-orange-100">
          <h3 className="text-2xl font-bold text-orange-800 mb-3">Need Help?</h3>
          <p className="text-orange-700 mb-6">24/7 pediatrician support via WhatsApp</p>
          <button className="bg-orange-50 text-orange-600 border-2 border-orange-300 px-8 py-3 rounded-lg hover:bg-orange-100">
            Emergency Consultation
          </button>
        </div>
      </div>
    </div>
  );
}