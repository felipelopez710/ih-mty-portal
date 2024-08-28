import Image from "next/image"

export default function Grades(){
    return(
        <div className="w-full p-20 flex items-center justify-center">
            <div className="w-full max-w-96 flex flex-col items-center justify-center gap-8">
                <div className="logo-container">
                    <Image
                        src="/wip.png"
                        width={180}
                        height={180}
                        alt="logo-ih"
                    />
                </div>
                <div className="w-full text-center font-medium text-base">
                    This page is under construction
                </div>
            </div>
        </div>
    )
}