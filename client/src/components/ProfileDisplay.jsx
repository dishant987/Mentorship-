
import { Badge } from '@/components/ui/badge'
import { Label } from './ui/label'
import { Textarea } from './ui/textarea'


export function ProfileDisplay({ profile }) {
    return (
        <div className="bg-white shadow rounded-lg p-6 flex flex-col gap-1">
            <h2 className=" font-semibold mb-4 flex  items-center gap-3 ">
                <Label>Name : </Label>
                    <span>{profile.name}</span>
            </h2>
            <p className="text-gray-600 mb-2 flex  items-center gap-3 ">
                <Label>Email : </Label>
                <span>{profile.email}</span>
            </p>
            <div>
                <h3 className="text-lg font-semibold mb-2">Bio</h3>
               <Textarea value={profile.bio} readOnly />
            </div>
            <div className="mb-4">
                <h3 className="text-lg font-semibold mb-2">Role</h3>
                <Badge>{profile.role}</Badge>
            </div>
            <div className="mb-4">
                <h3 className="text-lg font-semibold mb-2">Skills</h3>
                <div className="flex flex-wrap gap-2">
                    {profile.skills.map((skill) => (
                        <Badge key={skill} variant="secondary">{skill}</Badge>
                    ))}
                </div>
            </div>
            <div>
                <h3 className="text-lg font-semibold mb-2">Interests</h3>
                <div className="flex flex-wrap gap-2">
                    {profile.interests.map((interest) => (
                        <Badge key={interest} variant="outline">{interest}</Badge>
                    ))}
                </div>
            </div>
        </div>
    )
}