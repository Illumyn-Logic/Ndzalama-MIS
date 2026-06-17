import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { schedules } from '../data/schedules';
import { Container } from '../components/ui/Container';
import { SectionTitle } from '../components/ui/SectionTitle';
import { Button } from '../components/ui/Button';

export const Apply = () => {
    //   const [searchParams] = useSearchParams();
    //   const courseSlug = searchParams.get('course');
    const { register, handleSubmit, formState: { isSubmitting } } = useForm();
    const navigate = useNavigate();

    const onSubmit = (data) => {
        console.log('Booking data:', data);
        // Simulate success
        setTimeout(() => navigate('/thank-you'), 500);
    };

    return (
        <section className="py-16">
            <Container>
                <SectionTitle title="Book Your Training" subtitle="Fill in the form and we'll confirm your spot" />
                <form onSubmit={handleSubmit(onSubmit)} className="max-w-2xl mx-auto space-y-6">
                    <div>
                        <label className="block text-sm font-medium text-[#333] dark:text-white">Full Name</label>
                        <input {...register('full_name', { required: true })} className="mt-1 w-full px-4 py-2 border border-[#e5e4e7] dark:border-[#2e303a] rounded-lg bg-white dark:bg-[#16171d] text-[#333] dark:text-white focus:ring-2 focus:ring-[#84ba3f] focus:border-transparent" />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-[#333] dark:text-white">Email</label>
                        <input {...register('email', { required: true })} type="email" className="mt-1 w-full px-4 py-2 border border-[#e5e4e7] dark:border-[#2e303a] rounded-lg bg-white dark:bg-[#16171d] text-[#333] dark:text-white focus:ring-2 focus:ring-[#84ba3f] focus:border-transparent" />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-[#333] dark:text-white">Phone</label>
                        <input {...register('phone', { required: true })} className="mt-1 w-full px-4 py-2 border border-[#e5e4e7] dark:border-[#2e303a] rounded-lg bg-white dark:bg-[#16171d] text-[#333] dark:text-white focus:ring-2 focus:ring-[#84ba3f] focus:border-transparent" />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-[#333] dark:text-white">Company (optional)</label>
                        <input {...register('company')} className="mt-1 w-full px-4 py-2 border border-[#e5e4e7] dark:border-[#2e303a] rounded-lg bg-white dark:bg-[#16171d] text-[#333] dark:text-white focus:ring-2 focus:ring-[#84ba3f] focus:border-transparent" />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-[#333] dark:text-white">Course Schedule</label>
                        <select {...register('schedule_id', { required: true })} className="mt-1 w-full px-4 py-2 border border-[#e5e4e7] dark:border-[#2e303a] rounded-lg bg-white dark:bg-[#16171d] text-[#333] dark:text-white focus:ring-2 focus:ring-[#84ba3f] focus:border-transparent">
                            <option value="">Select a schedule</option>
                            {schedules.map(s => (
                                <option key={s.id} value={s.id}>
                                    {s.startDate} – {s.endDate} ({s.location})
                                </option>
                            ))}
                        </select>
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-[#333] dark:text-white">Number of Delegates</label>
                        <input {...register('delegates', { min: 1 })} type="number" defaultValue="1" className="mt-1 w-full px-4 py-2 border border-[#e5e4e7] dark:border-[#2e303a] rounded-lg bg-white dark:bg-[#16171d] text-[#333] dark:text-white focus:ring-2 focus:ring-[#84ba3f] focus:border-transparent" />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-[#333] dark:text-white">Special Requests</label>
                        <textarea {...register('requests')} rows="3" className="mt-1 w-full px-4 py-2 border border-[#e5e4e7] dark:border-[#2e303a] rounded-lg bg-white dark:bg-[#16171d] text-[#333] dark:text-white focus:ring-2 focus:ring-[#84ba3f] focus:border-transparent" />
                    </div>
                    <Button type="submit" disabled={isSubmitting} className="w-full">
                        {isSubmitting ? 'Submitting...' : 'Submit Booking'}
                    </Button>
                </form>
            </Container>
        </section>
    );
};