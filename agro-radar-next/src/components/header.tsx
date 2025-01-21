import Link from "next/link";

export default function Header(){
    return <header className="bg-slate-500 w-auto h-12 flex-auto justify-between flex-col"> 
        <h1 className="">Agro-radar</h1> 
        <span> 
            <Link href={'sensor'}>Sensor</Link> 
            <Link href={"gateway"}>Gateway</Link>
        </span> 
    </header>
}