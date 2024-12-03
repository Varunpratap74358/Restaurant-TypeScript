import { AvatarImage } from "@radix-ui/react-avatar"
import { Avatar, AvatarFallback } from "./ui/avatar"
import { Button } from "./ui/button"
import { Table, TableBody, TableCell, TableFooter, TableHead, TableHeader, TableRow } from "./ui/table"
import { Minus, Plus } from "lucide-react"
import { useState } from "react"
import CheckOutConfirmPage from "./CheckOutConfirmPage"

const Cart = () => {
    const [open,setOpen] = useState<boolean>(false)
    return (
        <div className="flex flex-col max-w-7xl mx-auto my-10">
            <div className="flex justify-end">
                <Button variant={'link'}>Clear All</Button>
            </div>
            <Table>
                <TableHeader>
                    <TableRow className="text-xl font-bold">
                        <TableHead>Items</TableHead>
                        <TableHead>Title</TableHead>
                        <TableHead>Price</TableHead>
                        <TableHead>Quantity</TableHead>
                        <TableHead>Total</TableHead>
                        <TableHead className="text-right">Remove</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    <TableRow className="text-lg">
                        <TableCell>
                            <Avatar>
                                <AvatarImage />
                                <AvatarFallback>CN</AvatarFallback>
                            </Avatar>
                        </TableCell>
                        <TableCell>Samosa</TableCell>
                        <TableCell>25.rs</TableCell>
                        <TableCell>
                            <div className="w-fit items-center rounded-full border border-gray-100 dark:border-gray-800 shadow-md">
                                <Button className="rounded-full bg-gray-200" variant={'outline'} size={'icon'}><Minus /></Button>
                                <Button disabled variant={'outline'} size={'icon'} className="font-bold rounded-full">5</Button>
                                <Button className="rounded-full bg-orange" variant={'outline'} size={'icon'}><Plus /></Button>
                            </div>
                        </TableCell>
                        <TableCell>125</TableCell>
                        <TableCell className="text-right"><Button size={'sm'} className="bg-red-500 hover:bg-red-700 text-white font-semibold">Remove</Button></TableCell>
                    </TableRow>
                </TableBody>
                <TableFooter>
                    <TableRow>
                        <TableCell colSpan={5}>Total</TableCell>
                        <TableCell className="text-right">80</TableCell>
                    </TableRow>
                </TableFooter>
            </Table>
            <div className="flex justify-end my-5">
                <Button onClick={()=>setOpen(true)} className="bg-green-500 hover:bg-green-600">Proceed To Checkout</Button>
            </div>
            <CheckOutConfirmPage open={open} setOpen={setOpen} />
        </div>
    )
}

export default Cart
