import PersonPinCircleOutlinedIcon from '@mui/icons-material/PersonPinCircleOutlined';
import VideoChatOutlinedIcon from '@mui/icons-material/VideoChatOutlined';
import dayjs from 'dayjs';

export default function FoliosGrid({ listOfFolios }:any){
    return(
        <div className="folios-grid-container w-full">
            <div className="folios-grid grid grid-cols-3 gap-4">  

                {listOfFolios.map((folio:any)=>{
                    return(
                        <div key={folio.id} className="w-full p-4 rounded-lg flex flex-col gap-2.5 bg-white drop-shadow-md">

                            <div className='flex gap-2 items-center'>
                                {
                                    folio.modality === 'F2F' &&
                                    <div className='modality-tag rounded bg-amber-100 w-min flex items-center p-1 gap-1.5'>
                                        <PersonPinCircleOutlinedIcon className='text-rainbow-yellow' />
                                    </div>
                                }
                                {
                                    folio.modality === 'online' &&
                                    <div className='modality-tag rounded bg-pink-100 w-min flex items-center p-1 gap-1.5'>
                                        <VideoChatOutlinedIcon className='text-rainbow-pink' />
                                    </div>
                                }
                                <div className='font-semibold'>{`F. ${folio.folio_id} | ${folio.level_description}`}</div>
                            </div>
                            
                            <div className='flex flex-col gap-2'>
                                <div className='flex items-center gap-2'>
                                    <span className='text-slate-400 w-1/3'>Start - end:</span>
                                    <span className='w-2/3 text-right'>{dayjs(folio.start_date).format('MMM D, YYYY')} - {dayjs(folio.end_date).format('MMM D, YYYY')}</span>
                                </div>
                                <div className='flex items-center gap-2'>
                                    <span className='text-slate-400 w-1/3'>Frequency:</span>
                                    <span className='w-2/3 text-right italic'>W.I.P</span>
                                </div>
                            </div>

                        </div>
                    )
                })}

                <div className="w-full p-4 rounded-lg flex flex-col gap-2.5 bg-white drop-shadow-md">

                    <div className='flex gap-2 items-center'>
                        <div className='modality-tag rounded bg-pink-100 w-min flex items-center p-1 gap-1.5'>
                            <VideoChatOutlinedIcon className='text-rainbow-pink' />
                        </div>
                        <div className='font-semibold'>F. 12345 | A1 Pre-elementary</div>
                    </div>
                    
                    <div className='flex flex-col gap-2'>
                        <div className='flex items-center gap-2'>
                            <span className='text-slate-400 w-1/3'>Start - end:</span>
                            <span className='w-2/3 text-right'>June 1, 2024 - Jan 31, 2024</span>
                        </div>
                        <div className='flex items-center gap-2'>
                            <span className='text-slate-400 w-1/3'>Frequency:</span>
                            <span className='w-2/3 text-right italic'>W.I.P.</span>
                        </div>
                    </div>

                </div>

            </div>
        </div>
    )
}