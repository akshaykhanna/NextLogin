// pages/login.tsx
import { signIn } from 'next-auth/react';

const LoginPage = () => {
    const handleLogin = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const target = e.target as typeof e.target & {
            username: { value: string };
            password: { value: string };
        };
        signIn('credentials', { username: target.username.value, password: target.password.value });
    };

    return (
        <div>
            <h1>Login</h1>
            <form onSubmit={handleLogin}>
                <input type="text" placeholder="Username" name="username" />
                <input type="password" placeholder="Password" name="password" />
                <button type="submit">Login</button>
            </form>
        </div>
    );
};

export default LoginPage;
