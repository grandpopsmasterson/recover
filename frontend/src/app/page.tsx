"use client"
import {useRouter} from "next/navigation"
import{ Button } from "@heroui/button"

// const recoverGreen = "#4ade80";

export default function Home() {

  const router = useRouter();

  const handleClickLogin = (e: React.MouseEvent) => {
    e.preventDefault();
    router.push('/Auth/Login')
  }

  return (
    <div className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-2 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">
      <main className="flex flex-col gap-8 row-start-2 items-center sm:items-start">
          <Button onClick={handleClickLogin} style={{backgroundColor:"#4ade80", color: "black"}}>Log In</Button>
          <a href="/Auth/SignUp">Sign Up</a>
        <p>HOMEPAGE</p>
        <p>about recover systems</p>
      </main>
      <footer className="row-start-3 flex gap-6 flex-wrap items-center justify-center">
        <a
          className="flex items-center gap-2 hover:underline hover:underline-offset-4"
          href="https://nextjs.org/learn?utm_source=create-next-app&utm_medium=appdir-template-tw&utm_campaign=create-next-app"
          target="_blank"
          rel="noopener noreferrer"
        >
          <svg fill="none" height="36" viewBox="0 0 1 32" width="36">
            <path 
                clipRule="evenodd"
                d="M16,15V11a2,2,0,0,0-2-2H8V23h2V17h1.48l2.34,6H16l-2.33-6H14A2,2,0,0,0,16,15Zm-6-4h4v4H10Z"
                fill="#4ade80"
                fillRule="evenodd"
            />
        </svg>
          Recover Systems
        </a>
      </footer>
    </div>
  );
}
