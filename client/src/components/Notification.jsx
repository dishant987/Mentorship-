import { useContext, useEffect, useState } from 'react';
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
import axios from 'axios';
import { UserContext } from '@/context/UserContext';

export function Notifications() {
    const [notifications, setNotifications] = useState([]);
    const { userData } = useContext(UserContext);

    const getNotifications = async () => {
        const id = userData?.id;
        const token = localStorage.getItem('token');

        if (!id || !token) return; // Ensure valid user and token

        try {
            const res = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/api/notification/${id}`, {
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${token}`,
                },
            });
            console.log(res.data);
            setNotifications(res.data);
        } catch (error) {
            console.error('Failed to fetch notifications:', error);
        }
    };

    useEffect(() => {
        getNotifications();
    }, [userData]);

    const handleAccept = (id) => {
        setNotifications((prev) => prev.filter((n) => n.id !== id));
        toast.success('Notification accepted.');
    };

    const handleReject = (id) => {
        setNotifications((prev) => prev.filter((n) => n.id !== id));
        toast.error('Notification rejected.');
    };

    return (
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                <Button variant="ghost" className="relative p-2">
                    <Bell className="h-5 w-5" />
                    {Array.isArray(notifications) && notifications.length > 0 && (
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
                                <p className="text-sm font-medium leading-none">Friend Request from <span className='font-bold'>{notification.senderName}</span> </p>
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
