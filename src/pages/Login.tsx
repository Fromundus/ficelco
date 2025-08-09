import InputWithLabel from '@/components/custom/InputWithLabel';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Value } from '@radix-ui/react-select';
import React, { ChangeEvent, FormEvent } from 'react'

type FormData = {
    email: string;
    password: string;
}

const Login = () => {
    const [loading, setLoading] = React.useState<boolean>(false);
    const [formData, setFormData] = React.useState<FormData>({
        email: "",
        password: "",
    });

    const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
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
        
        try {
            
        } catch (err) {
            console.log(err);
        }
    }
    


    return (
        <div className="min-h-screen py-12 flex items-center justify-center">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
                <Card className='card-electric max-w-lg mx-auto w-full'>
                    <CardHeader className='flex items-center'>
                        <CardTitle>
                            Login
                        </CardTitle>
                    </CardHeader>
                    <CardContent>
                        <form onSubmit={handleSubmit} className="space-y-4">
                            <InputWithLabel
                                id="email"
                                name='email'
                                type="text"
                                label='Email'
                                placeholder="Enter your email account"
                                value={formData.email}
                                onChange={handleChange}
                            />
                            <InputWithLabel
                                id="password"
                                name='password'
                                type="password"
                                placeholder="Enter your password"
                                value={formData.password}
                                onChange={handleChange}
                                label='Password'
                            />
                            <Button type="submit" disabled={loading} className="w-full">
                                {loading ? "Loggin in..." : "Login"}
                            </Button>
                        </form>
                    </CardContent>
                </Card>
            </div>
        </div>
    )
}

export default Login
