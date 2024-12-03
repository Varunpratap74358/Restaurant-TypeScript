import { Link, useNavigate } from 'react-router-dom'
import {
  Menubar,
  MenubarContent,
  MenubarItem,
  MenubarMenu,
  MenubarTrigger,
} from '@radix-ui/react-menubar'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from './ui/dropdown-menu'
import { Button } from './ui/button'
import {
  HandPlatter,
  Loader2,
  Menu,
  Moon,
  PackageCheck,
  ShoppingCart,
  SquareMenu,
  Sun,
  User,
  UtensilsCrossed,
} from 'lucide-react'
import { Avatar, AvatarFallback } from './ui/avatar'
import { AvatarImage } from '@radix-ui/react-avatar'
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from './ui/sheet'
import { useUserStore } from '@/store/useUserStore'

const Navbar = () => {
  const admin = true
  const navigate = useNavigate()
  const { loading, logout, user } = useUserStore()
  const handelLogout = async () => {
    await logout()
  }
  return (
    <div className="max-w-7xl mx-auto px-2">
      <div className="flex items-center justify-between h-14">
        <Link to={'/'}>
          <h1 className="fonct-bold font-extrabold text-2xl">Varun Eats  </h1>
        </Link>
        <div className="hidden md:flex items-center gap-10">
          <div className="hidden md:flex items-center gap-6">
            <Link to={'/'}>Home</Link>
            <Link to={'/profile'}>Profile</Link>
            <Link to={'/order/status'}>Order</Link>

            {admin && (
              <Menubar>
                <MenubarMenu>
                  <>
                    {
                      user?.admin && <>
                        <MenubarTrigger className="text-gray-700 hover:text-blue-500 transition duration-300 font-bold border-[2px] px-2 py-[2px] hover:bg-yellow-500 rounded-md">
                          Dashboard
                        </MenubarTrigger>
                        <MenubarContent className="bg-white shadow-lg border border-gray-200 rounded-md py-2 mt-2">
                          <Link to={'/admin/restaurant'}>
                            <MenubarItem className="px-4 py-2 hover:bg-blue-100 text-gray-800 cursor-pointer">
                              Restaurent
                            </MenubarItem>
                          </Link>
                          <Link to={'/admin/menu'}>
                            <MenubarItem className="px-4 py-2 hover:bg-blue-100 text-gray-800 cursor-pointer">
                              Menu
                            </MenubarItem>
                          </Link>
                          <Link to={'/admin/orders'}>
                            <MenubarItem className="px-4 py-2 hover:bg-blue-100 text-gray-800 cursor-pointer">
                              Orders
                            </MenubarItem>
                          </Link>
                        </MenubarContent>
                      </>
                    }
                  </>
                </MenubarMenu>
              </Menubar>
            )}
          </div>
          <div className="flex items-center gap-4">
            <div>
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="outline" size="icon">
                    <Sun className="h-[1.2rem] w-[1.2rem] rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
                    <Moon className="absolute h-[1.2rem] w-[1.2rem] rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
                    <span className="sr-only">Toggle theme</span>
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  <DropdownMenuItem>Light</DropdownMenuItem>
                  <DropdownMenuItem>Dark</DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
            <Link to={'/cart'} className="relative cursor-pointer">
              <ShoppingCart className="hover:text-red-500 duration-200" />
              <Button
                size={'icon'}
                className="absolute -inset-y-3 left-2 text-xs rounded-full h-4 w-4 bg-red-500 hover:bg-red-500"
              >
                5
              </Button>
            </Link>
            <div>
              <Avatar onClick={() => navigate("/profile")} className='cursor-pointer'>
                <AvatarImage />
                <AvatarFallback>CN</AvatarFallback>
              </Avatar>
            </div>
            <div>
              {loading ? (
                <Button disabled className="bg-yellow-600 hover:bg-yellow-700 duration-200">
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Pleaste wait...
                </Button>
              ) : (
                <Button onClick={handelLogout} className="bg-yellow-600 hover:bg-yellow-700 duration-200">
                  Loagout
                </Button>

              )}
            </div>
          </div>
        </div>
        <div className="md:hidden lg:hidden">
          {/* Mobile responsive */}
          <MobileNavbar />
        </div>
      </div>
    </div>
  )
}

export default Navbar

const MobileNavbar = () => {
  const { loading, logout, user } = useUserStore()

  const handelLogout = async () => {
    await logout()
  }

  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button
          size={'icon'}
          className="rounded-full bg-gray-200 text-black hover:bg-gray-300"
          variant="outline"
        >
          <Menu size={'18'} />
        </Button>
      </SheetTrigger>
      <SheetContent className="flex flex-col">
        <SheetHeader className="flex flex-row items-center justify-between">
          <SheetTitle>VarunEats</SheetTitle>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" size="icon">
                <Sun className="h-[1.2rem] w-[1.2rem] rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
                <Moon className="absolute h-[1.2rem] w-[1.2rem] rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
                <span className="sr-only">Toggle theme</span>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem>Light</DropdownMenuItem>
              <DropdownMenuItem>Dark</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </SheetHeader>
        <hr />
        <SheetDescription className="flex-1">
          <Link
            to={'/profile'}
            className="flex items-center gap-4 hover:bg-gray-200 px-3 py-2 rounded-lg cursor-pointer hover:text-gray-900 font-medium"
          >
            <User />
            <span>Profile</span>
          </Link>
          <Link
            to={'/order/status'}
            className="flex items-center gap-4 hover:bg-gray-200 px-3 py-2 rounded-lg cursor-pointer hover:text-gray-900 font-medium"
          >
            <HandPlatter />
            <span>Order</span>
          </Link>
          <Link
            to={'/cart'}
            className="flex items-center gap-4 hover:bg-gray-200 px-3 py-2 rounded-lg cursor-pointer hover:text-gray-900 font-medium"
          >
            <ShoppingCart />
            <span>Cart (0)</span>
          </Link>
          {
            user?.admin && <>
              <Link
                to={'/admin/menu'}
                className="flex items-center gap-4 hover:bg-gray-200 px-3 py-2 rounded-lg cursor-pointer hover:text-gray-900 font-medium"
              >
                <SquareMenu />
                <span>Menu</span>
              </Link>
              <Link
                to={'/admin/restaurant'}
                className="flex items-center gap-4 hover:bg-gray-200 px-3 py-2 rounded-lg cursor-pointer hover:text-gray-900 font-medium"
              >
                <UtensilsCrossed />
                <span>Restorant</span>
              </Link>
              <Link
                to={'/admin/orders'}
                className="flex items-center gap-4 hover:bg-gray-200 px-3 py-2 rounded-lg cursor-pointer hover:text-gray-900 font-medium"
              >
                <PackageCheck />
                <span>Restorant Orders</span>
              </Link>
            </>
          }
        </SheetDescription>
        <SheetFooter className='grid grid-cols-1 gap-5'>
          <div className="flex flex-row items-center gap-2">
            <Avatar>
              <AvatarImage />
              <AvatarFallback>CN</AvatarFallback>
            </Avatar>
            <h1 className="font-bold">Varun Singh</h1>
          </div>

          <SheetClose asChild>
            {
              loading ? (
                <Button
                  disabled
                  type="submit"
                  className="bg-yellow-400 hover:bg-yellow-400 w-full"
                >
                  <Loader2 className='text-center animate-spin' size={24} />
                </Button>
              ) : (
                <Button
                  onClick={handelLogout}
                  type="submit"
                  className="bg-yellow-500 hover:bg-yellow-600 w-full"
                >
                  Logout
                </Button>
              )
            }
          </SheetClose>
        </SheetFooter>
      </SheetContent>
    </Sheet>
  )
}
