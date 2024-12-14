import { Card, CardContent, CardFooter } from '@/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import axios from 'axios';
import { useContext, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Loader } from 'lucide-react';
import { UserContext } from '@/context/UserContext';

const Matching = () => {
    const token = localStorage.getItem('token');
    const [matching, setMatching] = useState([]);
    const [loading, setLoading] = useState(true);
    const { userData } = useContext(UserContext)
    const getMatching = async () => {
        try {
            setLoading(true);
            const res = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/api/user/matching`, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });
            if (res.status === 200) {
                const resData = await res.data;
                const filteredData = await resData.filter((profile) => profile.userId !== userData?.id);
                setMatching(filteredData);
            }

        } catch (error) {
            console.log(error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        getMatching();
    }, [userData]);

    return (
        <div className="min-h-screen dark:bg-gray-900 p-8 max-w-4xl mx-auto space-y-6">
            <h1 className="text-3xl font-bold text-center">Matching Profile</h1>
            {loading ? (
                <div className="flex justify-center items-center h-64">
                    <Loader className="animate-spin" />
                </div>
            ) : matching.length > 0 ? (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                    {matching.map((profile) => (
                        <Card key={profile.id} className="flex flex-col justify-between hover:shadow-lg duration-300">
                            <CardContent className="pt-6">
                                <div className="flex flex-col items-center justify-center space-y-2">
                                    <Avatar className="w-24 h-24">
                                        <AvatarImage src={profile.avatarUrl} alt={profile.name} />
                                        <AvatarFallback className="text-2xl">{profile.name.charAt(0)}</AvatarFallback>
                                    </Avatar>
                                    <Link
                                        to={`/profile/${profile.id}`}
                                        className="text-lg font-semibold hover:underline"
                                    >
                                        {profile.name}
                                    </Link>
                                    <Badge className="mt-2">{profile.role}</Badge>
                                </div>
                            </CardContent>
                            <CardFooter className="flex justify-center items-center">
                                <Button className="w-full">Connect</Button>
                            </CardFooter>
                        </Card>
                    ))}
                </div>
            ) : (
                <Card className="p-6">
                    <div className="text-center">
                        <h2 className="text-2xl font-semibold mb-2">No Profiles Available for Matching</h2>
                    </div>
                </Card>
            )}
        </div>
    );
};

export default Matching;
