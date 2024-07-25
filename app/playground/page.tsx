export default function PlaygrounPage(){
    return(
        <main className="w-full bg-blue-100 h-screen">
            <div className="content-contaier bg-blue-200 h-full flex flex-col">
                <div className="top-section bg-red-500 h-20">Navigation bar</div>
                <div className="bottom-section bg-green-500 flex-1 p-5">
                    <div className="card-list flex flex-col gap-5">
                        <div className="card-item rounded-xl bg-white p-5">Card</div>
                    </div>
                </div>
            </div>
        </main>
    )
}