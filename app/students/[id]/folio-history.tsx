import ClassOutlinedIcon from '@mui/icons-material/ClassOutlined';
import SchoolOutlinedIcon from '@mui/icons-material/SchoolOutlined';
import ArrowForwardIosOutlinedIcon from '@mui/icons-material/ArrowForwardIosOutlined';
import StarBorderRoundedIcon from '@mui/icons-material/StarBorderRounded';

export default function FolioHistory(){
    return(
        <div className="w-full flex flex-col gap-4">
            <div className="indicators flex rounded-xl shadow-md bg-white p-5 gap-4 items-center">
                <div className="flex-1 flex gap-4 items-center">
                    <ClassOutlinedIcon fontSize='large'/>
                    <div className='flex flex-col'>
                        <div className='text-lg font-semibold'>99</div>
                        <div className='text-slate-500'>Folios taken</div>
                    </div>
                </div>
                <div className='h-12 border'></div>
                <div className="flex-1 flex gap-4 items-center">
                    <StarBorderRoundedIcon fontSize='large'/>
                    <div className='flex flex-col'>
                        <div className='text-lg font-semibold'>B2</div>
                        <div className='text-slate-500'>Level</div>
                    </div>
                </div>
            </div>

            <div className='folios flex flex-col gap-5 p-5 rounded-xl bg-white shadow-md'>
                <div className='title font-semibold text-base'>Active Folios</div>

                <div className='w-full flex flex-col gap-4'>
                    <div className='w-full border border-slate-300 rounded-lg p-4 flex gap-4 items-center hover:bg-slate-50'>
                        <div className='folio-content flex-1 flex flex-col gap-2'>
                            <div className='flex gap-2 items-center'>
                                <div className='font-semibold'>#16730</div>
                                <div className='py-1 px-3 text-xs rounded-lg bg-green-100 text-green-700 font-semibold'>Active</div>
                            </div>
                            <div className='flex flex-col text-slate-500'>
                                <div>Group: IHMTNS-1 | Level: 302 PRE-INTEREDIATE</div>
                                <div>Mar 14, 2024 - May 13, 2024</div>
                            </div>
                        </div>
                        <div className='action-button w-8 h-8 bg-slate-200 rounded-full flex items-center justify-center'>
                            <ArrowForwardIosOutlinedIcon fontSize='small'/>
                        </div>
                    </div>

                    <div className='w-full border border-slate-300 rounded-lg p-4 flex gap-4 items-center hover:bg-slate-50'>
                        <div className='folio-content flex-1 flex flex-col gap-2'>
                            <div className='flex gap-2 items-center'>
                                <div className='font-semibold'>#16730</div>
                                <div className='py-1 px-3 text-xs rounded-lg bg-green-100 text-green-700 font-semibold'>Active</div>
                            </div>
                            <div className='flex flex-col text-slate-500'>
                                <div>Group: IHMTNS-1 | Level: 302 PRE-INTEREDIATE</div>
                                <div>Mar 14, 2024 - May 13, 2024</div>
                            </div>
                        </div>
                        <div className='action-button w-8 h-8 bg-slate-200 rounded-full flex items-center justify-center'>
                            <ArrowForwardIosOutlinedIcon fontSize='small'/>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}