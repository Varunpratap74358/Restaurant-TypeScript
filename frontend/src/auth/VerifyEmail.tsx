import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input'
import { useUserStore } from '@/store/useUserStore';
import { useRef, useState } from 'react'
import { useNavigate } from 'react-router-dom';
// import { useNavigate } from 'react-router-dom';

const VerifyEmail = () => {
  const navigate = useNavigate()
  const { loading, verify } = useUserStore()
  const [otp, setotp] = useState<string[]>(['', '', '', '', '', ''])
  const inputRef = useRef<any>([]);
  //   const navigate = useNavigate()

  const handelChange = (index: number, value: string) => {
    if (/^[a-zA-Z0-9]$/.test(value) || value === "") {
      const newOtp = [...otp];
      newOtp[index] = value;
      setotp(newOtp);
    }
    if (value !== '' && index < 5) {
      inputRef.current[index + 1].focus()
    }

  }

  const handelKeyDown = (index: number, e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Backspace' && !otp[index] && index > 0) {
      inputRef.current[index - 1].focus()
    }
  }

  const handelOtpSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const finalOtp = otp.join('');
    console.log(finalOtp);
    try {
      await verify(finalOtp);
      navigate("/")
    } catch (error) {
      console.log(error)
    }
  };

  return (
    <div className="flex items-center justify-center px-5 h-screen w-full">
      <div className="p-8 rounded-md w-full max-w-md shadow-md flex-col flex gap-10 border border-gray-200">
        <div className="text-center">
          <h1 className="font-extrabold text-2xl">Verify Your Email</h1>
          <p className="text-sm text-gray-600">
            Enter the 6 digit code sent to your email address
          </p>
        </div>
        <form onSubmit={handelOtpSubmit}>
          <div className='flex justify-center gap-1 '>
            {otp.map((letter: string, i: number) => {
              return (
                <Input
                  key={i}
                  ref={(e) => (inputRef.current[i] = e)}
                  maxLength={1}
                  type="text"
                  value={letter}
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) => handelChange(i, e.target.value)}
                  onKeyDown={(e: React.KeyboardEvent<HTMLInputElement>) => handelKeyDown(i, e)}
                  className="md:w-12 md:h-12 w-8 h-8 text-center text-sm md:text-2xl font-normal md:font-bold rounded-lg focus:outline-none focus:ring-2 hover:shadow-md hover:scale-105 duration-200 focus:ring-indigo-500 outline-none"
                />
              )
            })}
          </div>
          <Button className='bg-yellow-600 hover:bg-yellow-500 w-full mt-5'>
            {
              loading ? 'Verifying...' : 'Verify'
            }
          </Button>
        </form>
      </div>
    </div>
  )
}

export default VerifyEmail
