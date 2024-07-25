
export default function FolioFrequency(){
    return(
        <div className="w-full bg-white rounded-xl p-5 shadow-md flex flex-col gap-6">
            <div className="section-header flex items-center">
                <div className="text-base font-semibold">Folio frequency</div>
            </div>
            <div className="w-full flex flex-col gap-2">
                
                {/* Frequency lines */}
                <div className="w-full p-4 border border-slate-300 rounded-lg flex flex-col gap-2">
                    <div className='flex gap-2 items-center'>
                        <div className='font-semibold'>John Doe</div>
                        <div className='py-1 px-3 text-xs rounded-lg bg-blue-100 text-ih-blue font-semibold'>Head teacher</div>
                    </div>
                    
                    <div className='flex flex-col text-slate-500'>
                        <div>Monday, Wednesday</div>
                        <div>12:00 - 14:00</div>
                    </div>
                </div>

                <div className="w-full p-4 border border-slate-300 rounded-lg flex flex-col gap-2">
                    <div className='flex gap-2 items-center'>
                        <div className='font-semibold'>Jane Doe</div>
                    </div>
                    
                    <div className='flex flex-col text-slate-500'>
                        <div>Friday</div>
                        <div>12:00 - 14:00</div>
                    </div>
                </div>

            </div>
        </div>
    )
}