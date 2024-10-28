'use client'

import { createClient } from '@/utils/supabase/client';
import { Button, Select, Drawer, Modal } from 'antd';
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
import NewLevelForm from './components/new-level-modal';
import NewSubLevelForm from './components/new-sublevel-modal';
import EditLevelForm from './components/edit-level-modal';
import EditSubLevelForm from './components/edit-sublevel-modal';

export default function LevelsSection(){
    const supabase = createClient();
    const [loading, setLoading] = useState(false)
    const [levelList, setLevelList]:any = useState(undefined)
    const [sublevelList, setSublevelList]:any = useState(undefined)
    const [activeLevel, setActiveLevel]:any = useState(undefined)
    const [defaultValues, setDefaultValues]:any = useState(undefined)

    /* <--------------- Level controlers ---------------> */

    const [levelDrawerOpen, setLevelDrawerOpen] = useState(false) // Controls the 'New level' modal (true = open)
    const [editLevelDrawer, setEditLevelDrawer] = useState(false) // Controls the 'Edit level' modal (true = open)
    const [createdLevel, setCreatedLevel]:any = useState(undefined) // Triggers the useEffect to update the list
    const [deleteLevelModal, setDeleteLevelModal] = useState(false) // Controls the 'Delete level' modal (true = open)
    const [levelToDelete, setLevelToDelete]:any = useState(undefined) // Stores the level that is about to be deleted

    // Opens the 'New Level' modal
    const openLevelDrawer = () => {
        setLevelDrawerOpen(true);
    };

    // Closes the 'New Level' modal
    const onClose = () => {
        setLevelDrawerOpen(false)
    }

    // Opens the 'Edit level' modal
    const openEditLevelDrawer = (level:any) => () => {
        console.log(level)
        setDefaultValues(level)
        setEditLevelDrawer(true);
    };

    // Closes the 'Edit level' modal
    const onEditLevelDrawerClose = () => {
        setEditLevelDrawer(false)
        setDefaultValues(undefined)
    }

    // Opens the 'Delete level' modal
    const openDeleteLevelModal = (level:any) => () => {
        setLevelToDelete(level)
        setDeleteLevelModal(true)
    }

    // Closes the 'Delete level' modal
    const closeDeleteLevelModal = () => {
        setLevelToDelete(undefined)
        setDeleteLevelModal(false)
    }

    // Deactivate the selected level
    const deactivateLevel = async() => {
        setLoading(true)
        const { data: updatedLevel, error: levelError } = await supabase.from('levels').update({
            status: 'disabled'
        })
        .eq('level_id', levelToDelete.level_id)
        .select()

        setTimeout(() => {
            setLoading(false)
            setLevelToDelete(undefined)
            setCreatedLevel(updatedLevel)
            setDeleteLevelModal(false)
        }, 1000);
    }

    /* <--------------- Level controlers ---------------> */

    /* <--------------- Sublevel controlers ---------------> */
    const [sublevelDrawerOpen, setSublevelDrawerOpen] = useState(false) // Controls the 'New sublevel' modal (true = open)
    const [editSublevelDrawer, setEditSublevelDrawer] = useState(false) // Controls the 'Edit sublevel' modal (true = open)
    const [createdSublevel, setCreatedSublevel]:any = useState(undefined) // Triggers the useEffect to update the list
    const [deleteSublevelModal, setDeleteSublevelModal] = useState(false) // Controls the 'Delete Sublevel' modal (true = open)
    const [sublevelToDelete, setSublevelToDelete]:any = useState(undefined)

    // Opens the 'New sublevel' modal
    const openSublevelDrawer = (levelId:any) => () => {
        setSublevelDrawerOpen(true);
        setActiveLevel(levelId)
    };

    // Closes the 'New sublevel' modal
    const onCloseSublevel = () => {
        setSublevelDrawerOpen(false)
        setActiveLevel(undefined)
    }

    // Opens the 'Edit level' modal
    const openEditSublevelDrawer = (sublevel:any) => () => {
        console.log(sublevel)
        setDefaultValues(sublevel)
        setEditSublevelDrawer(true);
    };

    // Closes the 'Edit level' modal
    const onEditSublevelDrawerClose = () => {
        setEditSublevelDrawer(false)
        setDefaultValues(undefined)
    }

    // Opens the 'Delete sublevel' modal
    const openDeleteSublevelModal = (sublevel:any) => () => {
        setSublevelToDelete(sublevel)
        setDeleteSublevelModal(true)
    }

    // Closes the 'Delete sublevel' modal
    const closeDeleteSublevelModal = () => {
        setSublevelToDelete(undefined)
        setDeleteSublevelModal(false)
    }

    // Deactivate the selected sublevel
    const deactivateSublevel = async() => {
        setLoading(true)
        const { data: updatedSublevel, error: sublevelError } = await supabase.from('sublevels').update({
            status: 'disabled'
        })
        .eq('sublevel_id', sublevelToDelete.sublevel_id)
        .select()

        setTimeout(() => {
            setLoading(false)
            setSublevelToDelete(undefined)
            setCreatedSublevel(updatedSublevel)
            setDeleteSublevelModal(false)
        }, 1000);
    }

    /* <--------------- Sublevel controlers ---------------> */

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
    }, [createdLevel, createdSublevel])
    
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
                        onClick={openLevelDrawer}
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
                        levelList?.map((level:any)=>{
                            if(level.status !== 'disabled'){
                                return(
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
                                                            if((sublevel.level_id === level.level_id) && (sublevel.status !== 'disabled')){
                                                                return(
                                                                    <div key={sublevel.sublevel_id} className='w-full px-4 py-3 rounded-lg border border-gray-300 flex items-center gap-5'>
                                                                        <div className='flex-1 flex flex-col'>
                                                                            <div className='font-semibold'>{sublevel.sublevel}</div>
                                                                            <div className='text-xs'>{sublevel.description}</div>
                                                                        </div>
                                                                        <div className='flex items-center gap-2'>
                                                                            <div className='cursor-pointer' onClick={openEditSublevelDrawer(sublevel)}>
                                                                                <EditOutlinedIcon/>
                                                                            </div>
                                                                            <div className='cursor-pointer' onClick={openDeleteSublevelModal(sublevel)}>
                                                                                <RemoveCircleOutlineOutlinedIcon/>
                                                                            </div>
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
                                            <Button key="delete" danger disabled={loading} onClick={openDeleteLevelModal(level)}>
                                                Delete level
                                            </Button>
                                            <Button onClick={openEditLevelDrawer(level)}>Edit level</Button>
                                            <Button 
                                                type="primary"
                                                onClick={openSublevelDrawer(level.level_id)}
                                            >
                                                New sublevel
                                            </Button>
                                        </AccordionActions>
                                    </Accordion>
                                )
                            }
                        })
                    }
                    </div>
                </div>
            </div>
            <Drawer
                title={'New Level'}
                width={500}
                open={levelDrawerOpen}
                onClose={onClose}
            >
                <NewLevelForm 
                    setLevelDrawerOpen={setLevelDrawerOpen} 
                    setCreatedLevel={setCreatedLevel} 
                />
            </Drawer>
            <Drawer
                title={'Edit Level'}
                width={500}
                open={editLevelDrawer}
                onClose={onEditLevelDrawerClose}
            >
                <EditLevelForm
                    setEditLevelDrawer={setEditLevelDrawer} 
                    setCreatedLevel={setCreatedLevel} 
                    defaultValues={defaultValues}
                />
            </Drawer>

            <Drawer
                title={'New Sublevel'}
                width={500}
                open={sublevelDrawerOpen}
                onClose={onCloseSublevel}
            >
                <NewSubLevelForm 
                    setSublevelDrawerOpen={setSublevelDrawerOpen} 
                    setCreatedSublevel={setCreatedSublevel}
                    levelList={levelList} 
                    activeLevel={activeLevel}
                />
            </Drawer>
            <Drawer
                title={'Edit Sublevel'}
                width={500}
                open={editSublevelDrawer}
                onClose={onEditSublevelDrawerClose}
            >
                <EditSubLevelForm
                    setEditSublevelDrawer={setEditSublevelDrawer} 
                    setCreatedSublevel={setCreatedSublevel}
                    levelList={levelList} 
                    defaultValues={defaultValues}
                />
            </Drawer>

            {/* Delete modals */}
            <Modal
                title="Delete level"
                centered
                open={deleteLevelModal}
                onOk={deactivateLevel}
                onCancel={closeDeleteLevelModal}
                footer={[
                    <Button key="cancel" onClick={closeDeleteLevelModal}>
                        Cancel
                    </Button>,
                    <Button key="delete" danger disabled={loading} onClick={deactivateLevel}>
                        Delete level
                    </Button>
                ]}
            >
                <p>Are you sure you want to dele the level: {levelToDelete?.level}?</p>
            </Modal>
            <Modal
                title="Delete sublevel"
                centered
                open={deleteSublevelModal}
                onOk={deactivateSublevel}
                onCancel={closeDeleteSublevelModal}
                footer={[
                    <Button key="cancel" onClick={closeDeleteSublevelModal}>
                        Cancel
                    </Button>,
                    <Button key="delete" danger disabled={loading} onClick={deactivateSublevel}>
                        Delete sublevel
                    </Button>
                ]}
            >
                <p>Are you sure you want to dele the sublevel: {sublevelToDelete?.sublevel} </p>
            </Modal>
        </div>
    )
}