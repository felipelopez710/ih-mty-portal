import { Button } from 'antd';
import AddOutlinedIcon from '@mui/icons-material/AddOutlined';
import FileUploadOutlinedIcon from '@mui/icons-material/FileUploadOutlined';
import MoreVertOutlinedIcon from '@mui/icons-material/MoreVertOutlined';

export default function HolidaysSection(){
    return(
        <div className='w-full flex flex-col gap-5 pb-5'>
            <div className="section-container w-full py-4 flex gap-5">
                <div className="w-1/3 sub-section-title flex flex-col gap-2">
                    <div className="font-semibold text-lg">
                        Fixed holidays
                    </div>
                    <div>
                        Set the holidays that will recur year after year
                    </div>
                    <div className='flex gap-2 pt-4'>
                        <Button 
                            type="primary" 
                            htmlType="submit"
                            className={'rounded-lg py-5 ih-button'}
                            icon={<AddOutlinedIcon/>}
                        >
                            New holiday
                        </Button>
                        <Button 
                            htmlType="submit"
                            className={'rounded-lg py-5'}
                            icon={<FileUploadOutlinedIcon/>}
                        >
                            Import CSV
                        </Button>
                    </div>
                </div>
                <div className="w-2/3">
                    <div className="w-full flex flex-col gap-4">
                        <div className='table-header w-full flex px-6'>
                            <div className='w-1/4'>Day of year</div>
                            <div className='flex-1'>Description</div>
                            <div className='w-12 text-center'>Action</div>
                        </div>
                        <div className='table-content w-full flex flex-col gap-2'>
                            <div className='table-header w-full flex px-6 py-4 rounded-lg bg-white border border-gray-300'>
                                <div className='w-1/4'>September 16</div>
                                <div className='flex-1'>Mexico's Independence day</div>
                                <div className='w-12 text-center'>
                                    <MoreVertOutlinedIcon/>
                                </div>
                            </div>
                            <div className='table-header w-full flex px-6 py-4 rounded-lg bg-white border border-gray-300'>
                                <div className='w-1/4'>November 20</div>
                                <div className='flex-1'>Mexico's Revolution day</div>
                                <div className='w-12 text-center'>
                                    <MoreVertOutlinedIcon/>
                                </div>
                            </div>
                            <div className='table-header w-full flex px-6 py-4 rounded-lg bg-white border border-gray-300'>
                                <div className='w-1/4'>December 24</div>
                                <div className='flex-1'>Christmas Eve</div>
                                <div className='w-12 text-center'>
                                    <MoreVertOutlinedIcon/>
                                </div>
                            </div>
                            <div className='table-header w-full flex px-6 py-4 rounded-lg bg-white border border-gray-300'>
                                <div className='w-1/4'>December 25</div>
                                <div className='flex-1'>Christmas</div>
                                <div className='w-12 text-center'>
                                    <MoreVertOutlinedIcon/>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div className='divider border border gray-300'></div>

            <div className="section-container w-full py-4 flex gap-5">
                <div className="w-1/3 sub-section-title flex flex-col gap-2">
                    <div className="font-semibold text-lg">
                        Flexible holidays
                    </div>
                    <div>
                        Set up holidays that will not repeat year after year. Make sure to set them ahead of time to avoid conflicts in class scheduling.
                    </div>
                    <div className='flex gap-2 pt-4'>
                        <Button 
                            type="primary" 
                            htmlType="submit"
                            className={'rounded-lg py-5 ih-button'}
                            icon={<AddOutlinedIcon/>}
                        >
                            New holiday
                        </Button>
                        <Button 
                            htmlType="submit"
                            className={'rounded-lg py-5'}
                            icon={<FileUploadOutlinedIcon/>}
                        >
                            Import CSV
                        </Button>
                    </div>
                </div>
                <div className="w-2/3">
                    <div className="w-full flex flex-col gap-4">
                        <div className='table-header w-full flex px-6'>
                            <div className='w-1/4'>Date</div>
                            <div className='flex-1'>Description</div>
                            <div className='w-12 text-center'>Action</div>
                        </div>
                        <div className='table-content w-full flex flex-col gap-2'>
                            <div className='table-header w-full flex px-6 py-4 rounded-lg bg-white border border-gray-300'>
                                <div className='w-1/4'>January 6, 2025</div>
                                <div className='flex-1'>Week off</div>
                                <div className='w-12 text-center'>
                                    <MoreVertOutlinedIcon/>
                                </div>
                            </div>
                            <div className='table-header w-full flex px-6 py-4 rounded-lg bg-white border border-gray-300'>
                                <div className='w-1/4'>January 7, 2025</div>
                                <div className='flex-1'>Week off</div>
                                <div className='w-12 text-center'>
                                    <MoreVertOutlinedIcon/>
                                </div>
                            </div>
                            <div className='table-header w-full flex px-6 py-4 rounded-lg bg-white border border-gray-300'>
                                <div className='w-1/4'>January 8, 2025</div>
                                <div className='flex-1'>Week off</div>
                                <div className='w-12 text-center'>
                                    <MoreVertOutlinedIcon/>
                                </div>
                            </div>
                            <div className='table-header w-full flex px-6 py-4 rounded-lg bg-white border border-gray-300'>
                                <div className='w-1/4'>January 9, 2025</div>
                                <div className='flex-1'>Week off</div>
                                <div className='w-12 text-center'>
                                    <MoreVertOutlinedIcon/>
                                </div>
                            </div>
                            <div className='table-header w-full flex px-6 py-4 rounded-lg bg-white border border-gray-300'>
                                <div className='w-1/4'>January 10, 2025</div>
                                <div className='flex-1'>Week off</div>
                                <div className='w-12 text-center'>
                                    <MoreVertOutlinedIcon/>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}