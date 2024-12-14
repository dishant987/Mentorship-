import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import axios from 'axios';
import { useContext, useEffect, useState } from 'react';
import { SearchBar } from '../components/SelectBar';
import { FilterSelect } from '../components/FilterSelect';
import { Link } from 'react-router-dom';
import { Card, CardContent, CardFooter } from '@/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Loader } from 'lucide-react';
import { UserContext } from '@/context/UserContext';
import { interestOptions, skillOptions } from '../../public/data';

function App() {
  const [data, setData] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedSkill, setSelectedSkill] = useState('');
  const [selectedInterest, setSelectedInterest] = useState('');
  const [isSpinning, setIsSpinning] = useState(false);
  const { userData } = useContext(UserContext);

  const getData = async () => {
    try {
      const res = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/api/user/getAllProfiles`);
      if (res.status === 200) {
        const resData = res.data;
        // Filter data to exclude the current user's profile
        if (userData) {
          // Filter out the current user's profile if logged in
          const filteredData = resData.filter((profile) => profile.userId !== userData?.id);
          setData(filteredData); // Use the filtered data
        } else {
          setData(resData); // Show all profiles if no user is logged in
        }
        console.log(filteredData);
      }
    } catch (error) {
      console.error('Error fetching profiles:', error);
    }
  };

  useEffect(() => {
    getData();
  }, [userData]);

  const handleRefresh = () => {
    setIsSpinning(true);
    setTimeout(() => setIsSpinning(false), 300);
    setSearchQuery('');
    setSelectedSkill('');
    setSelectedInterest('');
  };

  const filteredData = data.filter((profile) => {
    const matchesSearch = profile.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      profile.email.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesSkill = !selectedSkill || profile.skills?.includes(selectedSkill);
    const matchesInterest = !selectedInterest || profile.interests?.includes(selectedInterest);

    return matchesSearch && matchesSkill && matchesInterest;
  });




  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 p-8">
      <h1 className='text-3xl font-bold mb-8 text-center'>User Profiles</h1>
      <div className="max-w-4xl mx-auto space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <SearchBar value={searchQuery} onChange={setSearchQuery} />
          <FilterSelect
            placeholder="Filter by skill"
            options={skillOptions}

            value={selectedSkill}
            onChange={setSelectedSkill}
          />
          <FilterSelect
            placeholder="Filter by interest"
            options={interestOptions}
            value={selectedInterest}
            onChange={setSelectedInterest}
          />
          <Button
            onClick={handleRefresh}
            variant="outline"
          >
            {isSpinning ? (
              <Loader className="animate-spin" />
            ) : (
              <>
                Refresh
              </>
            )}
          </Button>

        </div>

        {filteredData.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 ">
            {filteredData.map((profile) => (
              <Card key={profile.id} className="flex flex-col justify-between hover:shadow-lg duration-300">
                <CardContent className="pt-6">
                  <div className="flex flex-col items-center justify-center space-y-2">
                    <Avatar className="w-24 h-24">
                      <AvatarImage src={profile.avatarUrl} alt={profile.name} />
                      <AvatarFallback className="text-2xl">{profile.name.charAt(0)}</AvatarFallback>
                    </Avatar>

                    <Link to={`/profile/${profile.id}`} className="text-lg font-semibold hover:underline">
                      {profile.name}
                    </Link>

                    <Badge className="mt-2">{profile.role}</Badge>

                  </div>
                </CardContent>
                <CardFooter className="flex justify-center items-center">
                  <Button className="w-full"  >
                    Connect
                  </Button>
                  {/* {profile.connectionStatus === "none" && (
                    <Button className="w-full" >
                      Connect
                    </Button>
                  )}
                  {profile.connectionStatus === "pending" && (
                    <Button className="w-full" variant="outline" disabled>
                      Pending
                    </Button>
                  )}
                  {profile.connectionStatus === "connected" && (
                    <Button className="w-full" variant="secondary">
                      Connected
                    </Button>
                  )} */}
                </CardFooter>
              </Card>
            ))}
          </div>
        ) : (
          <Card className="p-6">
            <div className="text-center">
              <h2 className="text-2xl font-semibold mb-2">No Profiles Available</h2>
              <p className="text-gray-500 dark:text-gray-400">
                {searchQuery
                  ? "No profiles match your search criteria. Try adjusting your filters or search query."
                  : "There are currently no user profiles available."}
              </p>
            </div>
          </Card>
        )}
      </div>
    </div>
  );
}

export default App;