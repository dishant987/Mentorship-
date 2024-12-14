import { useState } from 'react';
import { Bell } from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuGroup,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import toast from 'react-hot-toast';


export function Notifications() {
    const [notifications, setNotifications] = useState([
        { id: '1', title: 'New Message', message: 'You have a new message from John' },
        { id: '2', title: 'Friend Request', message: 'Jane sent you a friend request' },
    ]);

    const handleAccept = (id) => {
        setNotifications(notifications.filter(n => n.id !== id));

        toast.custom((t) => (
            <div
                className={`${t.visible ? 'animate-enter' : 'animate-leave'} 
            pointer-events-auto flex w-full max-w-md sm:max-w-sm md:max-w-lg rounded-lg 
            bg-white shadow-lg ring-1 ring-black ring-opacity-5`}
            >
                {console.log(t)}
                <div className="flex-1 w-0 p-4">
                    <div className="flex items-start">
                        <div className="flex-shrink-0 pt-0.5">
                            <Bell className="h-6 w-6 text-green-400" aria-hidden="true" />
                        </div>
                        <div className="ml-3 w-0 flex-1">
                            <p className="text-sm font-medium text-gray-900">Notification accepted</p>
                            <p className="mt-1 text-sm text-gray-500">Your notification has been accepted.</p>
                        </div>
                        <div className="ml-4 flex-shrink-0 flex">
                            <button
                                type="button"
                                className="inline-flex items-center justify-center w-8 h-8 rounded-full 
                            bg-gray-100 text-gray-600 hover:bg-gray-200 hover:text-gray-800 
                            focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                            // Correctly dismiss the specific toast
                            >
                                <span className="sr-only" onClick={() => toast.visible(false)}>Close</span>
                                <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth="2"
                                        d="M6 18L18 6M6 6l12 12"
                                    />
                                </svg>
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        ));

    };

    const handleReject = (id) => {
        setNotifications(notifications.filter(n => n.id !== id));
        toast.custom((t) => (
            <div
                className={`${t.visible ? 'animate-enter' : 'animate-leave'
                    } pointer-events-auto flex w-full max-w-md rounded-lg bg-white shadow-lg ring-1 ring-black ring-opacity-5`}
            >
                <div className="flex-1 w-0 p-4">
                    <div className="flex items-start">
                        <div className="flex-shrink-0 pt-0.5">
                            <Bell className="h-6 w-6 text-red-400" aria-hidden="true" />
                        </div>
                        <div className="ml-3 w-0 flex-1">
                            <p className="text-sm font-medium text-gray-900">Notification rejected</p>
                            <p className="mt-1 text-sm text-gray-500">Your notification has been rejected.</p>
                        </div>
                        <div className="ml-4 flex-shrink-0 flex">
                            <button
                                type="button"
                                className="inline-flex rounded-md bg-white text-gray-400 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                            >
                                <span className="sr-only">Close</span>
                                <Bell className="h-5 w-5" aria-hidden="true" />
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        ))
    };

    return (
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                <Button variant="ghost" className="relative p-2">
                    <Bell className="h-5 w-5" />
                    {notifications.length > 0 && (
                        <span className="absolute top-1 right-1 flex items-center justify-center h-3 w-3 text-xs font-bold text-white bg-red-600 rounded-full">
                            {notifications.length}
                        </span>
                    )}
                </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-72" align="end" forceMount>
                <DropdownMenuLabel>Notifications</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuGroup>
                    {notifications.length === 0 ? (
                        <DropdownMenuItem>No new notifications</DropdownMenuItem>
                    ) : (
                        notifications.map((notification) => (
                            <DropdownMenuItem key={notification.id} className="flex flex-col items-start">
                                <div className="font-semibold">{notification.title}</div>
                                <div className="text-sm text-gray-500">{notification.message}</div>
                                <div className="flex justify-end w-full mt-2">
                                    <Button
                                        variant="outline"
                                        size="sm"
                                        className="mr-2"
                                        onClick={() => handleAccept(notification.id)}
                                    >
                                        Accept
                                    </Button>
                                    <Button
                                        variant="outline"
                                        size="sm"
                                        onClick={() => handleReject(notification.id)}
                                    >
                                        Reject
                                    </Button>
                                </div>
                            </DropdownMenuItem>
                        ))
                    )}
                </DropdownMenuGroup>
            </DropdownMenuContent>
        </DropdownMenu>
    );
}

