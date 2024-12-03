import { useState } from 'react'
import { Input } from './ui/input'
import { Search } from 'lucide-react'
import { Button } from './ui/button'
import FaastFood from '/public/FaastFood.webp'
import { useNavigate } from 'react-router-dom'

const HeroSection = () => {
  const [searchText, setSearchText] = useState<string>('')
  const navigate = useNavigate()
  const searchHandler=(e:React.FormEvent<HTMLFormElement>)=>{
    e.preventDefault()
    if(!searchText){
      return;
    }
    navigate(`/search/${searchText}`)
  }

  return (
    <div className="flex flex-col md:flex-row mx-auto md:p-10 rounded-lg items-center justify-center m-4 gap-20">
      <div className="flex flex-col gap-10 md:w-[40%]">
        <div className="flex flex-col gap-5">
          <h1 className="font-bold md:font-extrabold md:text-5xl text-4xl">
            Order Food anytime & anywhere
          </h1>
          <p className="text-gray-500">
            Lorem, ipsum dolor sit amet consectetur adipisicing elit. Illo rem
            suscipit repellat, doloribus alias quaerat?
          </p>
        </div>
        <form onSubmit={searchHandler} className="relative flex items-center gap-2 ">
          <Input
            type="text"
            value={searchText}
            placeholder='search restorent by name'
            onChange={(e) => setSearchText(e.target.value)}
            className="pl-10 font-semibold shadow-lg "
          />
          <Search className="text-gray-500 absolute inset-y-2 left-2" />
          <Button className="bg-yellow-500 hover:bg-yellow-600">Search</Button>
        </form>
      </div>
      <div>
        <img src={FaastFood} alt="" className='object-cover w-full max-h-[500px] ' />
      </div>
    </div>
  )
}

export default HeroSection
