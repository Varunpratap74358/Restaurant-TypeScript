import React, { Dispatch, SetStateAction, useState } from "react"
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogTitle } from "./ui/dialog"
import { Label } from "./ui/label"
import { Input } from "./ui/input"
import { Button } from "./ui/button"

const CheckOutConfirmPage = ({ open, setOpen }: { open: boolean, setOpen: Dispatch<SetStateAction<boolean>> }) => {
    const [input, setInput] = useState({
        name: "",
        email: "",
        contact: "",
        address: "",
        city: "",
        country: ""
    })

    const changeEventHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
        setInput({ ...input, [e.target.name]: e.target.value })
    }

    const checkOutHandler = (e:React.FormEvent<HTMLFormElement>)=>{
        e.preventDefault()
        console.log(input)
    }

    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogContent>
                <DialogTitle className="text-xl">Reviw your order</DialogTitle>
                <DialogDescription>
                    Lorem ipsum, dolor sit amet consectetur adipisicing elit. Voluptatem error quaerat molestias alias, molestiae corporis!
                </DialogDescription>
                <form onSubmit={checkOutHandler}>
                    <div className="md:grid grid-cols-2 gap-2 space-y-1 md:space-y-0 my-5">
                        <div>
                            <Label>Fullname</Label>
                            <Input type="text" value={input.name} name="name" onChange={changeEventHandler}  />
                        </div>
                        <div>
                            <Label>Email</Label>
                            <Input type="email" value={input.email} name="email" onChange={changeEventHandler} />
                        </div>
                        <div>
                            <Label>Contact</Label>
                            <Input type="text" value={input.contact} name="contact" onChange={changeEventHandler} />
                        </div>
                        <div>
                            <Label>Address</Label>
                            <Input type="text" value={input.address} name="address" onChange={changeEventHandler} />
                        </div>
                        <div>
                            <Label>City</Label>
                            <Input type="text" value={input.city} name="city" onChange={changeEventHandler} />
                        </div>
                        <div>
                            <Label>Country</Label>
                            <Input type="text" value={input.country} name="country" onChange={changeEventHandler} />
                        </div>
                    </div>
                    <DialogFooter>
                        <Button className="w-full bg-blue-500 hover:bg-blue-600">Continue to payment</Button>
                    </DialogFooter>
                </form>
            </DialogContent>
        </Dialog>
    )
}

export default CheckOutConfirmPage
