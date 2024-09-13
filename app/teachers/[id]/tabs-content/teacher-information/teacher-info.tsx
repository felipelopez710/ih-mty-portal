import Link from 'next/link';
import ModeEditOutlinedIcon from '@mui/icons-material/ModeEditOutlined';
import dayjs from 'dayjs';

export default function TeacherInfo({ teacherInfo }: any){
    return(
        <div className="w-full bg-white rounded-xl p-5 shadow-md flex flex-col gap-6">
            <div className="section-header flex justify-between items-center">
                <div className="text-base font-semibold">Teacher Detail</div>
                <Link href={`/teachers/edit/${teacherInfo.teacher_id}`}>
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
                    teacherInfo.full_name != null ?
                    <div className='information-line w-full flex gap-2'>
                        <div className='w-1/3 text-slate-400'>Teacher's name</div>
                        <div className='w-2/3'>{teacherInfo.full_name}</div>
                    </div>
                    :
                    ''
                }
                {
                    teacherInfo.gender != null ?
                    <div className='information-line w-full flex gap-2'>
                        <div className='w-1/3 text-slate-400'>Gender</div>
                        <div className='w-2/3'>{teacherInfo.gender}</div>
                    </div>
                    :
                    ''
                }
                {
                    teacherInfo.code_ih != null ?
                    <div className='information-line w-full flex gap-2'>
                        <div className='w-1/3 text-slate-400'>CODEIH</div>
                        <div className='w-2/3'>{teacherInfo.code_ih}</div>
                    </div>
                    :
                    ''
                }
                {
                    teacherInfo.date_of_birth != null ?
                    <div className='information-line w-full flex gap-2'>
                        <div className='w-1/3 text-slate-400'>Date of birth</div>
                        <div className='w-2/3'>{dayjs(teacherInfo.date_of_birth).format('MMMM D, YYYY')}</div>
                    </div>
                    :
                    ''
                }
                {
                    teacherInfo.nationality != null ?
                    <div className='information-line w-full flex gap-2'>
                        <div className='w-1/3 text-slate-400'>Nationality</div>
                        <div className='w-2/3'>{teacherInfo.nationality}</div>
                    </div>
                    :
                    ''
                }
                {
                    teacherInfo.native_language != null ?
                    <div className='information-line w-full flex gap-2'>
                        <div className='w-1/3 text-slate-400'>Native language</div>
                        <div className='w-2/3'>{teacherInfo.native_language}</div>
                    </div>
                    :
                    ''
                }
                {
                    teacherInfo.rfc != null ?
                    <div className='information-line w-full flex gap-2'>
                        <div className='w-1/3 text-slate-400'>RFC</div>
                        <div className='w-2/3'>{teacherInfo.rfc}</div>
                    </div>
                    :
                    ''
                }
                {
                    teacherInfo.curp != null ?
                    <div className='information-line w-full flex gap-2'>
                        <div className='w-1/3 text-slate-400'>CURP</div>
                        <div className='w-2/3'>{teacherInfo.curp}</div>
                    </div>
                    :
                    ''
                }
                {
                    teacherInfo.join_date != null ?
                    <div className='information-line w-full flex gap-2'>
                        <div className='w-1/3 text-slate-400'>Join date</div>
                        <div className='w-2/3'>{dayjs(teacherInfo.join_date).format('MMMM D, YYYY')}</div>
                    </div>
                    :
                    ''
                }
                {
                    teacherInfo.quit_date != null ?
                    <div className='information-line w-full flex gap-2'>
                        <div className='w-1/3 text-slate-400'>Quit date</div>
                        <div className='w-2/3'>{teacherInfo.quit_date}</div>
                    </div>
                    :
                    ''
                }

                <div className='w-full border my-2'></div>
                <div className='font-semibold mb-2'>Contact information</div>

                {
                    teacherInfo.email != null ?
                    <div className='information-line w-full flex gap-2'>
                        <div className='w-1/3 text-slate-400'>Email</div>
                        <div className='w-2/3'>{teacherInfo.email}</div>
                    </div>
                    :
                    ''
                }
                {
                    teacherInfo.mobile != null ?
                    <div className='information-line w-full flex gap-2'>
                        <div className='w-1/3 text-slate-400'>Mobile number</div>
                        <div className='w-2/3'>{teacherInfo.mobile}</div>
                    </div>
                    :
                    ''
                }
                {
                    teacherInfo.phone_number != null ?
                    <div className='information-line w-full flex gap-2'>
                        <div className='w-1/3 text-slate-400'>Phone number</div>
                        <div className='w-2/3'>{teacherInfo.phone_number}</div>
                    </div>
                    :
                    ''
                }
                {
                    teacherInfo.phone_number_2 != null ?
                    <div className='information-line w-full flex gap-2'>
                        <div className='w-1/3 text-slate-400'>Phone number 2</div>
                        <div className='w-2/3'>{teacherInfo.phone_number_2}</div>
                    </div>
                    :
                    ''
                }
                {
                    teacherInfo.address != null ?
                    <div className='information-line w-full flex gap-2'>
                        <div className='w-1/3 text-slate-400'>Address</div>
                        <div className='w-2/3'>{teacherInfo.address}</div>
                    </div>
                    :
                    ''
                }
                {
                    teacherInfo.neighborhood != null ?
                    <div className='information-line w-full flex gap-2'>
                        <div className='w-1/3 text-slate-400'>Neighborhood</div>
                        <div className='w-2/3'>{teacherInfo.neighborhood}</div>
                    </div>
                    :
                    ''
                }
                {
                    teacherInfo.city != null ?
                    <div className='information-line w-full flex gap-2'>
                        <div className='w-1/3 text-slate-400'>City</div>
                        <div className='w-2/3'>{teacherInfo.city}</div>
                    </div>
                    :
                    ''
                }
                {
                    teacherInfo.state != null ?
                    <div className='information-line w-full flex gap-2'>
                        <div className='w-1/3 text-slate-400'>State</div>
                        <div className='w-2/3'>{teacherInfo.state}</div>
                    </div>
                    :
                    ''
                }
                {
                    teacherInfo.zip_code != null ?
                    <div className='information-line w-full flex gap-2'>
                        <div className='w-1/3 text-slate-400'>Zip Code</div>
                        <div className='w-2/3'>{teacherInfo.zip_code}</div>
                    </div>
                    :
                    ''
                }

                <div className='w-full border my-2'></div>
                <div className='font-semibold mb-2'>Comments</div>

                {
                    teacherInfo.comments != null ?
                    <div className='information-line w-full flex gap-2'>
                        <div className='w-1/3 text-slate-400'>Genera comments</div>
                        <div className='w-2/3'>{teacherInfo.comments}</div>
                    </div>
                    :
                    ''
                }

            </div>
        </div>
    )
}
