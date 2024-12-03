import { ResetPasswordSchema, ResetPassworsState } from '@/schema/userSchema'
import { LoaderCircle } from 'lucide-react'
import { ChangeEvent, FormEvent, useState } from 'react'
import { RiLockPasswordFill } from 'react-icons/ri'
import { Link } from 'react-router-dom'

const ResetPassword = () => {
  const [input, setInput] = useState<ResetPassworsState>({
    password: '',
  })
  const [loading, setLoading] = useState<boolean>(false)
  const [error, setError] = useState<Partial<ResetPassworsState>>({})
  const handelChange = (e: ChangeEvent<HTMLInputElement>) => {
    setInput({ ...input, [e.target.name]: e.target.value })
  }

  const handelSubmit = (e: FormEvent) => {
    e.preventDefault()
    try {
      setLoading(true)
      //   form validation
      const result = ResetPasswordSchema.safeParse(input)
      if (!result.success) {
        const fildErrors = result.error.formErrors.fieldErrors
        setError(fildErrors as Partial<ResetPassworsState>)
        return
      }
      setError({})
      alert(input.password)
    } catch (error) {
      console.log(error)
    } finally {
      setLoading(false)
    }
  }
  return (
    <div className="flex items-center justify-center min-h-screen w-full">
      <form
        onSubmit={handelSubmit}
        className="md:p-8 w-full max-w-xl md:border border-gray-200 rounded-lg mx-4"
      >
        <div className="flex flex-col gap-3">
          <div className="mb-7">
            <h1 className="text-center font-bold text-2xl">
              Reset Password
            </h1>
            <p className='text-[12px] text-green-500 text-center'>Enter Your new password to reset your old password</p>
          </div>
          <div className="w-full flex items-center border-[2px] rounded-md pr-2">
            <input
              type="password"
              name="password"
              value={input.password}
              onChange={handelChange}
              className="py-2 px-3 rounded-md bg-transparent outline-none w-full"
              placeholder="Enter password"
              autoComplete="off"
            />
            <RiLockPasswordFill size={24} />
          </div>
          {error && (
            <span className="text-sm text-red-500 text-center">
              {error.password}
            </span>
          )}
          <div className="md:mt-5">
            <button className="bg-yellow-400 w-full py-2 rounded-md hover:bg-yellow-600 duration-200 text-center flex justify-center hover:text-white font-semibold ">
              {loading ? (
                <span className='flex items-center'>Resting..<LoaderCircle className='animate-spin text-center' /></span>
              ) : 'Reset'}
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

export default ResetPassword
