import { Button } from '@/components/ui/button'
import { LoginupInputState, SignupInputState, userLoginSchema } from '@/schema/userSchema'
import { useUserStore } from '@/store/useUserStore'
import { Loader2, Mail } from 'lucide-react'
import { ChangeEvent, FormEvent, useState } from 'react'
import { RiLockPasswordFill } from 'react-icons/ri'
import { Link } from 'react-router-dom'

const Login = () => {
  const { loading, login } = useUserStore()
  const [input, setInput] = useState<LoginupInputState>({
    email: '',
    password: ""
  })
  const [error, setError] = useState<Partial<LoginupInputState>>({})

  const handelChange = (e: ChangeEvent<HTMLInputElement>) => {
    setInput({ ...input, [e.target.name]: e.target.value })
  }


  const handelLogin = async (e: FormEvent) => {
    try {
      e.preventDefault()
      //   form validation
      const result = userLoginSchema.safeParse(input)
      if (!result.success) {
        const fildErrors = result.error.formErrors.fieldErrors
        setError(fildErrors as Partial<SignupInputState>)
        return
      }
      setError({})
      //   api implimantation
      await login(input)

    } catch (error) {
      console.log(error)
    }
  }
  return (
    <div>
      <div className="flex items-center justify-center min-h-screen w-screen">
        <form
          autoComplete='off'
          onSubmit={handelLogin}
          className="md:p-8 w-full  max-w-xl md:border border-gray-200 rounded-lg mx-4"
        >
          <div className="flex flex-col gap-5">
            <div className="flex justify-center">
              <h1 className="font-bold text-2xl">Login</h1>
            </div>
            <div className="flex flex-col">
              <label htmlFor="" className="font-semibold text-sm text-start">
                Email
              </label>
              <div className="w-full flex items-center border-[2px] rounded-md pr-2">
                <input
                  type="email"
                  name='email'
                  value={input.email}
                  onChange={handelChange}
                  className="py-2 px-3 rounded-md bg-transparent outline-none w-full"
                  placeholder="email"
                  autoComplete='off'
                />
                <Mail />
              </div>
              {
                error && <span className='text-sm text-red-500 text-center'>{error.email}</span>
              }
            </div>
            <div className="flex flex-col">
              <label htmlFor="" className="font-semibold text-start text-sm">
                Password
              </label>
              <div className="w-full flex items-center border-[2px] rounded-md pr-2">
                <input
                  type="password"
                  name='password'
                  value={input.password}
                  onChange={handelChange}
                  className="py-2 px-3 rounded-md w-full bg-transparent outline-none"
                  placeholder="password"
                  autoComplete='new-password'
                />
                <RiLockPasswordFill size={24} />
              </div>
              {
                error && <span className='text-sm text-red-500 text-center'>{error.password}</span>
              }
            </div>
            {loading ? (
              <Button className="bg-yellow-600 hover:bg-yellow-500 duration-200 py-2 rounded-md text-white font-semibold text-lg">
                <Loader2 className="mr-2 h-4 animate-spin" />
                Please wait...
              </Button>
            ) : (
              <Button className="bg-yellow-600 hover:bg-yellow-500 duration-200 py-2 rounded-md text-white font-semibold text-lg">
                Login
              </Button>
            )}

            <div className="flex flex-col gap-1">
              <Link to="/forget-password" className="text-blue-500 text-sm font-semibold">
                Forget password
              </Link>
              <p className="text-sm">
                Don't have an account{' '}
                <Link
                  to="/signup"
                  className="text-blue-500 text-sm font-semibold"
                >
                  Signup
                </Link>
              </p>
            </div>
          </div>
        </form>
      </div>
    </div>
  )
}

export default Login

