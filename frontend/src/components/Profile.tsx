import {  LocateIcon, Mail, MapPin, MapPinHouse, Plus } from 'lucide-react'
import { Avatar, AvatarFallback, AvatarImage } from './ui/avatar'
import { FormEvent, useRef, useState } from 'react'
import { Input } from './ui/input'
import { Label } from './ui/label'
import { Button } from './ui/button'
import { RiLoader2Fill } from 'react-icons/ri'
import { useUserStore } from '@/store/useUserStore'

const Profile = () => {
  const {updateProflie,loading} = useUserStore()
  const [profileData, setProfiledata] = useState({
    fullname: '',
    email: '',
    address: '',
    city: '',
    country: '',
    profilePicture: '',
  })
  const imageRef = useRef<HTMLInputElement | null>(null)
  const [selectedProfilePic, setSelectedProfilePic] = useState<string>('')

  const fileChangehandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      const reader = new FileReader()
      reader.onloadend = () => {
        const result = reader.result as string
        setSelectedProfilePic(result)
        setProfiledata((prevData) => ({
          ...prevData,
          profilePicture: result,
        }))
      }
      reader.readAsDataURL(file)
    }
  }

  const changeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    setProfiledata({ ...profileData, [e.target.name]: e.target.value })
  }

  const updateProfileHamdler = async(e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    console.log(profileData)
    await updateProflie(profileData)
  }

  return (
    <form className="max-w-7xl mx-auto my-5" onSubmit={updateProfileHamdler}>
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Avatar className="relative md:w-28 md:h-28 w-20 h-20">
            <AvatarImage src={selectedProfilePic}/>
            <AvatarFallback>cn</AvatarFallback>
            <input
              ref={imageRef}
              type="file"
              className="hidden"
              accept="image/*"
              onChange={fileChangehandler}
            />
            <div
              onClick={() => imageRef.current?.click()}
              className="absolute inset-0 flex items-center justify-center opacity-0 hover:opacity-100 transition-opacity duration-300 bg-black bg-opacity-50 rounded-full cursor-pointer"
            >
              <Plus className="text-white w-8 h-8" />
            </div>
          </Avatar>
          <Input
            type="text"
            name='fullname'
            value={profileData.fullname}
            onChange={changeHandler}
            className="font-bold text-2xl md:text-3xl outline-none border-none focus-visible:ring-transparent"
          />
        </div>
      </div>
      <div className="grid md:grid-cols-4 md:gap-2 gap-3 my-10">
        <div className="flex items-center gap-4 roundde-sm p-2  bg-gray-200">
          <Mail className="text-gray-500" />
          <div className="w-full">
            <Label>Email</Label>
            <input
              type="email"
              value={profileData.email}
              onChange={changeHandler}
              name='email'
              className="w-full text-gray-600 bg-transparent focus-visible:ring-0 focus-visible:border-transparent outline-none border-none"
            />
          </div>
        </div>
        <div className="flex items-center gap-4 roundde-sm p-2  bg-gray-200">
          <LocateIcon className="text-gray-500" />
          <div className="w-full">
            <Label>Address</Label>
            <input
              type="text"
              name='address'
              value={profileData.address}
              onChange={changeHandler}
              className="w-full text-gray-600 bg-transparent focus-visible:ring-0 focus-visible:border-transparent outline-none border-none"
            />
          </div>
        </div>
        <div className="flex items-center gap-4 roundde-sm p-2 bg-gray-200 ">
          <MapPin className="text-gray-500" />
          <div className="w-full">
            <Label>City</Label>
            <input
              type="text"
              value={profileData.city}
              name='city'
              onChange={changeHandler}
              className="w-full text-gray-600 bg-transparent focus-visible:ring-0 focus-visible:border-transparent outline-none border-none"
            />
          </div>
        </div>
        <div className="flex items-center gap-4 roundde-sm p-2 bg-gray-200 ">
          <MapPinHouse className="text-gray-500" />
          <div className="w-full">
            <Label>Country</Label>
            <input
              type="text"
              value={profileData.country}
              name='country'
              onChange={changeHandler}
              className="w-full text-gray-600 bg-transparent focus-visible:ring-0 focus-visible:border-transparent outline-none border-none"
            />
          </div>
        </div>
      </div>
      <div className="text-center">
        {
            loading ? (
                <Button className='bg-yellow-600 hover:bg-yellow-700 w-full md:w-[50%]' disabled><RiLoader2Fill className='animate-spin' />Updating...</Button>
            ):(
                <Button className='bg-yellow-600 hover:bg-yellow-700 w-full md:w-[50%] hover:shadow-xl shadow-slate-300 duration-300 transition-all'>Update</Button>
            )
        }
      </div>
    </form>
  )
}

export default Profile
