import { Link } from 'react-router-dom';
import { Container } from '../components/ui/Container';
import { Button } from '../components/ui/Button';

export const ThankYou = () => (
    <section className="py-16 text-center">
        <Container>
            <div className="max-w-md mx-auto">
                <div className="text-6xl mb-4">🎉</div>
                <h1 className="text-3xl font-bold text-[#333] dark:text-white">Thank You!</h1>
                <p className="mt-4 text-[#666] dark:text-gray-400">Your booking request has been received. We will contact you shortly.</p>
                <Link to="/">
                    <Button className="mt-8">Return Home</Button>
                </Link>
            </div>
        </Container>
    </section>
);