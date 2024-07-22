import Link from 'next/link';
import ModeEditOutlinedIcon from '@mui/icons-material/ModeEditOutlined';

export default function ClientInfo({ initialValues, clientInfo }: any) {
    return(
        <div className="w-full bg-white rounded-xl p-5 shadow-md flex flex-col gap-6">
            <div className="section-header flex justify-between items-center">
                <div className="text-base font-semibold">Client Detail</div>
                <Link href={`/clients/edit/${clientInfo.client_id}`}>
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
                    clientInfo.client_name != null ?
                    <div className='information-line w-full flex gap-2'>
                        <div className='w-1/3 text-slate-400'>Client name</div>
                        <div className='w-2/3'>{clientInfo.client_name}</div>
                    </div>
                    :
                    ''
                }
                {
                    clientInfo.client_type != null ?
                    <div className='information-line w-full flex gap-2'>
                        <div className='w-1/3 text-slate-400'>Type</div>
                        <div className='w-2/3'>{clientInfo.client_type}</div>
                    </div>
                    :
                    ''
                }
                {
                    clientInfo.rfc != null ?
                    <div className='information-line w-full flex gap-2'>
                        <div className='w-1/3 text-slate-400'>RFC</div>
                        <div className='w-2/3'>{clientInfo.rfc}</div>
                    </div>
                    :
                    ''
                }
                {
                    clientInfo.join_date != null ?
                    <div className='information-line w-full flex gap-2'>
                        <div className='w-1/3 text-slate-400'>Join date</div>
                        <div className='w-2/3'>{clientInfo.join_date}</div>
                    </div>
                    :
                    ''
                }
                {
                    clientInfo.termination_date != null ?
                    <div className='information-line w-full flex gap-2'>
                        <div className='w-1/3 text-slate-400'>Termination date</div>
                        <div className='w-2/3'>{clientInfo.termination_date}</div>
                    </div>
                    :
                    ''
                }
                <div className='w-full border my-2'></div>
                <div className='font-semibold mb-2'>Contact information</div>
                {
                    clientInfo.legal_representative != null ?
                    <div className='information-line w-full flex gap-2'>
                        <div className='w-1/3 text-slate-400'>Legal representative</div>
                        <div className='w-2/3'>{clientInfo.legal_representative}</div>
                    </div>
                    :
                    ''
                }
                {
                    clientInfo.email != null ?
                    <div className='information-line w-full flex gap-2'>
                        <div className='w-1/3 text-slate-400'>Email</div>
                        <div className='w-2/3'>{clientInfo.email}</div>
                    </div>
                    :
                    ''
                }
                {
                    clientInfo.website != null ?
                    <div className='information-line w-full flex gap-2'>
                        <div className='w-1/3 text-slate-400'>Website</div>
                        <div className='w-2/3'>{initialValues.website}</div>
                    </div>
                    :
                    ''
                }
                {
                    clientInfo.phone_number != null ?
                    <div className='information-line w-full flex gap-2'>
                        <div className='w-1/3 text-slate-400'>Phone number</div>
                        <div className='w-2/3'>{clientInfo.phone_number}</div>
                    </div>
                    :
                    ''
                }
                {
                    clientInfo.phone_number_2 != null ?
                    <div className='information-line w-full flex gap-2'>
                        <div className='w-1/3 text-slate-400'>Phone number 2</div>
                        <div className='w-2/3'>{clientInfo.phone_number_2}</div>
                    </div>
                    :
                    ''
                }
                {
                    clientInfo.address != null ?
                    <div className='information-line w-full flex gap-2'>
                        <div className='w-1/3 text-slate-400'>Address</div>
                        <div className='w-2/3'>{clientInfo.address}</div>
                    </div>
                    :
                    ''
                }
                {
                    clientInfo.neighborhood != null ?
                    <div className='information-line w-full flex gap-2'>
                        <div className='w-1/3 text-slate-400'>Neighborhood</div>
                        <div className='w-2/3'>{clientInfo.neighborhood}</div>
                    </div>
                    :
                    ''
                }
                {
                    clientInfo.city != null ?
                    <div className='information-line w-full flex gap-2'>
                        <div className='w-1/3 text-slate-400'>City</div>
                        <div className='w-2/3'>{clientInfo.city}</div>
                    </div>
                    :
                    ''
                }
                {
                    clientInfo.state != null ?
                    <div className='information-line w-full flex gap-2'>
                        <div className='w-1/3 text-slate-400'>State</div>
                        <div className='w-2/3'>{clientInfo.state}</div>
                    </div>
                    :
                    ''
                }
                {
                    clientInfo.zip_code != null ?
                    <div className='information-line w-full flex gap-2'>
                        <div className='w-1/3 text-slate-400'>Zip Code</div>
                        <div className='w-2/3'>{clientInfo.zip_code}</div>
                    </div>
                    :
                    ''
                }
                <div className='w-full border my-2'></div>
                <div className='font-semibold mb-2'>Comments</div>
                {
                    clientInfo.business != null ?
                    <div className='information-line w-full flex gap-2'>
                        <div className='w-1/3 text-slate-400'>Business info</div>
                        <div className='w-2/3'>{clientInfo.business}</div>
                    </div>
                    :
                    ''
                }
                {
                    clientInfo.comments != null ?
                    <div className='information-line w-full flex gap-2'>
                        <div className='w-1/3 text-slate-400'>Comments</div>
                        <div className='w-2/3'>{clientInfo.comments}</div>
                    </div>
                    :
                    ''
                }
            </div>
        </div>
    )
}