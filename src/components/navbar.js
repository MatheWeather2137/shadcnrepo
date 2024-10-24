import Link from "next/link";

export default function Navbar(){
    return(
    <div className="flex gap-2 items-center justify-center border-y-8 border">

    <Link href="/">Main</Link>
    <Link href="/zloto">Gold</Link>
    <Link href="/pogoda">Weather</Link>
    <Link href="/news">News</Link>
    <Link href="/cats">Cats</Link>
    
    </div>
    )
}