import Link from 'next/link';
import ModeEditOutlinedIcon from '@mui/icons-material/ModeEditOutlined';
import dayjs from 'dayjs';

export default function StudentInfo({ studentInfo }:any){
    return(
        <div className="w-full bg-white rounded-xl p-5 shadow-md flex flex-col gap-6">
            <div className="section-header flex justify-between items-center">
                <div className="text-base font-semibold">Client Detail</div>
                <Link href={`/clients/edit/${studentInfo.student_id}`}>
                    <div className="flex gap-1 items-center text-ih-blue">
                        <div className='font-medium'>
                            Edit
                        </div>
                        <ModeEditOutlinedIcon fontSize="small" />
                    </div>
                </Link>
            </div>

            <div className='information-lines w-full flex flex-col gap-2'>
                {
                    studentInfo.full_name != null ?
                    <div className='information-line w-full flex gap-2'>
                        <div className='w-1/3 text-slate-400'>Student name</div>
                        <div className='w-2/3'>{studentInfo.full_name}</div>
                    </div>
                    :
                    ''
                }
                {
                    studentInfo.gender != null ?
                    <div className='information-line w-full flex gap-2'>
                        <div className='w-1/3 text-slate-400'>Gender</div>
                        <div className='w-2/3'>{studentInfo.gender}</div>
                    </div>
                    :
                    ''
                }
                {
                    studentInfo.date_of_birth != null ?
                    <div className='information-line w-full flex gap-2'>
                        <div className='w-1/3 text-slate-400'>Gender</div>
                        <div className='w-2/3'>{dayjs(studentInfo.date_of_birth).format('MMMM D, YYYY')}</div>
                    </div>
                    :
                    ''
                }
                {
                    studentInfo.nationality != null ?
                    <div className='information-line w-full flex gap-2'>
                        <div className='w-1/3 text-slate-400'>Nationality</div>
                        <div className='w-2/3'>{studentInfo.nationality}</div>
                    </div>
                    :
                    ''
                }
                
                <div className='w-full border my-2'></div>
                <div className='font-semibold mb-2'>Contact information</div>

                {
                    studentInfo.email != null ?
                    <div className='information-line w-full flex gap-2'>
                        <div className='w-1/3 text-slate-400'>Email</div>
                        <div className='w-2/3'>{studentInfo.email}</div>
                    </div>
                    :
                    ''
                }
                {
                    studentInfo.mobile != null ?
                    <div className='information-line w-full flex gap-2'>
                        <div className='w-1/3 text-slate-400'>Mobile number</div>
                        <div className='w-2/3'>{studentInfo.mobile}</div>
                    </div>
                    :
                    ''
                }
                {
                    studentInfo.phone_number != null ?
                    <div className='information-line w-full flex gap-2'>
                        <div className='w-1/3 text-slate-400'>Phone number</div>
                        <div className='w-2/3'>{studentInfo.phone_number}</div>
                    </div>
                    :
                    ''
                }
                {
                    studentInfo.phone_number_2 != null ?
                    <div className='information-line w-full flex gap-2'>
                        <div className='w-1/3 text-slate-400'>Phone number 2</div>
                        <div className='w-2/3'>{studentInfo.phone_number_2}</div>
                    </div>
                    :
                    ''
                }
                {
                    studentInfo.address != null ?
                    <div className='information-line w-full flex gap-2'>
                        <div className='w-1/3 text-slate-400'>Address</div>
                        <div className='w-2/3'>{studentInfo.address}</div>
                    </div>
                    :
                    ''
                }
                {
                    studentInfo.neighborhood != null ?
                    <div className='information-line w-full flex gap-2'>
                        <div className='w-1/3 text-slate-400'>Neighborhood</div>
                        <div className='w-2/3'>{studentInfo.neighborhood}</div>
                    </div>
                    :
                    ''
                }
                {
                    studentInfo.city != null ?
                    <div className='information-line w-full flex gap-2'>
                        <div className='w-1/3 text-slate-400'>City</div>
                        <div className='w-2/3'>{studentInfo.city}</div>
                    </div>
                    :
                    ''
                }
                {
                    studentInfo.state != null ?
                    <div className='information-line w-full flex gap-2'>
                        <div className='w-1/3 text-slate-400'>State</div>
                        <div className='w-2/3'>{studentInfo.state}</div>
                    </div>
                    :
                    ''
                }
                {
                    studentInfo.zip_code != null ?
                    <div className='information-line w-full flex gap-2'>
                        <div className='w-1/3 text-slate-400'>Zip Code</div>
                        <div className='w-2/3'>{studentInfo.zip_code}</div>
                    </div>
                    :
                    ''
                }

                <div className='w-full border my-2'></div>
                <div className='font-semibold mb-2'>Comments</div>

                {
                    studentInfo.comments != null ?
                    <div className='information-line w-full flex gap-2'>
                        <div className='w-1/3 text-slate-400'>General comments</div>
                        <div className='w-2/3'>{studentInfo.comments}</div>
                    </div>
                    :
                    ''
                }

            </div>
        </div>
    )
}