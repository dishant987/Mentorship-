import { Link } from 'react-router-dom';
import { Github, Twitter, Linkedin } from 'lucide-react';

export default function Footer() {
    return (
        <footer className="border-t">
            <div className="container mx-auto px-4 py-8">
                <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
                    <div>
                        <h3 className="text-lg font-semibold mb-4">About Us</h3>
                        <p className="text-sm text-muted-foreground">
                            We're dedicated to providing the best service to our customers.
                            Building trust through innovation and reliability.
                        </p>
                    </div>

                    <div>
                        <h3 className="text-lg font-semibold mb-4">Quick Links</h3>
                        <ul className="space-y-2">
                            <li>
                                <Link to="/" className="text-sm hover:text-primary">
                                    Home
                                </Link>
                            </li>
                            <li>
                                <Link to="/about" className="text-sm hover:text-primary">
                                    About
                                </Link>
                            </li>
                            <li>
                                <Link to="/contact" className="text-sm hover:text-primary">
                                    Contact
                                </Link>
                            </li>
                        </ul>
                    </div>

                    <div>
                        <h3 className="text-lg font-semibold mb-4">Legal</h3>
                        <ul className="space-y-2">
                            <li>
                                <Link to="/privacy" className="text-sm hover:text-primary">
                                    Privacy Policy
                                </Link>
                            </li>
                            <li>
                                <Link to="/terms" className="text-sm hover:text-primary">
                                    Terms of Service
                                </Link>
                            </li>
                            <li>
                                <Link to="/cookies" className="text-sm hover:text-primary">
                                    Cookie Policy
                                </Link>
                            </li>
                        </ul>
                    </div>

                    <div>
                        <h3 className="text-lg font-semibold mb-4">Connect</h3>
                        <div className="flex space-x-4">
                            <a
                                href="https://github.com"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="hover:text-primary"
                            >
                                <Github size={20} />
                            </a>
                            <a
                                href="https://twitter.com"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="hover:text-primary"
                            >
                                <Twitter size={20} />
                            </a>
                            <a
                                href="https://linkedin.com"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="hover:text-primary"
                            >
                                <Linkedin size={20} />
                            </a>
                        </div>
                    </div>
                </div>

                <div className="mt-8 pt-8 border-t text-center text-sm text-muted-foreground">
                    <p>&copy; {new Date().getFullYear()} MyApp. All rights reserved.</p>
                </div>
            </div>
        </footer>
    );
}