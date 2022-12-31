import React, { useContext, useRef, useState } from 'react';

import { Transition } from '@headlessui/react';
import classNames from 'classnames';
import { HiUserCircle } from 'react-icons/hi2';
import { IoIosArrowUp } from 'react-icons/io';

import AuthContext from '@/context/AuthContext';
import useOnClickOutside from '@/hooks/useOnClickOutside';

const UserDropup = ({ username }: { username?: string }) => {
  const authContext = useContext(AuthContext);
  const ref = useRef<HTMLDivElement>(null);
  const [isOpen, setIsOpen] = useState(false);

  useOnClickOutside(ref, () => {
    if (isOpen) {
      setIsOpen(false);
    }
  });

  const logoutUser = () => {
    authContext.setToken(null);
  };

  return (
    <div className="relative w-full" ref={ref}>
      <div className="absolute top-0 w-full">
        <Transition
          as={React.Fragment}
          enter="transition ease-out duration-100"
          enterFrom="transform opacity-0 scale-95"
          enterTo="transform opacity-100 scale-100"
          leave="transition ease-in duration-75"
          leaveFrom="transform opacity-100 scale-100"
          leaveTo="transform opacity-0 scale-95"
          show={isOpen}
        >
          <div className="absolute bottom-3 w-32 bg-slate-800 shadow-lg">
            <button className="w-full p-2 hover:bg-slate-700" onClick={logoutUser}>
              Logout
            </button>
          </div>
        </Transition>
      </div>
      <button className="flex w-full items-center p-2" onClick={() => setIsOpen(!isOpen)}>
        <HiUserCircle className="mr-2 h-8 w-8" />
        <span>{username}</span>
        <IoIosArrowUp
          className={classNames('mx-1', {
            'rotate-90': !isOpen
          })}
        />
      </button>
    </div>
  );
};

export default UserDropup;
