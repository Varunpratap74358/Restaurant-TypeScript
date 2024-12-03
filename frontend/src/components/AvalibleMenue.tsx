import { Card, CardContent, CardFooter } from "./ui/card"
import fastFoodImg from '../../public/FaastFood.webp'
import { Button } from "./ui/button"

const AvalibleMenue = () => {
    return (
        <div className="md:p-4">
            <h1 className="text-xl md:text-2xl font-extrabold mb-6">Available Menue</h1>
            <div className="grid md:grid-cols-3 sm:px-2 sm:grid-cols-2 gap-3 space-y-4 md:space-y-0">
                {/* stalation lagana hai yaha par chatgpt se genrate kara ke */}
                <Card className="max-w--xs mx-auto shadow-lg rounded-lg overflow-hidden">
                    <img src={fastFoodImg} alt="card_img" className="w-full h-52 object-cover" />
                    <CardContent className="p-4">
                        <h2 className="text-xl font-semibold text-gray-800 dark:text-white">Samosa Tanduri</h2>
                        <p className="text-sm text-gray-600 mt-2">Lorem ipsum dolor, sit amet consectetur adipisicing elit. Eveniet, a?</p>
                        <h3 className="font-semibold text-lg mt-4">Price : <span className="text-red-400">80.rs</span></h3>
                    </CardContent>
                    <CardFooter className="p-4">
                        <Button className="bg-pink-600 w-full hover:bg-pink-700 duration-200 hover:shadow-xl transition-shadow shadow-pink-300">Add to cart</Button>
                    </CardFooter>
                </Card>
            </div>
        </div>
    )
}

export default AvalibleMenue
