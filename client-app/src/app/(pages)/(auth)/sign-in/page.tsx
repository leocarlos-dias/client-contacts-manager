"use client"
import { AuthFormProps } from "@/app/contexts/ClientContext";
import { useClientContext } from "@/app/hooks/useClientContext";
import { Envelope, Phone } from "@phosphor-icons/react";
import Link from "next/link";
import { useForm } from "react-hook-form";

export default function SignIn() {
  const { authClient } = useClientContext();
  const { handleSubmit, register, formState: { errors }, reset } = useForm<AuthFormProps>();

  const onSubmit = async (form: AuthFormProps) => {
    await authClient(form);
    reset();
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="w-4/5 max-w-md p-6">
      <h2 className="text-2xl font-bold mb-4">Faça login</h2>
      <div className="mb-4">
        <label className="block font-bold mb-2" htmlFor="email">
          Email
        </label>
        <div className="relative">
          <span className="absolute inset-y-0 left-0 pl-3 flex items-center">
            <Envelope className="text-green-500" />
          </span>
          <input
            className="w-full pl-10 pr-3 py-2 border border-gray-300 rounded"
            type="email"
            id="email"
            placeholder="Digite seu email"
            {...register("email", { required: true })}
          />
        </div>
      </div>
      <div className="mb-4">
        <label className="block font-bold mb-2" htmlFor="phone">
          Telefone
        </label>
        <div className="relative">
          <span className="absolute inset-y-0 left-0 pl-3 flex items-center">
            <Phone className="text-green-500" />
          </span>
          <input
            className="w-full pl-10 pr-3 py-2 border border-gray-300 rounded"
            type="tel"
            id="phone"
            placeholder="Digite seu telefone"
            {...register("phone", { required: true })}
          />
        </div>
      </div>
      <button
        className="w-full bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded"
        type="submit"
      >
        Entrar
      </button>
      <Link href={"/sign-up"} className="mt-4 text-center text-gray-600 cursor-pointer">
        Não tem conta? <span className="transition duration-300 ease-in-out hover:text-green-500">Cadastrar</span>
      </Link>
    </form>
  )
}