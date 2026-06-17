export const TestimonialCard = ({ testimonial }) => (
    <div className="bg-white dark:bg-[#16171d] p-6 rounded-lg shadow-sm">
        <div className="flex items-center gap-1 text-[#84ba3f]">
            {'★'.repeat(testimonial.rating)}
            {'☆'.repeat(5 - testimonial.rating)}
        </div>
        <p className="mt-3 text-[#333] dark:text-gray-200 italic">"{testimonial.content}"</p>
        <div className="mt-4 flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-[#84ba3f] flex items-center justify-center text-white font-bold">
                {testimonial.clientName.charAt(0)}
            </div>
            <div>
                <p className="font-semibold text-[#333] dark:text-white">{testimonial.clientName}</p>
                <p className="text-sm text-[#666] dark:text-gray-400">{testimonial.role}</p>
            </div>
        </div>
    </div>
);