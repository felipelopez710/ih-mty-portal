import { Button } from 'antd';
import AddOutlinedIcon from '@mui/icons-material/AddOutlined';
import FileUploadOutlinedIcon from '@mui/icons-material/FileUploadOutlined';
import MoreVertOutlinedIcon from '@mui/icons-material/MoreVertOutlined';

export default function MaterialsSection(){
    return(
        <div className="section-container w-full py-4 flex gap-5 pb-5">
            <div className="w-1/3 sub-section-title flex flex-col gap-2">
                <div className="font-semibold text-lg">
                    Materials
                </div>
                <div>
                    Set up the different materials. These will then be available to assign to folios.
                </div>
                <div className='flex gap-2 pt-4'>
                    <Button 
                        type="primary" 
                        htmlType="submit"
                        className={'rounded-lg py-5 ih-button'}
                        icon={<AddOutlinedIcon/>}
                    >
                        New material
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
                        <div className='flex-1'>Material</div>
                        <div className='w-1/4'>Price</div>
                        <div className='w-1/5'>Level</div>
                        <div className='w-12 text-center'>Action</div>
                    </div>
                    <div className='table-content w-full flex flex-col gap-2'>
                        <div className='table-header w-full flex px-6 py-4 rounded-lg bg-white border border-gray-300'>
                            <div className='flex-1'>Ower Up 1 Young Learners</div>
                            <div className='w-1/4'>$950.00</div>
                            <div className='w-1/5'>101</div>
                            <div className='w-12 text-center'>
                                <MoreVertOutlinedIcon/>
                            </div>
                        </div>
                    </div>
                    <div className='table-content w-full flex flex-col gap-2'>
                        <div className='table-header w-full flex px-6 py-4 rounded-lg bg-white border border-gray-300'>
                            <div className='flex-1'>Netlanguages A1 Course Module 1 Units 1 - 5</div>
                            <div className='w-1/4'>$950.00</div>
                            <div className='w-1/5'>201</div>
                            <div className='w-12 text-center'>
                                <MoreVertOutlinedIcon/>
                            </div>
                        </div>
                    </div>
                    <div className='table-content w-full flex flex-col gap-2'>
                        <div className='table-header w-full flex px-6 py-4 rounded-lg bg-white border border-gray-300'>
                            <div className='flex-1'>Netlanguages A2 Course Module 1 Units 1 - 5</div>
                            <div className='w-1/4'>$950.00</div>
                            <div className='w-1/5'>301</div>
                            <div className='w-12 text-center'>
                                <MoreVertOutlinedIcon/>
                            </div>
                        </div>
                    </div>
                    <div className='table-content w-full flex flex-col gap-2'>
                        <div className='table-header w-full flex px-6 py-4 rounded-lg bg-white border border-gray-300'>
                            <div className='flex-1'>Netlanguages B1 Course Module 1 Units 1 - 5</div>
                            <div className='w-1/4'>$950.00</div>
                            <div className='w-1/5'>401</div>
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