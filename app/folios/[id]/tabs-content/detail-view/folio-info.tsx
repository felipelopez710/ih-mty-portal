import Link from "next/link"
import ModeEditOutlinedIcon from '@mui/icons-material/ModeEditOutlined';

export default function FolioInfo(){
    return(
        <div className="w-full bg-white rounded-xl p-5 shadow-md flex flex-col gap-6">
            <div className="section-header flex justify-between items-center">
                <div className="text-base font-semibold">Folio Detail</div>
                <Link href={`/clients/edit/1`}>
                    <div className="flex gap-1 items-center text-ih-blue">
                        <div className='font-medium'>
                            Edit
                        </div>
                        <ModeEditOutlinedIcon fontSize="small" />
                    </div>
                </Link>
            </div>

            <div className='information-lines w-full flex flex-col gap-2'>

                {/* Group code */}
                <div className='information-line w-full flex gap-2'>
                    <div className='w-1/3 text-slate-400'>Group code</div>
                    <div className='w-2/3'>IH0001</div>
                </div>

                {/* Client */}
                <div className='information-line w-full flex gap-2'>
                    <div className='w-1/3 text-slate-400'>Client</div>
                    <div className='w-2/3'>Vitro Corporativo</div>
                </div>

                {/* Client location */}
                <div className='information-line w-full flex gap-2'>
                    <div className='w-1/3 text-slate-400'>Client location</div>
                    <div className='w-2/3'>Monterrey, N.L.</div>
                </div>

                {/* Modality */}
                <div className='information-line w-full flex gap-2'>
                    <div className='w-1/3 text-slate-400'>Modality</div>
                    <div className='w-2/3'>In person</div>
                </div>

                {/* Level */}
                <div className='information-line w-full flex gap-2'>
                    <div className='w-1/3 text-slate-400'>Level</div>
                    <div className='w-2/3'>300 PRE-INTERMEDIATE</div>
                </div>

                {/* Material */}
                <div className='information-line w-full flex gap-2'>
                    <div className='w-1/3 text-slate-400'>Material</div>
                    <div className='w-2/3'>MATERIAL</div>
                </div>

                {/* Coordinator */}
                <div className='information-line w-full flex gap-2'>
                    <div className='w-1/3 text-slate-400'>Coordinator</div>
                    <div className='w-2/3'>Alejandro Gorosabel</div>
                </div>

                {/* Contracted hours */}
                <div className='information-line w-full flex gap-2'>
                    <div className='w-1/3 text-slate-400'>Contracted hours</div>
                    <div className='w-2/3'>50</div>
                </div>

                {/* Amoount to be invoiced */}
                <div className='information-line w-full flex gap-2'>
                    <div className='w-1/3 text-slate-400'>Amount to be invoiced</div>
                    <div className='w-2/3'>$1,000</div>
                </div>
                
                {/* Price type */}
                <div className='information-line w-full flex gap-2'>
                    <div className='w-1/3 text-slate-400'>Price type</div>
                    <div className='w-2/3'>Group</div>
                </div>

                <div className='w-full border my-2'></div>
                <div className='font-semibold mb-2'>Comments</div>

                {/* General comments */}
                <div className='information-line w-full flex gap-2'>
                    <div className='w-1/3 text-slate-400'>General comments</div>
                    <div className='w-2/3'>Lorem</div>
                </div>

                {/* Academic */}
                <div className='information-line w-full flex gap-2'>
                    <div className='w-1/3 text-slate-400'>Academic</div>
                    <div className='w-2/3'>Ipsum</div>
                </div>

                {/* Material covered */}
                <div className='information-line w-full flex gap-2'>
                    <div className='w-1/3 text-slate-400'>Material covered</div>
                    <div className='w-2/3'>Amet</div>
                </div>

            </div>
        </div>
    )
}