'use client'

import FolioInfo from "./folio-info"
import FolioFrequency from "./folio-frequency"

export default function DetailView(){
    return(
        <div className="main-container w-full flex justify-center">
           <div className="detail-container w-full max-w-5xl">

           <div className="w-full flex gap-5">
                <div className="w-1/2">
                    <FolioInfo/>
                </div>
                <div className="w-1/2">
                    <FolioFrequency/>
                </div>
            </div>
                
           </div>
        </div>
    )
}