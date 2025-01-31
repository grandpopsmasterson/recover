import React, {MouseEventHandler} from "react";
//import clsx from "clsx"; ?? not using?
import { useRouter } from "next/navigation";
import { Button } from "@heroui/button";
//import { div } from "framer-motion/client";

type ButtonProps = {
    child?: React.ReactNode;
    text: string;
    onClick: MouseEventHandler<HTMLButtonElement>;
    href?: string;
    height: string;
    width: string;
    color: string; // #4ade80 // Pastel_Green vvv
    //shade: number; // 500 not needed, Tailwind does not support this color
    display: string;
    //target?: "_blank" | "_self" | "_parent" | "_top"; // might be needed for matterport or other integration
}

const ButtonC: React.FC<ButtonProps> = ({
    child,
    text, 
    onClick, 
    href, 
    height, 
    width, 
    color, 
    display,
    //target
}) => {
    // initial setter for the color and text color
    const style = {
        backgroundColor: color,
        color: "black",
        display: display
    }

    const router = useRouter(); // nextJS router init for href

    const handleClick: MouseEventHandler<HTMLButtonElement> = (event) => {
        if (href) {
            router.push(href);
        }
        if (onClick) {
            onClick(event)
        }
    };

    return (
        <div>
        <button
            className={`px-2 py-2 rounded-full h-${height} w-${width} rounded-full border border-solid border-transparent transition-colors flex items-center justify-center bg-foreground text-background gap-2 hover:bg-[#383838] dark:hover:bg-[#ccc] text-sm sm:text-base h-10 sm:h-12 px-4 sm:px-5`} 
            onClick={handleClick}
            style={style}
            
        >
            {text || child}
        </button>
        <Button style={{backgroundColor: "#4ade80"}}> test </Button>
        </div>
    )
}

export default ButtonC