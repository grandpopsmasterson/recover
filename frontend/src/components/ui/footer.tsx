import { Link } from "@heroui/link";
export default function Footer() {
    const currentYear = new Date().getFullYear();
    return (
        <div className="footer w-full flex flex-col content-center items-center p-10">
            <h6>Copyright Recover Systems @{currentYear}</h6>
            <div className="footer--links-container flex w-50 py-5">
                <div className="footer--list flex w-full justify-around">
                    <Link className="mx-2 text-primary" href="/about">About Us</Link>
                    <Link className="mx-2 text-primary" href="/contact">Contact Us</Link>
                    <Link className="mx-2 text-primary" href="/privacy">Privacy Policy</Link>
                    <Link className="mx-2 text-primary" href="terms-of-service">Terms of Service</Link>
                    <Link className="mx-2 text-primary" href="/legal">Legal</Link>
                </div>         
            </div>
        </div>
    )
}