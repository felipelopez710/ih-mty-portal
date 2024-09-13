import TeacherInfo from "./teacher-info"
import FoliosInfo from "./folios-info"

export default function TeacherInfromation({teacherInfo}:any){
    return(
        <div className="w-full max-w-5xl flex justify-center gap-5">
            <div className="w-2/5">
                <TeacherInfo teacherInfo={teacherInfo}/>
            </div>
            <div className="w-3/5">
                <FoliosInfo/>
            </div>
        </div>
    )
}