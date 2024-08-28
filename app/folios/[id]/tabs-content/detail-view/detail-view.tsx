'use client'

import FolioInfo from "./folio-info"
import FolioFrequency from "./folio-frequency"

export default function DetailView({ folioInformation, folioFrequency } : any){
    return(
        <div className="main-container w-full flex justify-center p-5">
           <div className="detail-container w-full max-w-5xl">

           <div className="w-full flex gap-5">
                <div className="w-1/2">
                    <FolioInfo folioInformation={folioInformation} />
                </div>
                <div className="w-1/2">
                    <FolioFrequency folioFrequency={folioFrequency}/>
                </div>
            </div>
                
           </div>
        </div>
    )
}