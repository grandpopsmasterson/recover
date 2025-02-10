export default function Footer() {
    const currentYear = new Date().getFullYear();
    return (
        <div className="footer w-full flex flex-col content-center items-center p-10">
            <h6>Copyright Recover Systems @{currentYear}</h6>
        </div>
    )
}