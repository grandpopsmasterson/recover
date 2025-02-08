'use client'
import { Navbar, NavbarBrand, NavbarContent, NavbarItem, Link, DropdownItem, DropdownTrigger, Dropdown, DropdownMenu } from "@heroui/react"
//import styles from "./../styles/Navbar.module.css";
import React, {useState, useEffect, useCallback, memo} from "react";
import { usePathname, useRouter } from 'next/navigation';
import NextLink from 'next/link';

//interface for the NavLink props
interface NavLinkProps {
    href: string;
    isActive?: boolean;
    children: React.ReactNode;
    className?: string;
}


//memoize the logo
export const RecoverLogo = memo(() => { // memo (or React.memo // same thing) is for ensuring that components that dont change dont need to rerender, useMemo() is for expensive computations that should only rerender if the value changes
    return (
        <svg fill="none" height="36" viewBox="0 0 1 32" width="36">
            <path 
                clipRule="evenodd"
                d="M16,15V11a2,2,0,0,0-2-2H8V23h2V17h1.48l2.34,6H16l-2.33-6H14A2,2,0,0,0,16,15Zm-6-4h4v4H10Z"
                fill="white"
                fillRule="evenodd"
            />
        </svg>
    )
});
RecoverLogo.displayName = "RecoverLogo";

//memoize the nav link
export const NavLink = memo<NavLinkProps>(({ href, isActive, children }) => {
    
    const router = useRouter();

    const handleClick = (e: React.MouseEvent) => {
        e.preventDefault();
        router.push(href);
    }

    return (
        <Link
            color="foreground"
            href={href}
            className={`${isActive ? 'border-b-2 border-white' : ''}`}
            onPress={() => handleClick} // TODO look into the onPress and how to properly use that here, onClick is depreciated
            >
                {children}
            </Link>
    );
});
NavLink.displayName = 'NavLink'

//memoize the user dropdown
const UserDropdown = memo(() => (
    <Dropdown placement="bottom-end">
        <DropdownTrigger>
            <svg fill="none" height="36" viewBox="0 0 32 32" width="36">
                <path
                    d="M4 6H20M4 12H20M4 18H20" 
                    stroke="#4ade80" 
                    strokeWidth="2" 
                    strokeLinecap="round" 
                    strokeLinejoin="round"
                />
            </svg>
        </DropdownTrigger>
        <DropdownMenu variant="flat" className="top-full">
            <DropdownItem key="profile" className="h-14 gap-2">
                <NavLink href="/User" isActive={false}>
                    <p className="font-semibold">Signed in as&nbsp;</p>
                    <p className="font-semibold">User 1</p> {/** to be imported from DB */}
                </NavLink>
            </DropdownItem>
            <DropdownItem key="settings">
                <NavLink href="/Settings" isActive={false}>
                    My Settings
                </NavLink>
            </DropdownItem>
            <DropdownItem key="signOut" color="danger">
                <NavLink href="/" isActive={false}>
                    Sign Out
                </NavLink>
            </DropdownItem>
        </DropdownMenu>
    </Dropdown>
));
UserDropdown.displayName = 'UserDropdown';

export default function DashboardNavBar() {

    const router = useRouter();
    const pathname = usePathname();

    //function to check if current path matches link -- now memoized
    const isActive = useCallback((path:string) => pathname === path, [pathname]);

    return (
        <div className="fixed top-0 left-0 w-full">
            <Navbar>
                <NavbarBrand>                
                    <NextLink href="/#" passHref>
                        <div className="grid grid-cols-2"
                            onClick={() => router.push('/')}
                        >
                            <RecoverLogo />
                            <p className="font-bold text-inherit text-white pt-2">RECOVER</p>
                        </div>
                    </NextLink>
                </NavbarBrand>

                <NavbarContent className="hidden sm:flex gap-4" justify="center">
                <NavbarItem >
                        <NavLink href="/Dashboard" isActive={isActive('/Dashboard')}>
                            Dashboard 
                        </NavLink>
                    </NavbarItem>
                    <NavbarItem >
                        <NavLink href="/Dashboard/AllProjects" isActive={isActive('/Dashboard/AllProjects')}>
                            Projects 
                        </NavLink>
                    </NavbarItem>
                    <NavbarItem >
                        <NavLink href="/Dashboard/AllEstimates" isActive={isActive('/Dashboard/AllEstimates')}>
                            Estimates 
                        </NavLink>
                    </NavbarItem>
                    <NavbarItem >
                        <NavLink href="/Dashboard/Network" isActive={isActive('/Dashboard/Network')}>    
                            Network 
                        </NavLink>
                </NavbarItem>
            </NavbarContent> 

            <NavbarContent as="div" justify="end">
                <UserDropdown />
            </NavbarContent>
        </Navbar>
    </div>
    )
}