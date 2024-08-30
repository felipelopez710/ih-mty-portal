import { LoadingOutlined } from '@ant-design/icons';
import { Spin } from 'antd';

export default function Loading(){
    return(
        <div className="w-full pt-5 flex items-center justify-center">
            <Spin indicator={<LoadingOutlined spin />} size="large" />
        </div>
    )
}