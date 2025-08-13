import api, { getCsrf } from '@/api/axios';
import ButtonWithLoading from '@/components/custom/ButtonWithLoading';
import InputWithLabel from '@/components/custom/InputWithLabel';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { CheckCircle } from 'lucide-react';
import React, { FormEvent } from 'react'
import { Link, useNavigate } from 'react-router-dom';

const ForgotPassword = () => {
  const [loading, setLoading] = React.useState<boolean>(false);
  const [errors, setErrors] = React.useState<string>("");
  const [email, setEmail] = React.useState<string>("");
  
  const [sent, setSent] = React.useState<boolean>(false);

  const navigate = useNavigate();

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setErrors("");

    try {
      const data = {
        email: email,
      }

      await getCsrf();

      const res = await api.post('/api/forgot-password', data);
      console.log(res);
      setLoading(false);

      setSent(true);
    } catch (err) {
      console.log(err);
      setLoading(false);
      setErrors(err.response.data.message);
    }
  }
  
  return (
    <div className="min-h-screen py-12 flex items-center justify-center">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
          {!sent && <Card className='card-electric max-w-lg mx-auto w-full'>
            <CardHeader>
              <CardTitle>
                Forgot Password
              </CardTitle>
            </CardHeader>
            <CardContent>
              <form className='space-y-6' onSubmit={handleSubmit}>
                {errors && <div className="bg-destructive/10 border border-destructive/20 rounded-lg p-2 w-full text-center">
                    <span className='text-destructive text-sm'>{errors}</span>
                </div>}
                <InputWithLabel
                  label='Email'
                  type='email'
                  value={email}
                  onChange={(e) => {
                    setErrors("");
                    setEmail(e.target.value)
                  }}
                  placeholder='Enter the email associated with your account.'
                />
                <ButtonWithLoading className='w-full' type='submit' disabled={loading || !email} loading={loading}>
                  Submit
                </ButtonWithLoading>
              </form>
            </CardContent>
            <CardFooter>
                <div className='text-center w-full text-sm'>
                    Go back to {" "}
                    <Button className='p-0 h-fit' variant='link'>
                        <Link className='text-primary font-semibold' to={'/login'}>
                            Login.
                        </Link>
                    </Button>
                </div>
            </CardFooter>
          </Card>}

          {sent && <Card className="card-electric max-w-lg mx-auto w-full text-sm">
            <CardHeader className="text-center">
              <CheckCircle className="mx-auto h-12 w-12 text-green-500" />
              <CardTitle className="mt-4 text-2xl font-bold">Password Reset Link Sent</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4 text-center text-muted-foreground">
              <p>We’ve sent a password reset link to your email account. Please check your inbox and click the link to reset your password.</p>
              <Button onClick={() => navigate("/login")} className="w-fit">
                Login
              </Button>
            </CardContent>
          </Card>}
        </div>
    </div>
  )
}

export default ForgotPassword
