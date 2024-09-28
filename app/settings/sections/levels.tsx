'use client'

import { createClient } from '@/utils/supabase/client';
import { Button } from 'antd';
import AddOutlinedIcon from '@mui/icons-material/AddOutlined';
import EditOutlinedIcon from '@mui/icons-material/EditOutlined';
import RemoveCircleOutlineOutlinedIcon from '@mui/icons-material/RemoveCircleOutlineOutlined';
import FileUploadOutlinedIcon from '@mui/icons-material/FileUploadOutlined';
import MoreVertOutlinedIcon from '@mui/icons-material/MoreVertOutlined';
import Accordion from '@mui/material/Accordion';
import AccordionActions from '@mui/material/AccordionActions';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { useEffect, useState } from 'react';

export default function LevelsSection(){
    const supabase = createClient();
    const [levelList, setLevelList]:any = useState(undefined)
    const [sublevelList, setSublevelList]:any = useState(undefined)

    async function getLevels(){
        const { data: levels, error: levelsError } = await supabase.from('levels').select()
        if(levels){
            console.log(levels)
            setLevelList(levels)
        }
        if(levelsError){
            console.log('Error:', levelsError)
        }
    }

    async function getSublevels(){
        const { data: sublevels, error: sublevelErrors } = await supabase.from('sublevels').select()
        if(sublevels){
            console.log(sublevels)
            setSublevelList(sublevels)
        }
        if(sublevelErrors){
            console.log(sublevelErrors)
        }
    }

    useEffect(() => {
        getLevels()
        getSublevels()
    }, [])
    
    return(
        <div className="section-container w-full py-5 flex gap-5 pb-5">
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
                    <div className='table-header w-full flex !px-6'>
                        <div className='w-1/5'>Level</div>
                        <div className='flex-1'>Description</div>
                        <div className='w-1/4'>Area</div>
                        <div className='w-6 text-center'></div>
                    </div>

                    <div className='levels-list flex flex-col gap-2'>
                    {
                        levelList?.map((level:any)=>(
                            <Accordion key={level.level_id} className='!rounded-xl shadow-none border border-gray-300 px-0'>
                                <AccordionSummary
                                    expandIcon={<ExpandMoreIcon />}
                                    aria-controls="panel-content"
                                    id="panel-header"
                                    className='px-6'
                                >
                                    <div className='w-full flex rounded-lg'>
                                        <div className='w-1/5 font-semibold'>{level.level}</div>
                                        <div className='flex-1'>{level.description}</div>
                                        <div className='w-1/4'>{level.area_level}</div>
                                    </div>
                                </AccordionSummary>
                                <AccordionDetails className='border-t border-gray-300'>
                                    {
                                        sublevelList !== undefined &&
                                        <div className='w-full flex flex-col gap-2 pt-3'>
                                            <div>Sublevels</div>
                                            {
                                                sublevelList.map((sublevel:any)=>{
                                                    if(sublevel.level_id === level.level_id){
                                                        return(
                                                            <div key={sublevel.sublevel_id} className='w-full px-4 py-3 rounded-lg border border-gray-300 flex items-center gap-5'>
                                                                <div className='flex-1 flex flex-col'>
                                                                    <div className='font-semibold'>{sublevel.sublevel}</div>
                                                                    <div className='text-xs'>{sublevel.description}</div>
                                                                </div>
                                                                <div className='flex items-center gap-2'>
                                                                    <EditOutlinedIcon/>
                                                                    <RemoveCircleOutlineOutlinedIcon/>
                                                                </div>
                                                            </div>
                                                        )
                                                    }
                                                })
                                            }
                                        </div>
                                        
                                    }
                                </AccordionDetails>
                                <AccordionActions className='p-4'>
                                    <Button>Edit level</Button>
                                    <Button type="primary">New sublevel</Button>
                                </AccordionActions>
                            </Accordion>
                        ))
                    }
                    </div>
                </div>
            </div>
        </div>
    )
}