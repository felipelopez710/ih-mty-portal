import { Button } from 'antd';
import AddOutlinedIcon from '@mui/icons-material/AddOutlined';
import FileUploadOutlinedIcon from '@mui/icons-material/FileUploadOutlined';
import MoreVertOutlinedIcon from '@mui/icons-material/MoreVertOutlined';

export default function LevelsSection(){
    return(
        <div className="section-container w-full py-4 flex gap-5 pb-5">
            <div className="w-1/3 sub-section-title flex flex-col gap-2">
                <div className="font-semibold text-lg">
                    Levels
                </div>
                <div>
                    Set up the different learning levels. These will then be available to assign to materials and folios.
                </div>
                <div className='flex gap-2 pt-4'>
                    <Button 
                        type="primary" 
                        htmlType="submit"
                        className={'rounded-lg py-5 ih-button'}
                        icon={<AddOutlinedIcon/>}
                    >
                        New level
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
                        <div className='w-1/5'>Level</div>
                        <div className='flex-1'>Description</div>
                        <div className='w-1/4'>Area</div>
                        <div className='w-12 text-center'>Action</div>
                    </div>
                    <div className='table-content w-full flex flex-col gap-2'>
                        <div className='table-header w-full flex px-6 py-4 rounded-lg bg-white border border-gray-300'>
                            <div className='w-1/5'>101</div>
                            <div className='flex-1'>101 PRE-ELEMENTARY</div>
                            <div className='w-1/4'>English</div>
                            <div className='w-12 text-center'>
                                <MoreVertOutlinedIcon/>
                            </div>
                        </div>
                        <div className='table-header w-full flex px-6 py-4 rounded-lg bg-white border border-gray-300'>
                            <div className='w-1/5'>201</div>
                            <div className='flex-1'>201 ELEMENTARY</div>
                            <div className='w-1/4'>English</div>
                            <div className='w-12 text-center'>
                                <MoreVertOutlinedIcon/>
                            </div>
                        </div>
                        <div className='table-header w-full flex px-6 py-4 rounded-lg bg-white border border-gray-300'>
                            <div className='w-1/5'>301</div>
                            <div className='flex-1'>301 PRE-INTERMEDIATE</div>
                            <div className='w-1/4'>English</div>
                            <div className='w-12 text-center'>
                                <MoreVertOutlinedIcon/>
                            </div>
                        </div>
                        <div className='table-header w-full flex px-6 py-4 rounded-lg bg-white border border-gray-300'>
                            <div className='w-1/5'>401</div>
                            <div className='flex-1'>401 LOWER-INTERMEDIATE</div>
                            <div className='w-1/4'>English</div>
                            <div className='w-12 text-center'>
                                <MoreVertOutlinedIcon/>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}