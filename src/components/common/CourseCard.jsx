import { Link } from 'react-router-dom';

export const CourseCard = ({ course }) => (
    <Link to={`/courses/${course.slug}`} className="group block bg-white dark:bg-[#16171d] rounded-lg shadow-md hover:shadow-xl transition-shadow overflow-hidden">
        <img src={course.image} alt={course.title} className="w-full h-48 object-cover" />
        <div className="p-6">
            <h3 className="text-xl font-semibold text-[#333] dark:text-white group-hover:text-[#84ba3f] transition-colors">
                {course.title}
            </h3>
            <p className="mt-2 text-sm text-[#666] dark:text-gray-400">{course.shortDesc}</p>
            <p className="mt-3 text-sm text-[#84ba3f] font-medium">Duration: {course.duration}</p>
        </div>
    </Link>
);