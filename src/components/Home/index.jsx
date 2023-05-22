
import MentorInfo from "./Mentor"
import CourseInfo  from "./CourseDetail/CourseInfo"
import CourseProgress from "./CourseDetail/CourseProgress"
import CourseTime from "./CourseDetail/CourseTime"

const NewCourse = () => {
    return (
        <main className="container-lg main-content mt-3  mb-3">
            <div className="row d-flex colmun-gap-4">
                <section className="col-lg-4 col-md-12 col-sm-12 col-12">
                    <MentorInfo />  
                </section>
                <section className="col-lg-8 col-md-12 col-sm-12 col-12">
                    <div>
                        <CourseInfo />
                    </div>
                    <div className="mt-3">
                        <CourseProgress />
                    </div>
                    <div className="mt-3">
                        <CourseTime />
                    </div>
                </section>
            </div>
        </main>
    )
}

export default NewCourse