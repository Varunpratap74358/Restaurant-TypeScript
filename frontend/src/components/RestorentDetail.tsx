import { Timer } from 'lucide-react'
import fastFoodImg from '../../public/FaastFood.webp'
import { Badge } from './ui/badge'
import AvalibleMenue from './AvalibleMenue'

const RestorentDetail = () => {
  return (
    <div className="max-w-6xl mx-auto my-10">
      <div className="w-full">
        <div className="relative w-full md:h-64 lg:h-72">
            <img src={fastFoodImg} alt="res_img" className='object-cover w-full h-full rounded-lg shadow-lg' />
        </div>
        <div className="flex flex-col md:flex-row justify-between ">
            <div className="my-5">
                <h1 className='font-medium text-xl'>Restorent Name</h1>
                <div className="flex gap-2 my-2">
                    {
                        ['Samosa','Momos','Roll'].map((cuisine:string,index:number)=>(
                            <Badge key={index}>{cuisine}</Badge>
                        ))
                    }
                </div>
                <div className="flex md:flex-row flex-col gap-2 my-5">
                    <div className="flex items-center gap-2">
                        <Timer className='w-5 h-5' />
                        <h1 className='flex items-center gap-2 font-medium'>Delovery Time:{" "} 
                            <span className='text-red-300'>
                                35 mins
                            </span>
                        </h1>
                    </div>
                </div>
            </div>
        </div>
        <AvalibleMenue />
      </div>
    </div>
  )
}

export default RestorentDetail
