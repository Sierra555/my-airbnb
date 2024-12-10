'use clinet';

import { SafeUser } from "@/app/types";
import Container from '../Container';
import Logo from './Logo';
import Search from './Search';
import UserMenu from './UserMenu';
import Categories from "./Categories";
import { Suspense } from "react";
import Loader from "../Loader";

type NavbarProps = {
  currentUser?: SafeUser | null,
}

const Navbar = ({ currentUser } : NavbarProps ) => {
  return (
    <Suspense fallback={<Loader />}> 
      <div className='fixed w-full bg-background z-20 shadow-sm'>
          <div className='py-4 border-b-[1px]'>
              <Container>
                  <div className='flex flex-row items-center justify-between gap-3 md:gap-0'>
                      <Logo />
                      <Search />
                      <UserMenu currentUser={currentUser} />
                  </div>
              </Container>
          </div>
          <Categories />
      </div>
    </Suspense>
  );
};

export default Navbar;