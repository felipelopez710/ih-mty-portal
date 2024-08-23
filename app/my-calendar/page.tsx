import Link from "next/link"

export default function MyCalendar(){
    return(
        <div>
            <div>My Calendar page (only for teachers)</div>
            <Link href={'/my-classes'}>
                <div>Go to Classes page</div>
            </Link>
        </div>
    )
}