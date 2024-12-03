import { forgetPasswordSchema, ForgetPasswordState } from '@/schema/userSchema'
import { useUserStore } from '@/store/useUserStore'
import { Mail } from 'lucide-react'
import { ChangeEvent, FormEvent, useState } from 'react'
import { Link } from 'react-router-dom'

const ForgetPassword = () => {
  const [input, setInput] = useState<ForgetPasswordState>({
    email: '',
  })
  const [error, setError] = useState<Partial<ForgetPasswordState>>({})
  const handelChange = (e: ChangeEvent<HTMLInputElement>) => {
    setInput({ ...input, [e.target.name]: e.target.value })
  }
  const { forgotPassword, loading } = useUserStore()

  const handelSubmit = async (e: FormEvent) => {
    e.preventDefault()
    try {
      //   form validation
      const result = forgetPasswordSchema.safeParse(input)
      if (!result.success) {
        const fildErrors = result.error.formErrors.fieldErrors
        setError(fildErrors as Partial<ForgetPasswordState>)
        return
      }
      setError({})
      alert(input.email)
      await forgotPassword(input.email)
    } catch (error) {
      console.log(error)
    }
  }
  return (
    <div className="flex items-center justify-center min-h-screen w-full">
      <form
        onSubmit={handelSubmit}
        className="md:p-8 w-full  max-w-xl md:border border-gray-200 rounded-lg mx-4"
      >
        <div className="flex flex-col gap-3">
          <div className="">
            <h1 className="text-center font-bold text-2xl mb-5">
              Forget Password
            </h1>
          </div>
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
          <div className="md:mt-5">
            <button className="bg-yellow-400 w-full py-2 rounded-md hover:bg-yellow-600 duration-200 hover:text-white font-semibold ">
              {loading ? 'sending' : 'Send Refrel Link'}
            </button>
          </div>
          <div className="flex">
            <p className="text-sm">
              Back To Login{' '}
              <Link
                to={'/login'}
                className="text-blue-500 text-sm font-semibold"
              >
                Login
              </Link>{' '}
            </p>
          </div>
        </div>
      </form>
    </div>
  )
}

export default ForgetPassword
