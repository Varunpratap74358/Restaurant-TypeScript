import { Link, useParams } from 'react-router-dom'
import FilterPage from './FilterPage'
import { Input } from './ui/input'
import { useEffect, useState } from 'react'
import { Button } from './ui/button'
import { Badge } from './ui/badge'
import { Globe, MapPin, X } from 'lucide-react'
import { Card, CardContent, CardFooter } from './ui/card'
import { AspectRatio } from './ui/aspect-ratio'
import fastFoodImg from '../../public/FaastFood.webp'
import { useRestaurant } from '@/store/useRestaurant'

const SearchPage = () => {
  const params = useParams()
  // console.log(params.text)
  const {searchResyarauant,searchedRestaurant} = useRestaurant()
  const [searchQuery, setSearchQuery] = useState<string>('')

  useEffect(()=>{
    const fetchSearchRes = async()=>{
      await searchResyarauant(params.text!,searchQuery,"Samosa")
    }
    fetchSearchRes()
  },[])
  return (
    <div className="max-w-7xl mx-auto my-10">
      <div className="flex flex-col md:flex-row justify-between gap-10">
        <FilterPage />
        <div className="flex-1">
          {/* Search input fild */}
          <div className="flex items-center gap-2">
            <Input
              type="text"
              value={searchQuery}
              placeholder="search by restaurent & cuisines"
              onChange={(e) => setSearchQuery(e.target.value)}
            />
            <Button className="">Search</Button>
          </div>
          <div className="">
            <div className="flex flex-col gap-3 md:flex-row md:items-center md:gap-2 my-3">
              <h1 className="text-xl font-bold">
                (<span className="text-red-500">2</span>) Search result found
              </h1>
              <div className="flex flex-wrap gap-2 mb-4 md:mb-0">
                {['kichdi', 'Chole', 'Samosa'].map(
                  (item: string, idx: number) => {
                    return (
                      <div
                        className="relative inline-flex items-center max-w-full"
                        key={idx}
                      >
                        <Badge
                          className="text-red-300 hover:cursor-pointer rounded-md pr-6 whitespace-nowrap"
                          variant={'outline'}
                        >
                          {item}
                        </Badge>
                        <X
                          className="absolute text-red-300 right-1 cursor-pointer"
                          size={16}
                        />
                      </div>
                    )
                  },
                )}
              </div>
            </div>
            {/* card */}
            <div className="grid md:grid-cols-3 gap-4 px-3 md:px-0">
              {[1, 2, 3, 4, 5].map((_, index: number) => {
                return (
                  <Card
                    key={index}
                    className="bg-white dark:bg-gray-800 shadow-xl rounded-xl overflow-hidden hover:shadow-2xl transition-shadow duration-300"
                  >
                    <div className="relative">
                      <AspectRatio ratio={16 / 9} className="bg-muted">
                        <img
                          src={fastFoodImg}
                          alt=""
                          className="w-full h-full object-cover"
                        />
                      </AspectRatio>
                      <div className="absolute top-2 left-2 bg-white dark:bg-gray-700 bg-opacity-75 rounded-lg py-1 px-3">
                        <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
                          Featured
                        </span>
                      </div>
                    </div>
                    <CardContent className="p-4">
                      <h1 className="font-bold text-2xl text-gray-900 dark:text-gray-300">
                        Pizza Hunt
                      </h1>
                      <div className="mt-2 gap-1 flex items-center text-gray-600 dark:text-gray-400">
                        <MapPin size={16} />
                        <p className="text-sm">
                          City: <span className="font-medium">Delhi</span>
                        </p>
                      </div>
                      <div className="mt-2 gap-1 flex items-center text-gray-600 dark:text-gray-400">
                        <Globe size={16} />
                        <p className="text-sm">
                          Country: <span className="font-medium">Delhi</span>
                        </p>
                      </div>
                      <div className="flex gap-2 mt-4 flex-wrap">
                        {['kichdi', 'Chole', 'Samosa'].map(
                          (cuisine: string, idx: number) => {
                            return (
                              <Badge
                                key={idx}
                                className="font-medium px-2 py-1 rounded-full shadow-sm"
                              >
                                {cuisine}
                              </Badge>
                            )
                          },
                        )}
                      </div>
                    </CardContent>
                    <CardFooter className="p-4 border-t dark:border-t-gray-700 border-t-gray-100 text-white flex justify-end">
                      <Link to={`/restaurant/${1234}`}>
                        <Button className="bg-yellow-500 hover:bg-yellow-600 font-semibold py-2 px-4 rounded-full shadow-md transition-colors duration-200">
                          View Menue's
                        </Button>
                      </Link>
                    </CardFooter>
                  </Card>
                )
              })}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default SearchPage



const SearchPageSkeletion = ()=>{
  return(
    <Card className="bg-white dark:bg-gray-800 shadow-xl rounded-xl overflow-hidden hover:shadow-2xl transition-shadow duration-300">
      {/* Image Skeleton */}
      <div className="relative">
        <AspectRatio ratio={16 / 9} className="bg-muted">
          <div className="w-full h-full bg-gray-300 dark:bg-gray-700 animate-pulse" />
        </AspectRatio>
        <div className="absolute top-2 left-2 bg-gray-200 dark:bg-gray-600 bg-opacity-75 rounded-lg py-1 px-3 animate-pulse">
          <span className="text-sm font-medium text-transparent">Loading</span>
        </div>
      </div>

      {/* Content Skeleton */}
      <CardContent className="p-4">
        {/* Title Skeleton */}
        <div className="h-6 bg-gray-300 dark:bg-gray-700 animate-pulse rounded-lg mb-4 w-3/4" />

        {/* Location Skeleton */}
        <div className="mt-2 gap-1 flex items-center">
          <div className="w-5 h-5 bg-gray-300 dark:bg-gray-700 animate-pulse rounded-full" />
          <div className="h-4 bg-gray-300 dark:bg-gray-700 animate-pulse rounded-lg w-2/3" />
        </div>

        {/* Country Skeleton */}
        <div className="mt-2 gap-1 flex items-center">
          <div className="w-5 h-5 bg-gray-300 dark:bg-gray-700 animate-pulse rounded-full" />
          <div className="h-4 bg-gray-300 dark:bg-gray-700 animate-pulse rounded-lg w-1/2" />
        </div>

        {/* Badge Skeleton */}
        <div className="flex gap-2 mt-4 flex-wrap">
          {[...Array(3)].map((_, idx) => (
            <div
              key={idx}
              className="h-6 bg-gray-300 dark:bg-gray-700 animate-pulse rounded-full w-20"
            />
          ))}
        </div>
      </CardContent>

      {/* Footer Skeleton */}
      <CardFooter className="p-4 border-t dark:border-t-gray-700 border-t-gray-100 flex justify-end">
        <div className="h-10 bg-gray-300 dark:bg-gray-700 animate-pulse rounded-full w-32" />
      </CardFooter>
    </Card>
  )
}


const NoResultFound = ({searchText}:{searchText:string})=>{
  return(
    <div className="text-center">
      <h1 className='text-2xl font-bold text-gray-700 dark:text-slate-100'>No Result found </h1>
      <p className='mt-2 text-gray-500 dark:text-gray-400'>
      We could't find any results for "{searchText}". <br />Try Search with a diffrent term.
      </p>
      <Link to={'/'}>
        <Button className='mt-4 bg-yellow-600 hover:bg-yellow-700'>Go Back to Home</Button>
      </Link>
    </div> 
  )
}