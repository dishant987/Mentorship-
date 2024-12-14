import { ProfileDisplay } from '@/components/ProfileDisplay'
import axios from 'axios'
import { Loader2 } from 'lucide-react'
import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'

const PublicProfile = () => {
  const { userId } = useParams()
  const [profile, setProfile] = useState(null)
  const [loading, setLoading] = useState(true)

  const getProfile = async () => {
    try {
      setLoading(true)
      const res = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/api/user/profile/${userId}`)
      console.log(res.data)
      if (res.status === 200) {
        setProfile(res.data)
      }
    } catch (error) {
      console.log(error)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    getProfile()
  }, [])

  return (
    <div className='container mx-auto px-4 py-8 max-w-[600px]'>
      {loading ? (
        <div className="flex justify-center items-center">
          <Loader2 className="animate-spin" />
        </div>
      ) : (
        profile && <ProfileDisplay profile={profile} />
      )}
    </div>
  )
}

export default PublicProfile
