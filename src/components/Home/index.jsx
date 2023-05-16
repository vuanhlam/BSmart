
import MentorInfo from "./Mentor"
import CourseInfo  from "./CourseDetail/CourseInfo"
import CourseProgress from "./CourseDetail/CourseProgress"

const NewCourse = () => {
    return (
        <main className="container-lg main-content mt-3  mb-3">
            <div className="row d-flex colmun-gap-4">
                <section className="col-4">
                    <MentorInfo />  
                </section>
                <section className="col-8">
                    <div>
                        <CourseInfo />
                    </div>
                    <div className="mt-3">
                        <CourseProgress />
                    </div>
                    <div className="mt-3">
                        <CourseProgress />
                    </div>
                </section>
            </div>
        </main>
    )
}

export default NewCourse