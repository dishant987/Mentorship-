import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import axios from 'axios';
import { useEffect, useState } from 'react';
import { SearchBar } from '../components/SelectBar';
import { FilterSelect } from '../components/FilterSelect';
import { Link } from 'react-router-dom';
import { Card, CardContent, CardFooter } from '@/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';

const skillOptions = [
  { label: 'JavaScript', value: 'javascript' },
  { label: 'React', value: 'react' },
  { label: 'Node.js', value: 'nodejs' },
  { label: 'Python', value: 'python' },
  { label: 'Java', value: 'java' },
  { label: 'HTML', value: 'html' },
  { label: 'CSS', value: 'css' },
  { label: 'C++', value: 'cpp' },
  { label: 'C#', value: 'c#' },
  { label: 'PHP', value: 'php' },
  { label: 'Ruby', value: 'ruby' },
  { label: 'Swift', value: 'swift' },
  { label: 'Go', value: 'go' },
  { label: 'Rust', value: 'rust' },
  { label: 'Kotlin', value: 'kotlin' },
  { label: 'Objective-C', value: 'objective-c' },
  { label: 'Scala', value: 'scala' },
  { label: 'TypeScript', value: 'typescript' },
  { label: 'SQL', value: 'sql' },
  { label: 'NoSQL', value: 'nosql' },
  { label: 'GraphQL', value: 'graphql' },
  { label: 'Dart', value: 'dart' },
  { label: 'Flutter', value: 'flutter' },
  { label: 'React Native', value: 'react-native' },
  { label: 'Angular', value: 'angular' },
  { label: 'Vue.js', value: 'vuejs' },
  { label: 'Svelte', value: 'svelte' },
  { label: 'Next.js', value: 'nextjs' },
  { label: 'Nuxt.js', value: 'nuxtjs' },
  { label: 'Gatsby', value: 'gatsby' },
  { label: 'Jest', value: 'jest' },
  { label: 'Mocha', value: 'mocha' },
];

const interestOptions = [
  { label: 'Web Development', value: 'web-development' },
  { label: 'Mobile Development', value: 'mobile-development' },
  { label: 'Data Science', value: 'data-science' },
  { label: 'Machine Learning', value: 'machine-learning' },
  { label: 'DevOps', value: 'devops' },
  { label: 'UI/UX Design', value: 'ui-ux-design' },
  { label: 'Cloud Computing', value: 'cloud-computing' },
  { label: 'Artificial Intelligence', value: 'artificial-intelligence' },
  { label: 'Blockchain', value: 'blockchain' },
  { label: 'Cybersecurity', value: 'cybersecurity' },
  { label: 'Game Development', value: 'game-development' },
  { label: 'IoT', value: 'iot' },
  { label: 'Open Source', value: 'open-source' },
  { label: 'Technical Writing', value: 'technical-writing' },
  { label: 'Digital Marketing', value: 'digital-marketing' },
  { label: 'Automation', value: 'automation' },
  { label: 'unit testing', value: 'unit-testing' },
  { label: 'Graphic Design', value: 'graphic-design' },

];

function App() {
  const [data, setData] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedSkill, setSelectedSkill] = useState('');
  const [selectedInterest, setSelectedInterest] = useState('');

  const getData = async () => {
    try {
      const res = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/api/user/getAllProfiles`);
      if (res.status === 200) {
        setData(res.data);
      }
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    getData();
  }, []);

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
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
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
        </div>
        {filteredData.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 ">
            {filteredData.map((profile) => (
              <Card key={profile.id} className="flex flex-col justify-between hover:shadow-lg duration-300">
                <CardContent className="pt-6">
                  <div className="flex flex-col items-center space-y-4">
                    <Avatar className="w-24 h-24">
                      <AvatarImage src={profile.avatarUrl} alt={profile.name} />
                      <AvatarFallback className="text-2xl">{profile.name.charAt(0)}</AvatarFallback>
                    </Avatar>
                    <div className="text-center">
                      <Link href={`/profile/${profile.id}`} className="text-lg font-semibold hover:underline">
                        {profile.name}

                      </Link>
                      <p className="text-sm text-gray-500 dark:text-gray-400">{profile.email}</p>
                      <Badge className="mt-2">{profile.role}</Badge>
                    </div>
                  </div>
                </CardContent>
                <CardFooter className="flex justify-center pt-4">
                <Button className="w-full" >
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