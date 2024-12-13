import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from '@/components/ui/sheet'
import { DeleteProfileConfirmation } from '@/components/DeleteProfile'
import { ProfileDisplay } from '@/components/ProfileDisplay'
import { EditProfileForm } from '@/components/UpdateProfile'
import { CreateProfileForm } from '@/components/CreateProfile'
import { useProfile } from '@/hooks/userProfile'


export default function ProfilePage() {
    const { profile, createProfile, updateProfile, deleteProfile, isPending } = useProfile()
    const [isEditing, setIsEditing] = useState(false)
    const [isDeleting, setIsDeleting] = useState(false)

    return (
        <div className="container mx-auto px-4 py-8 flex  flex-col justify-center items-center">
            <h1 className="text-3xl font-bold mb-8">Profile</h1>
            {!profile  ? (
                <div className="space-y-4">
                    <p className="text-lg">You haven&apos;t created a profile yet. Create one to get started!</p>
                    <Sheet>
                        <SheetHeader>
                            <SheetTitle>Create Profile</SheetTitle>
                        </SheetHeader>
                        <SheetTrigger asChild>
                            <Button>Create Profile</Button>
                        </SheetTrigger>
                        <SheetContent>
                            <CreateProfileForm pending={isPending} onSubmit={createProfile} />
                        </SheetContent>
                    </Sheet>
                </div>
            ) : (
                <div className="space-y-6">
                    {!isEditing && !isDeleting && (
                        <div className='space-y-6 min-w-[400px]'>
                            <ProfileDisplay profile={profile} />
                            <div className="flex  justify-between">
                                <Button onClick={() => setIsEditing(true)}>Edit Profile</Button>
                                <Button variant="destructive" onClick={() => setIsDeleting(true)}>Delete Profile</Button>
                            </div>
                        </div>
                    )}
                    {isEditing && (
                        <Sheet>
                            <SheetTrigger asChild>
                                <Button>Edit Profile</Button>
                            </SheetTrigger>
                            <SheetContent>
                                <EditProfileForm
                                    profile={profile}
                                    onSubmit={(updatedProfile) => {
                                        updateProfile(updatedProfile)
                                        setIsEditing(false)
                                    }}
                                    onCancel={() => setIsEditing(false)}
                                />
                            </SheetContent>
                        </Sheet>
                    )}
                    {isDeleting && (
                        <DeleteProfileConfirmation
                            onConfirm={() => {
                                deleteProfile()
                                setIsDeleting(false)
                            }}
                            onCancel={() => setIsDeleting(false)}
                        />
                    )}
                </div>
            )}
        </div>
    )
}

