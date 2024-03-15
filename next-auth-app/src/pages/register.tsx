// pages/register.tsx
import { signIn } from 'next-auth/react';

const RegisterPage = () => {
    const handleRegister = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const form = e.currentTarget;
        const username = form.username.value;
        const password = form.password.value;

        try {
            const response = await fetch('/api/auth/callback/credentials', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ username, password })
            });

            if (response.ok) {
                signIn('credentials', { username, password });
            } else {
                console.error('Registration error:', await response.text());
            }
        } catch (error) {
            console.error('Registration error:', error);
        }
    };

    return (
        <div>
            <h1>Register</h1>
            <form onSubmit={handleRegister}>
                <input type="text" placeholder="Username" name="username" />
                <input type="password" placeholder="Password" name="password" />
                <button type="submit">Register</button>
            </form>
        </div>
    );
};

export default RegisterPage;
