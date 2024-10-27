'use client'

import { createClient } from '@/utils/supabase/client';
import { Button, Drawer } from 'antd';
import AddOutlinedIcon from '@mui/icons-material/AddOutlined';
import FileUploadOutlinedIcon from '@mui/icons-material/FileUploadOutlined';
import MoreVertOutlinedIcon from '@mui/icons-material/MoreVertOutlined';
import EditOutlinedIcon from '@mui/icons-material/EditOutlined';
import RemoveCircleOutlineOutlinedIcon from '@mui/icons-material/RemoveCircleOutlineOutlined';
import { useEffect, useState } from 'react';
import NewMaterialForm from './components/new-material-modal';
import EditMaterialForm from './components/edit-material-modal';

export default function MaterialsSection(){
    const supabase = createClient();
    const [materialList, setMaterialList]:any = useState(undefined)
    const [drawerOpen, setDrawerOpen] = useState(false)
    const [createdMaterial, setCreatedMaterial] = useState(undefined)
    const [editDrawer, setEditDrawer] = useState(false)
    const [defaultValues, setDefaultValues]:any = useState(undefined) // Stores the initial values of the 'Edit material' form

    // Opens the 'New material' modal
    const openDrawer = () => {
        setDrawerOpen(true);
    };

    // Closes the 'New material' modal
    const onClose = () => {
        setDrawerOpen(false)
    }

    // Opens the 'Edit material' modal
    const openEditDrawer = (material:any) => () => {
        console.log(material)
        setDefaultValues(material)
        setEditDrawer(true);
    };

    // Closes the 'Edit material' modal
    const onEditDrawerClose = () => {
        setEditDrawer(false)
        setDefaultValues(undefined)
    }

    async function getMaterials(){
        const { data:materials, error:materialError } = await supabase.from('materials').select('*, levels(level_id, level), sublevels(sublevel_id, sublevel)')
        if(materials){
            // console.log(materials)
            setMaterialList(materials)
        }
        if(materialError){
            console.log('Error: ', materialError)
        }
    }

    useEffect(() => {
        getMaterials()
    }, [createdMaterial])   

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
                        onClick={openDrawer}
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
                        <div className='flex items-center gap-2 w-14 justify-end'>
                            Actions
                        </div>
                    </div>
                    {
                        materialList !== undefined &&
                        <div className='table-content w-full flex flex-col gap-2'>
                            {
                                materialList.map((material:any)=>(
                                    <div key={material.material_id} className='w-full flex items-center px-6 py-4 rounded-lg bg-white border border-gray-300'>
                                        <div className='flex-1 flex flex-col'>
                                            <span className='font-semibold'>
                                                {material.material_description}
                                            </span>
                                            <span className='text-xs'>
                                                {`${material.levels.level} | ${material.sublevels.sublevel}`}
                                            </span>
                                        </div>
                                        <div className='w-1/4'>{`$${material.price_to_public}`}</div>
                                        <div className='flex items-center gap-2 w-14 justify-end'>
                                            <div className='cursor-pointer' onClick={openEditDrawer(material)}>
                                                <EditOutlinedIcon/>
                                            </div>
                                            <RemoveCircleOutlineOutlinedIcon/>
                                        </div>
                                    </div>
                                ))
                            }
                        </div>
                    }
                </div>
            </div>
            <Drawer
                title={'New Material'}
                width={500}
                open={drawerOpen}
                onClose={onClose}
            >
                <NewMaterialForm setDrawerOpen={setDrawerOpen} setCreatedMaterial={setCreatedMaterial} />
            </Drawer>
            <Drawer
                title={'Edit Material'}
                width={500}
                open={editDrawer}
                onClose={onEditDrawerClose}
            >
                <EditMaterialForm setEditDrawer={setEditDrawer} setCreatedMaterial={setCreatedMaterial} defaultValues={defaultValues} />
            </Drawer>
        </div>
    )
}