import { useContext, useEffect, useState, useTransition } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Eye, EyeOff, Loader, Lock, Mail, } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import axios from 'axios';

import toast from 'react-hot-toast';
import { UserContext } from '@/context/UserContext';


export function Login() {
    const [showPassword, setShowPassword] = useState(false);
    const [isLoading, setIsLoading] = useState();
    const navigate = useNavigate();
    const { login } = useContext(UserContext);
    useEffect(() => {
        const token = localStorage.getItem('token');
        if (token) {
            navigate('/');
        }
    }, [])
    const handleSubmit = async (e) => {
        setIsLoading(true);
        e.preventDefault();
        try {
            const res = await axios.post(`${import.meta.env.VITE_BACKEND_URL}/api/auth/login`, {
                email: e.target.email.value,
                password: e.target.password.value,
            })
            if (res.data.message === "Login successful" && res.status === 200) {

                const token = res.data.token;
                const user = res.data.user;
                login(token, user);
                toast.success(res.data.message);
                navigate('/');
            }
        } catch (err) {
            if (err.response.status === 401) {
                toast.error(err.response.data.message);
                return
            }
            if (err.response.status === 404) {
                toast.error(err.response.data.message);
                return
            }
            toast.error(err.message);
        } finally {
            setIsLoading(false);
        }
      

    };
    return (
        <div className="min-h-[calc(100vh-8rem)] flex items-center justify-center p-4">
            <Card className="w-full max-w-md">
                <CardHeader className="space-y-1">
                    <CardTitle className="text-2xl font-bold text-center">
                        Welcome back
                    </CardTitle>
                    <CardDescription className="text-center">
                        Enter your email and password to login to your account
                    </CardDescription>
                </CardHeader>
                <form onSubmit={handleSubmit}>
                    <CardContent className="space-y-4">
                        <div className="space-y-2">
                            <Label htmlFor="email">Email</Label>
                            <div className="relative">
                                <Mail className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                                <Input
                                    id="email"
                                    type="email"
                                    placeholder="m@example.com"
                                    className="pl-9"
                                    required
                                />
                            </div>
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="password">Password</Label>
                            <div className="relative">
                                <Lock className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                                <Input
                                    id="password"
                                    type={showPassword ? 'text' : 'password'}
                                    className="pl-9 pr-9"
                                    required
                                    placeholder="********"
                                />
                                <button
                                    type="button"
                                    onClick={() => setShowPassword(!showPassword)}
                                    className="absolute right-3 top-3 text-muted-foreground hover:text-foreground"
                                >
                                    {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                                </button>
                            </div>

                        </div>
                    </CardContent>
                    <CardFooter className="flex flex-col gap-4">
                        <Button disabled={isLoading} type="submit" className="w-full">
                            {isLoading && <Loader className="h-4 w-4 animate-spin" />} Sign in
                        </Button>
                        <p className="text-sm text-center text-muted-foreground">
                            Don&apos;t have an account?{' '}
                            <Link to="/register" className="text-primary hover:underline">
                                Sign up
                            </Link>
                        </p>
                    </CardFooter>
                </form>
            </Card>
        </div >
    );
}