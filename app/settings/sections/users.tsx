import { Button } from 'antd';
import AddOutlinedIcon from '@mui/icons-material/AddOutlined';
import ManageAccountsOutlinedIcon from '@mui/icons-material/ManageAccountsOutlined';
import BadgeOutlinedIcon from '@mui/icons-material/BadgeOutlined';
import MoreVertOutlinedIcon from '@mui/icons-material/MoreVertOutlined';

export default function UsersSection(){
    return(
        <div className='w-full flex flex-col gap-5 pb-5'>
            <div className="section-container w-full py-4 flex gap-5">
                <div className="w-1/3 sub-section-title flex flex-col gap-2">
                    <div className="font-semibold text-lg">
                        Administrative staff
                    </div>
                    <div className='flex gap-2 pt-4'>
                        <Button 
                            type="primary" 
                            htmlType="submit"
                            className={'rounded-lg py-5 ih-button'}
                            icon={<AddOutlinedIcon/>}
                        >
                            New admin
                        </Button>
                    </div>
                </div>
                <div className="w-2/3">
                    <div className="w-full flex flex-col gap-4">
                        <div className='table-header w-full flex px-6'>
                            <div className='flex-1'>User</div>
                            <div className='w-1/4'>Alias</div>
                            <div className='w-1/4'>Mail</div>
                            <div className='w-12 text-center'>Action</div>
                        </div>
                        <div className='table-content w-full flex flex-col gap-2'>
                            <div className='table-content w-full flex flex-col gap-2'>
                                <div className='table-header w-full flex px-6 py-4 rounded-lg bg-white border border-gray-300'>
                                    <div className='flex-1 flex items-center gap-2'>
                                        <ManageAccountsOutlinedIcon/>
                                        <span>Alejandro Gorosabel</span>
                                    </div>
                                    <div className='w-1/4'>Alejandro</div>
                                    <div className='w-1/4'>alejandro@ihmty.com</div>
                                    <div className='w-12 text-center'>
                                        <MoreVertOutlinedIcon/>
                                    </div>
                                </div>
                            </div>
                            <div className='table-content w-full flex flex-col gap-2'>
                                <div className='table-header w-full flex px-6 py-4 rounded-lg bg-white border border-gray-300'>
                                    <div className='flex-1 flex items-center gap-2'>
                                        <ManageAccountsOutlinedIcon/>
                                        <span>Patricia Villalpando</span>
                                    </div>
                                    <div className='w-1/4'>Patricia</div>
                                    <div className='w-1/4'>patricia@ihmty.com</div>
                                    <div className='w-12 text-center'>
                                        <MoreVertOutlinedIcon/>
                                    </div>
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
                        Teachers
                    </div>
                    <div className='flex gap-2 pt-4'>
                        <Button 
                            type="primary" 
                            htmlType="submit"
                            className={'rounded-lg py-5 ih-button'}
                            icon={<AddOutlinedIcon/>}
                        >
                            New teacher
                        </Button>
                    </div>
                </div>
                <div className="w-2/3">
                    <div className="w-full flex flex-col gap-4">
                        <div className='table-header w-full flex px-6'>
                            <div className='flex-1'>Teacher</div>
                            <div className='w-1/4'>Alias</div>
                            <div className='w-1/4'>Mail</div>
                            <div className='w-12 text-center'>Action</div>
                        </div>
                        <div className='table-content w-full flex flex-col gap-2'>
                            <div className='table-content w-full flex flex-col gap-2'>
                                <div className='table-header w-full flex px-6 py-4 rounded-lg bg-white border border-gray-300'>
                                    <div className='flex-1 flex items-center gap-2'>
                                        <BadgeOutlinedIcon/>
                                        <span>Chris Green</span>
                                    </div>
                                    <div className='w-1/4'>Chris</div>
                                    <div className='w-1/4'>chris@ihmty.com</div>
                                    <div className='w-12 text-center'>
                                        <MoreVertOutlinedIcon/>
                                    </div>
                                </div>
                            </div>
                            <div className='table-content w-full flex flex-col gap-2'>
                                <div className='table-header w-full flex px-6 py-4 rounded-lg bg-white border border-gray-300'>
                                    <div className='flex-1 flex items-center gap-2'>
                                        <BadgeOutlinedIcon/>
                                        <span>Tom Morrisey</span>
                                    </div>
                                    <div className='w-1/4'>Tom</div>
                                    <div className='w-1/4'>tom@ihmty.com</div>
                                    <div className='w-12 text-center'>
                                        <MoreVertOutlinedIcon/>
                                    </div>
                                </div>
                            </div>
                            <div className='table-content w-full flex flex-col gap-2'>
                                <div className='table-header w-full flex px-6 py-4 rounded-lg bg-white border border-gray-300'>
                                    <div className='flex-1 flex items-center gap-2'>
                                        <BadgeOutlinedIcon/>
                                        <span>Mauricio Gorosabel</span>
                                    </div>
                                    <div className='w-1/4'>Mau</div>
                                    <div className='w-1/4'>mauricio@ihmty.com</div>
                                    <div className='w-12 text-center'>
                                        <MoreVertOutlinedIcon/>
                                    </div>
                                </div>
                            </div>
                            <div className='table-content w-full flex flex-col gap-2'>
                                <div className='table-header w-full flex px-6 py-4 rounded-lg bg-white border border-gray-300'>
                                    <div className='flex-1 flex items-center gap-2'>
                                        <BadgeOutlinedIcon/>
                                        <span>Monica Yenny</span>
                                    </div>
                                    <div className='w-1/4'>Monica</div>
                                    <div className='w-1/4'>monica@ihmty.com</div>
                                    <div className='w-12 text-center'>
                                        <MoreVertOutlinedIcon/>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}