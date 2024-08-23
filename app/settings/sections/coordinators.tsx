import { Button } from 'antd';
import AddOutlinedIcon from '@mui/icons-material/AddOutlined';
import AccountCircleOutlinedIcon from '@mui/icons-material/AccountCircleOutlined';
import MoreVertOutlinedIcon from '@mui/icons-material/MoreVertOutlined';

export default function CoordinatorsSection(){
    return(
        <div className="section-container w-full py-4 flex gap-5 pb-5">
            <div className="w-1/3 sub-section-title flex flex-col gap-2">
                <div className="font-semibold text-lg">
                    Coordinators
                </div>
                <div>
                    Register the coordinators. They will be available to assign to the different folios
                </div>
                <div className='flex gap-2 pt-4'>
                    <Button 
                        type="primary" 
                        htmlType="submit"
                        className={'rounded-lg py-5 ih-button'}
                        icon={<AddOutlinedIcon/>}
                    >
                        New coordinator
                    </Button>
                </div>
            </div>
            <div className="w-2/3">
                <div className="w-full flex flex-col gap-4">
                    <div className='table-header w-full flex px-6'>
                        <div className='flex-1'>Coordinator</div>
                        <div className='w-1/4'>Alias</div>
                        <div className='w-1/4'>Member since</div>
                        <div className='w-12 text-center'>Action</div>
                    </div>
                    <div className='table-content w-full flex flex-col gap-2'>
                        <div className='table-header w-full flex px-6 py-4 rounded-lg bg-white border border-gray-300'>
                            <div className='flex-1 flex items-center gap-2'>
                                <AccountCircleOutlinedIcon/>
                                <span>Alejandro Gorosabel</span>
                            </div>
                            <div className='w-1/4'>Alejandro</div>
                            <div className='w-1/4'>Jan 1, 2000</div>
                            <div className='w-12 text-center'>
                                <MoreVertOutlinedIcon/>
                            </div>
                        </div>
                    </div>
                    <div className='table-content w-full flex flex-col gap-2'>
                        <div className='table-header w-full flex px-6 py-4 rounded-lg bg-white border border-gray-300'>
                            <div className='flex-1 flex items-center gap-2'>
                                <AccountCircleOutlinedIcon/>
                                <span>Patricia Villalpando</span>
                            </div>
                            <div className='w-1/4'>Patricia</div>
                            <div className='w-1/4'>Jan 1, 2000</div>
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