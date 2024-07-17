import LogoutOutlinedIcon from '@mui/icons-material/LogoutOutlined';

export default function UtilityBar() {

    return (
        <div className='utlity-bar py-4 px-6 bg-white flex justify-end border-b border-light-blue'>
          <div className='user flex items-center rounded-xl bg-light-blue text-ih-blue'>
            <div className='avatar w-8 h-8 bg-ih-blue flex items-center justify-center text-white font-semibold rounded-xl'>
              AG
            </div>
            <div className='px-3'>Alejandro Gorosabel - Administrador</div>
          </div>
          <div className='logout ml-2 w-8 h-8 bg-light-blue flex items-center justify-center text-ih-blue rounded-xl'>
            <LogoutOutlinedIcon/>
          </div>
        </div>
    )

}