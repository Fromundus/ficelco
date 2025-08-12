import api, { getCsrf } from '@/api/axios';
import ButtonWithLoading from '@/components/custom/ButtonWithLoading';
import InputWithLabel from '@/components/custom/InputWithLabel';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { CheckCircle } from 'lucide-react';
import React, { ChangeEvent, FormEvent } from 'react'
import { Link, useNavigate, useParams, useSearchParams } from 'react-router-dom'

const PasswordReset = () => {
  const { token } = useParams();
  const [searchParams] = useSearchParams();
  const email = searchParams.get('email');

  const [loading, setLoading] = React.useState<boolean>(false);
  const [errors, setErrors] = React.useState<string>("");

  const [success, setSuccess] = React.useState<boolean>(false);

  const navigate = useNavigate();

  const [formData, setFormData] = React.useState({
    password: "",
    password_confirmation: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((prev) => {
      return {
        ...prev,
        [name]: value,
      }
    });
  }

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setErrors("");

    try {
      const data = {
        token: token,
        email: email,
        password: formData.password,
        password_confirmation: formData.password_confirmation
      }

      await getCsrf();

      const res = await api.post('/api/reset-password', data);
      console.log(res);
      setLoading(false);
      
      setSuccess(true);
    } catch (err) {
      console.log(err);
      setLoading(false);
      setErrors(err.response.data.message);
    }
  }

  return (
      <div className="min-h-screen py-12 flex items-center justify-center">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
          {!success && <Card className='card-electric max-w-lg mx-auto w-full'>
            <CardHeader>
              <CardTitle>
                Password Reset
              </CardTitle>
            </CardHeader>
            <CardContent>
              <form className='space-y-4' onSubmit={handleSubmit}>
                {errors && <div className="bg-destructive/10 border border-destructive/20 rounded-lg p-2 w-full text-center">
                    <span className='text-destructive text-sm'>{errors}</span>
                </div>}
                <InputWithLabel
                  label='New Password'
                  id='password'
                  name='password'
                  type='password'
                  value={formData.password}
                  placeholder='Enter new password.'
                  onChange={handleChange}
                />
                <InputWithLabel
                  label='Confirm New Password'
                  id='password_confirmation'
                  name='password_confirmation'
                  type='password'
                  value={formData.password_confirmation}
                  placeholder='Confirm new password.'
                  onChange={handleChange}
                />
                <ButtonWithLoading className='w-full' type='submit' disabled={loading || !email} loading={loading}>
                  Submit
                </ButtonWithLoading>
              </form>
            </CardContent>
            {/* <CardFooter>
                <div className='text-center w-full text-sm'>
                    Go back to {" "}
                    <Button className='p-0 h-fit' variant='link'>
                        <Link className='text-primary font-semibold' to={'/login'}>
                            Login.
                        </Link>
                    </Button>
                </div>
            </CardFooter> */}
          </Card>}

          {success && <Card className="card-electric max-w-lg mx-auto w-full text-sm">
            <CardHeader className="text-center">
              <CheckCircle className="mx-auto h-12 w-12 text-green-500" />
              <CardTitle className="mt-4 text-2xl font-bold">Password Reset Successful</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4 text-center text-muted-foreground">
              <p>Your password has been successfully updated. You can now log in with your new password.</p>
              <Button className="w-full" onClick={() => navigate("/login")}>
                Go to Login
              </Button>
            </CardContent>
          </Card>}
        </div>
    </div>
  )
}

export default PasswordReset
