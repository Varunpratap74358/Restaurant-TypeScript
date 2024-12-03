import { Button } from '@/components/ui/button'
import { SignupInputState, userSignupSchema } from '@/schema/userSchema'
import { useUserStore } from '@/store/useUserStore'
import { Loader2, Mail } from 'lucide-react'
import { ChangeEvent, FormEvent, useState } from 'react'
import { IoIosContact } from 'react-icons/io'
import { MdDriveFileRenameOutline } from 'react-icons/md'
import { RiLockPasswordFill } from 'react-icons/ri'
import { Link, useNavigate } from 'react-router-dom'

const SignUp = () => {
  const { signup, loading } = useUserStore()
  const navigate = useNavigate()
  const [input, setInput] = useState<SignupInputState>({
    email: '',
    password: '',
    fullname: '',
    contact: '',
  })

  const [error, setError] = useState<Partial<SignupInputState>>({})

  const handelChange = (e: ChangeEvent<HTMLInputElement>) => {
    setInput({ ...input, [e.target.name]: e.target.value })
  }

  const handelSignup = async (e: FormEvent) => {
    e.preventDefault()
    //   form validation
    const result = userSignupSchema.safeParse(input)
    if (!result.success) {
      const fildErrors = result.error.formErrors.fieldErrors
      setError(fildErrors as Partial<SignupInputState>)
      return
    }
    setError({})
    try {
      await signup(input)
      navigate('/verify-email')
    } catch (error) {
      console.log(error)
    } 
  }
  return (
    <div className="flex items-center justify-center min-h-screen w-screen">
      <form
        onSubmit={handelSignup}
        autoComplete="off"
        className="md:p-8 w-full max-w-xl md:border border-gray-200 rounded-lg mx-4"
      >
        <div className="flex flex-col gap-5">
          <div className="flex justify-center">
            <h1 className="font-bold text-2xl">Signup</h1>
          </div>
          <div className="flex flex-col">
            <label htmlFor="" className="font-semibold text-sm text-start">
              Full Name
            </label>
            <div className="w-full flex items-center border-[2px] rounded-md pr-2">
              <input
                type="text"
                name="fullname"
                value={input.fullname}
                onChange={handelChange}
                className="py-2 px-3 rounded-md bg-transparent outline-none w-full"
                placeholder="fullname"
                autoComplete="off"
              />
              <MdDriveFileRenameOutline size={24} />
            </div>
            {error && (
              <span className="text-sm text-red-500 text-center">
                {error.fullname}
              </span>
            )}
          </div>

          <div className="flex flex-col">
            <label htmlFor="" className="font-semibold text-sm text-start">
              Email
            </label>
            <div className="w-full flex items-center border-[2px] rounded-md pr-2">
              <input
                type="email"
                name="email"
                value={input.email}
                onChange={handelChange}
                className="py-2 px-3 rounded-md bg-transparent outline-none w-full"
                placeholder="email"
                autoComplete="off"
              />
              <Mail />
            </div>
            {error && (
              <span className="text-sm text-red-500 text-center">
                {error.email}
              </span>
            )}
          </div>
          <div className="flex flex-col">
            <label htmlFor="" className="font-semibold text-start text-sm">
              Password
            </label>
            <div className="w-full flex items-center border-[2px] rounded-md pr-2">
              <input
                type="password"
                name="password"
                value={input.password}
                onChange={handelChange}
                className="py-2 px-3 rounded-md w-full bg-transparent outline-none"
                placeholder="password"
                autoComplete="new-password"
              />
              <RiLockPasswordFill size={24} />
            </div>
            {error && (
              <span className="text-sm text-red-500 text-center">
                {error.password}
              </span>
            )}
          </div>
          <div className="flex flex-col">
            <label htmlFor="" className="font-semibold text-sm text-start">
              Contact
            </label>
            <div className="w-full flex items-center border-[2px] rounded-md pr-2">
              <input
                type="text"
                name="contact"
                value={input.contact}
                onChange={handelChange}
                className="py-2 px-3 rounded-md bg-transparent outline-none w-full"
                placeholder="1234567890"
                autoComplete="off"
              />
              <IoIosContact size={24} />
            </div>
            {error && (
              <span className="text-sm text-red-500 text-center">
                {error.contact}
              </span>
            )}
          </div>
          {loading ? (
            <Button
              disabled
              className="bg-yellow-600 hover:bg-yellow-500 duration-200 py-2 rounded-md text-white font-semibold text-lg"
            >
              <Loader2 className="mr-2 h-4 animate-spin" />
              Please wait...
            </Button>
          ) : (
            <Button className="bg-yellow-600 hover:bg-yellow-500 duration-200 py-2 rounded-md text-white font-semibold text-lg">
              Signup
            </Button>
          )}

          <div className="flex flex-col gap-1">
            <p className="text-sm">
              You have already account{' '}
              <Link to="/login" className="text-blue-500 text-sm font-semibold">
                Login
              </Link>
            </p>
          </div>
        </div>
      </form>
    </div>
  )
}

export default SignUp

{
  /* <Input type="email" placeholder="Email" className='outline-none'></Input>
            <Mail className='absolute inset-y-2 left-2 text-gray-500 pointer-events-none' /> */
}
