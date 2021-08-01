import { ReactElement, ReactNode } from 'react';
import Image from 'next/image';
import JupiterLogo from '../public/images/jupiter-logo.png';
import JupiterProfile from '../public/images/jupiter-profile.png';
import { useAppDispatch } from '@app/hooks';
import { toggleShowingCart } from '@controllers/features/cart/cart-slice';

export default function NavMenu(): ReactElement {
  const dispatch = useAppDispatch();
  return (
    <nav className="flex py-[6px] px-[23px] items-center gap-[37.5px] border-b border-gray-200 mb-[22px]">
      <div className="flex items-center justify-center flex-none">
        <Image src={JupiterLogo} alt="Jupiter logo" className="h-[33px]" />
      </div>
      <div className="flex flex-1">
        <input
          type="text"
          name="search"
          id="search"
          placeholder="Search Jupiter"
          className="h-[39px] w-[497px] py-[22px] px-[15px] text-sm border-l border-t border-b border-gray-200"
        />
        <button
          type="button"
          className="flex items-center justify-center px-[15px] border-t border-b border-r border-gray-200"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="w-4 h-4 text-gray-800"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={1}
              d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
            />
          </svg>
        </button>
      </div>
      <div className="flex flex-wrap items-center flex-none gap-6">
        <div className="flex items-center justify-center">
          <span className="bg-[#EC6661] py-[7.52px] px-[7px] rounded text-sm font-medium text-white">
            Get 20$ Off
          </span>
        </div>
        <NavItem
          label="Recipes"
          onClick={() => {
            location.href = './placeholder';
          }}
          icon={
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="w-7 h-7 text-[#777]"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"
              />
            </svg>
          }
        />
        <NavItem
          label="Shop"
          onClick={() => {
            location.href = './placeholder';
          }}
          icon={
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="w-7 h-7 text-[#777]"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z"
              />
            </svg>
          }
        />
        <NavItem
          label="Profile"
          onClick={() => {
            location.href = './placeholder';
          }}
          icon={
            <div className="relative">
              <Image
                src={JupiterProfile}
                alt="Jupiter profile"
                className="w-16"
              />
              <div className="absolute top-0 right-0 w-3 h-3 rounded-full bg-[#FA5426]"></div>
            </div>
          }
        />
        <NavItem
          label="Settings"
          onClick={() => {
            location.href = './placeholder';
          }}
          icon={
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="w-7 h-7 text-[#777]"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4"
              />
            </svg>
          }
        />
        <NavItem
          label="Cart"
          onClick={() => dispatch(toggleShowingCart())}
          icon={
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="w-7 h-7 text-[#777]"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z"
              />
            </svg>
          }
        />
      </div>
    </nav>
  );
}

const NavItem = ({
  label,
  icon,
  onClick,
}: {
  onClick?: () => void;
  label: string;
  icon: ReactNode;
}): ReactElement => {
  return (
    <button
      className="flex flex-col items-center justify-center"
      onClick={onClick}
    >
      <div className="flex items-center justify-center flex-1">{icon}</div>
      <div className="flex-none">
        <span className="text-xs font-light">{label}</span>
      </div>
    </button>
  );
};
