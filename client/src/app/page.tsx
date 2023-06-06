"use client"
import axios from 'axios';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { SubmitHandler, useForm } from 'react-hook-form';

type LoginFormInputs = {
  email: string;
  phone: string;
};

export default function Home() {
  const { register, handleSubmit, formState: { errors } } = useForm<LoginFormInputs>();
  const router = useRouter();

  const onSubmit: SubmitHandler<LoginFormInputs> = async (data) => {
    try {
      const response = await axios.post<{ access_token: string }>('http://localhost:3000/auth', data);
      const token = response.data.access_token;
      localStorage.setItem('access_token', token);
      router.push('/dashboard');
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="flex justify-center items-center h-screen">
      <form onSubmit={handleSubmit(onSubmit)} className="w-full max-w-sm">
        <div className="mb-4">
          <label htmlFor="email" className="block mb-2 font-bold">
            Email
          </label>
          <input
            type="email"
            id="email"
            {...register('email', { required: true })}
            className={`w-full p-2 border ${errors.email ? 'border-red-500' : 'border-gray-300'}`}
          />
          {errors.email && <span className="text-red-500">Este campo é obrigatório</span>}
        </div>

        <div className="mb-4">
          <label htmlFor="phone" className="block mb-2 font-bold">
            Phone
          </label>
          <input
            type="tel"
            id="phone"
            {...register('phone', { required: true })}
            className={`w-full p-2 border ${errors.phone ? 'border-red-500' : 'border-gray-300'}`}
          />
          {errors.phone && <span className="text-red-500">Este campo é obrigatório</span>}
        </div>

        <button type="submit" className="w-full py-2 px-4 bg-blue-500 text-white font-bold rounded hover:bg-blue-700">
          Login
        </button>
        <div className="mt-4 text-center">
          Não tem uma conta?<Link href="/sign-up" className="text-blue-500"> Cadastre-se</Link>
        </div>
      </form>
    </div>
  );
}
