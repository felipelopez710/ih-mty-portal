
export default function FolioFrequency({folioFrequency}:any){
    return(
        <div className="w-full h-full bg-white rounded-xl p-5 shadow-md flex flex-col gap-6">
            <div className="section-header flex items-center">
                <div className="text-base font-semibold">Folio frequency</div>
            </div>
            {
                folioFrequency !== undefined ?
                <div className="w-full flex flex-col gap-2">
                    
                    {/* Frequency lines */}
                    {
                        folioFrequency.map((line:any)=>{
                            return(
                                <div key={line.id} className="w-full p-4 border border-slate-300 rounded-lg flex flex-col gap-2">
                                    <div className='flex gap-2 items-center'>
                                        <div className='font-semibold'>{line.full_name}</div>
                                    </div>
                                    
                                    <div className='flex flex-col text-slate-500'>
                                        <div>{JSON.parse(line.frequency).map(String).join(', ')}</div>
                                        <div>{`${line.start_time} - ${line.end_time}`}</div>
                                    </div>
                                </div>
                            )
                        })
                    }

                </div>
                :
                ''
            }
        </div>
    )
}