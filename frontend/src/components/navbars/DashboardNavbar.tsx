'use client'

import { Navbar, NavbarBrand, NavbarContent, NavbarItem, Link, DropdownItem, DropdownTrigger, Dropdown, DropdownMenu, Button } from "@heroui/react"
import React, { useCallback, memo } from "react";
import { usePathname, useRouter } from 'next/navigation';
import NextLink from 'next/link';
import { logoutApi } from "@/api/features/authApi";

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
const UserDropdown = memo(() => {
    const router = useRouter();

    const handleLogout = async () => {
        try {
            await logoutApi.logout();
            // Clear any local storage or auth state if needed
            router.push('/');
        } catch (error) {
            console.error('Logout failed', error);
            // Optionally show an error toast or notification
        }
    };

    return (
    <Dropdown>
        <DropdownTrigger>
            <svg fill="none" height="32" viewBox="0 0 24 24" width="32">
                <path
                    d="M4 6H20M4 12H20M4 18H20" 
                    stroke="background" 
                    strokeWidth="2" 
                    strokeLinecap="round" 
                    strokeLinejoin="round"
                />
            </svg>
        </DropdownTrigger>
        <DropdownMenu variant="flat" className="top-full">
            <DropdownItem key="profile" className="h-14 gap-2">
                <NavLink href="/user" isActive={false}>
                    <p className="font-semibold">Signed in as&nbsp;</p>
                    <p className="font-semibold">User 1</p> {/** to be imported from DB */}
                </NavLink>
            </DropdownItem>
            <DropdownItem key="settings">
                <NavLink href="/settings" isActive={false}>
                    My Settings
                </NavLink>
            </DropdownItem>
            <DropdownItem 
                key="signOut" 
                color="danger"
                onPress={handleLogout}
            >
                Sign Out
            </DropdownItem>
        </DropdownMenu>
    </Dropdown>
)});
UserDropdown.displayName = 'UserDropdown';

export default function DashboardNavBar() {

    const router = useRouter();
    const pathname = usePathname();

    //function to check if current path matches link -- now memoized
    const isActive = useCallback((path:string) => pathname === path, [pathname]);

    return (
        <Navbar maxWidth="full" className="bg-recovernavy">
            <NavbarContent justify="start">
                <NavbarBrand>                
                    <NextLink href="/#" passHref>
                        <div className="grid grid-cols-2"
                            onClick={() => router.push('/')}
                        >
                            <RecoverLogo />
                            <p className="font-sans text-white pt-2">RECOVER</p>
                        </div>
                    </NextLink>
                </NavbarBrand>

                <NavbarContent className="hidden sm:flex gap-4" justify="center">
                    <NavbarItem>
                        <Link href="/dashboard" className="text-white font-sans">
                            Dashboard 
                        </Link>
                    </NavbarItem>
                </NavbarContent>
            </NavbarContent>
            <NavbarContent justify="end">
                <NavbarItem>
                    <Link className="text-white font-sans" href="/tech-dash">
                        Technician View
                    </Link>
                </NavbarItem>
                <NavbarItem>
                    <Button as={Link} color="default" href="./create-project" variant="flat">
                        Create Project
                    </Button>
                </NavbarItem>
                <NavbarItem className="self-center">
                    <UserDropdown />
                </NavbarItem> 
            </NavbarContent>
        </Navbar>
    )
}
