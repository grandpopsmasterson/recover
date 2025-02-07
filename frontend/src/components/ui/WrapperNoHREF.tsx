import { Link } from "@heroui/link";
import { memo } from "react";

interface WrapperProps {
    children: React.ReactNode;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    onPress?: (e?: any) => void | Promise<void> | { payload: undefined; type: 'signup/prevStep'; };
}

export const WrapperNoHREF = memo<WrapperProps>(({ children, onPress }) => {

    return (
        <Link
            color="foreground"
            onPress={onPress} // TODO look into the onPress and how to properly use that here, onClick is depreciated
            >
                {children}
            </Link>
    );
});
WrapperNoHREF.displayName = 'WrapperNoHREF'