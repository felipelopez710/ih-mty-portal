import LogoutOutlinedIcon from '@mui/icons-material/LogoutOutlined';

export default function UtilityBar() {

    return (
        <div className='utlity-bar py-4 px-6 bg-ih-blue flex justify-end'>
          <div className='user flex items-center rounded-xl bg-ih-overlay-blue text-white'>
            <div className='avatar w-8 h-8 bg-white flex items-center justify-center text-ih-blue font-semibold rounded-xl'>
              AG
            </div>
            <div className='px-3'>Alejandro Gorosabel - Administrador</div>
          </div>
          <div className='logout ml-2 w-8 h-8 bg-ih-overlay-blue flex items-center justify-center text-white rounded-xl'>
            <LogoutOutlinedIcon/>
          </div>
        </div>
    )

}