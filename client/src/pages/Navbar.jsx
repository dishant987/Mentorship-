import { Menu, X, LogOut } from 'lucide-react';
import { useContext, useState } from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';

import { UserNav } from '@/components/UserNav';
import { Notifications } from '@/components/Notification';
import { UserContext } from '@/context/UserContext';


export default function Navbar() {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const { isLoggedIn,  logout } = useContext(UserContext);


    return (
        <header className="border-b">
            <div className="container mx-auto px-4">
                <div className="flex h-16 items-center justify-between">
                    <Link to="/" className="text-2xl font-bold">
                        MentorShip
                    </Link>

                    {/* Desktop Navigation */}
                    <nav className="hidden md:flex items-center gap-6">
                        <Link to="/" className="text-sm font-medium hover:text-primary">
                            Home
                        </Link>
                        {
                            isLoggedIn && <Link to="/matching" className="text-sm font-medium hover:text-primary">
                                Matching
                            </Link>
                        }

                        <Notifications />
                        {isLoggedIn ? (
                            <UserNav />
                        ) : (
                            <div className="flex items-center gap-2">
                                <Button variant="ghost" asChild>
                                    <Link to="/login">Login</Link>
                                </Button>
                                <Button asChild>
                                    <Link to="/register">Register</Link>
                                </Button>
                            </div>
                        )}
                    </nav>

                    {/* Mobile Menu Button */}
                    <button
                        className="md:hidden"
                        onClick={() => setIsMenuOpen(!isMenuOpen)}
                    >
                        {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
                    </button>
                </div>

                {/* Mobile Navigation */}
                {isMenuOpen && (
                    <div className="md:hidden py-4">
                        <nav className="flex flex-col gap-4">
                            <Link
                                to="/"
                                className="text-sm font-medium hover:text-primary"
                                onClick={() => setIsMenuOpen(false)}
                            >
                                Home
                            </Link>

                            {
                                isLoggedIn && <Link to="/matching" onClick={() => setIsMenuOpen(false)} className="text-sm font-medium hover:text-primary">
                                    Matching
                                </Link>
                            }

                            {isLoggedIn ? (
                                <Button onClick={logout} variant="ghost" asChild>
                                    <Link to="/" className="flex items-center gap-2">
                                        <LogOut strokeWidth={1.75} />
                                        Logout
                                    </Link>
                                </Button>
                            ) : (
                                <div className="flex flex-col gap-2">
                                    <Button variant="ghost" asChild>
                                        <Link to="/login" onClick={() => setIsMenuOpen(false)}>
                                            Login
                                        </Link>
                                    </Button>
                                    <Button asChild>
                                        <Link to="/register" onClick={() => setIsMenuOpen(false)}>
                                            Register
                                        </Link>
                                    </Button>
                                </div>
                            )}
                        </nav>
                    </div>
                )}
            </div>
        </header>
    );
}
