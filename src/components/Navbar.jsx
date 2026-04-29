import React, { useState } from 'react';
import {
  HomeIcon,
  ClockIcon,
  ChartBarIcon,
  UserIcon,
  Cog6ToothIcon,
} from '@heroicons/react/24/outline';

const MoonStarIcon = ({ className }) => (
  <svg
    viewBox="0 0 24 24"
    fill="none"
    className={className}
    stroke="currentColor"
    strokeWidth="1.5"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="M12 21a9 9 0 1 0 0-18 9 9 0 0 0 0 18zM19 12c.5 0 .9-.3 1.1-.8L21 9a.5.5 0 0 0-.1-.6.5.5 0 0 0-.6.1L18 10a.5.5 0 0 0 0 .7.5.5 0 0 0 .6.1L19 12zM21 16c.5 0 .9-.3 1.1-.8L23 13a.5.5 0 0 0-.1-.6.5.5 0 0 0-.6.1L20 14a.5.5 0 0 0 0 .7.5.5 0 0 0 .6.1L21 16z"></path>
    <path d="M12 9c-1.5 0-2.8 1.2-3 2.8-.2.2-.5.3-.8.3-.3 0-.6-.1-.8-.3C6.3 10.2 5 9 3.5 9"></path>
  </svg>
);

const menuItems = [
  { name: 'Home', icon: HomeIcon, id: 1 },
  { name: 'History', icon: ClockIcon, id: 2 },
  { name: 'Reports', icon: ChartBarIcon, id: 3 },
  { name: 'Staff', icon: UserIcon, id: 4 },
];

const Navbar = () => {
  const [activeItemId, setActiveItemId] = useState(1);

  return (
    <div className="flex h-screen w-20 flex-col items-center justify-between border-r border-slate-200 bg-white py-8 absolute left-0 top-0">
      <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-sky-100 text-sky-800">
        <MoonStarIcon className="h-7 w-7" />
      </div>
      <nav className="flex-1 pt-16">
        <ul className="flex flex-col items-center space-y-7">
          {menuItems.map((item) => (
            <li key={item.id}>
              <button
                onClick={() => setActiveItemId(item.id)}
                className={`flex h-14 w-14 items-center justify-center rounded-2xl transition-all duration-200
                  ${activeItemId === item.id
                    ? 'bg-sky-200 text-sky-900 shadow-inner'
                    : 'text-slate-500 hover:bg-slate-100 hover:text-slate-800'
                  }
                `}
              >
                <item.icon className="h-7 w-7" />
              </button>
            </li>
          ))}
        </ul>
      </nav>

      <div className="text-slate-500 transition-colors hover:text-slate-900">
        <button className="flex h-14 w-14 items-center justify-center rounded-2xl hover:bg-slate-100">
          <Cog6ToothIcon className="h-7 w-7" />
        </button>
      </div>
    </div>
  );
};

export default Navbar;