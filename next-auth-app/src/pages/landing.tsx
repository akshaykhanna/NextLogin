// pages/landing.tsx
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/router';

const LandingPage = () => {
    const { data: session } = useSession();
    const router = useRouter();

    if (!session) {
        router.push('/login');
        return null;
    }

    return (
        <div>
            <h1>Welcome to the Landing Page</h1>
            <p>This page is only accessible to authenticated users.</p>
        </div>
    );
};

export default LandingPage;
