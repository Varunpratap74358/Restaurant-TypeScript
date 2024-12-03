import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { restaurantFormSchema, RestaurantFormState } from "@/schema/restaurantSchema"
import { useRestaurant } from "@/store/useRestaurant"
import { useEffect, useState } from "react"

const Restourent = () => {
    const { loading, createRestaruant, restaurant, updateRestaurant, getRestaurant } = useRestaurant()
    const [errors, setErrors] = useState<Partial<RestaurantFormState>>({})

    const [input, setInput] = useState<RestaurantFormState>({
        restaurantName: "",
        city: "",
        country: "",
        deliveryTime: 0,
        cuisines: [],
        imageFile: undefined
    })

    const changeEventHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value, type } = e.target
        setInput({ ...input, [name]: type === 'number' ? Number(value) : value })
    }

    const submitHandler = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        const result = restaurantFormSchema.safeParse(input);
        if (!result.success) {
            const fieldErrors = result.error.formErrors.fieldErrors;
            setErrors(fieldErrors as Partial<RestaurantFormState>)
            return;
        }
        setErrors({})
        //api implimantation
        try {
            const formData = new FormData()
            formData.append('restaurantName', input.restaurantName);
            formData.append('city', input.city);
            formData.append('country', input.country);
            formData.append('deliveryTime', input.deliveryTime.toString());
            formData.append('cuisines', JSON.stringify(input.cuisines));
            if (input.imageFile) {
                formData.append('imageFile', input.imageFile);
            }
            if (restaurant) {
                //update restarauant
                await updateRestaurant(formData)
            } else {
                //create
                await createRestaruant(formData)
            }
        } catch (error) {
            console.log(error)
        }

    }

    useEffect(() => {
        const fetchRes = async () => {
            await getRestaurant()
            setInput({
                restaurantName: restaurant.restaurantName || "",
                city: restaurant.city || "",
                country: restaurant.country || "",
                deliveryTime:restaurant.deliveryTime ||  0,
                cuisines: restaurant.cuisines ? restaurant.cuisines.map((cuisine:string)=>cuisine) : [],
                imageFile: restaurant.imageFile || undefined
            })
        }
        fetchRes()
    }, [])

    return (
        <div className="max-w-6xl mx-auto my-10">
            <div className="">
                <h1 className="font-extrabold text-2xl mb-5">Add Restaurants</h1>
                <form onSubmit={submitHandler}>
                    <div className="md:grid grid-cols-2 gap-6 space-y-2 md:space-y-0">
                        {/* restorant name */}
                        <div className="">
                            <Label>Restaurant Name</Label>
                            <Input
                                type="text"
                                name="restaurantName"
                                placeholder="enter your restaurant name"
                                value={input.restaurantName}
                                onChange={changeEventHandler}
                            />
                            {
                                errors && <span className="text-sm text-red-500">{errors.restaurantName}</span>
                            }
                        </div>
                        <div className="">
                            <Label>City</Label>
                            <Input
                                type="text"
                                name="city"
                                placeholder="enter your restaurant city"
                                value={input.city}
                                onChange={changeEventHandler}
                            />
                            {
                                errors && <span className="text-sm text-red-500">{errors.city}</span>
                            }
                        </div>
                        <div className="">
                            <Label>Country</Label>
                            <Input
                                type="text"
                                name="country"
                                placeholder="enter your restaurant country name"
                                value={input.country}
                                onChange={changeEventHandler}
                            />
                            {
                                errors && <span className="text-sm text-red-500">{errors.country}</span>
                            }
                        </div>
                        <div className="">
                            <Label>Delivery Time</Label>
                            <Input
                                type="number"
                                name="deliveryTime"
                                placeholder="enter your delivery time"
                                value={input.deliveryTime}
                                onChange={changeEventHandler}
                            />
                            {
                                errors && <span className="text-sm text-red-500">{errors.deliveryTime}</span>
                            }
                        </div>
                        <div className="">
                            <Label>Cuisines</Label>
                            <Input
                                type="text"
                                name="cuisines"
                                placeholder="e.g. Momos, Samosa"
                                value={input.cuisines}
                                onChange={(e) => setInput({ ...input, cuisines: e.target.value.split(",") })}
                            />
                            {
                                errors && <span className="text-sm text-red-500">{errors.cuisines}</span>
                            }
                        </div>
                        <div className="">
                            <Label>Upload Restaurant Image</Label>
                            <Input
                                type="file"
                                accept="image/*"
                                name="imageFile"
                                onChange={(e) => setInput({ ...input, imageFile: e.target.files?.[0] || undefined })}
                            />
                            {/* {
                                errors && <span className="text-sm text-red-500">{errors.imageFile?.name || "Image file is required"}</span>
                            } */}
                        </div>
                    </div>
                    <div className="my-5 flex justify-center">
                        {
                            loading ? (
                                <Button disabled className="bg-yellow-600 hover:bg-yellow-700 w-full md:w-[50%] ">Restaurant Adding....</Button>
                            ) : (
                                <Button className="bg-yellow-600 hover:bg-yellow-700 w-full md:w-[50%] ">{restaurant ? "Update Your Restaurant" : "Add Your Restaurant"}</Button>
                            )
                        }
                    </div>
                </form>
            </div>
        </div>
    )
}

export default Restourent
