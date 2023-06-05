"use client"
import { ClientFormProps } from "@/app/contexts/ClientContext";
import { useClientContext } from "@/app/hooks/useClientContext";
import { Envelope, IdentificationBadge, Phone } from "@phosphor-icons/react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";

export default function SignUp() {
  const { createClient } = useClientContext();
  const { handleSubmit, register, formState: { errors }, reset } = useForm<ClientFormProps>();
  const router = useRouter();

  const onSubmit = async (form: ClientFormProps) => {
    await createClient(form);
    reset();
    router.push("/sign-in");
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="w-4/5 max-w-md p-6 block">
      <h2 className="text-2xl font-bold mb-4">Crie sua conta</h2>
      <div className="mb-4">
        <label className="block font-bold mb-2" htmlFor="firstName">
          Primeiro nome
        </label>
        <div className="relative">
          <span className="absolute inset-y-0 left-0 pl-3 flex items-center">
            <IdentificationBadge className="text-green-500" />
          </span>
          <input
            className="w-full pl-10 pr-3 py-2 border border-gray-300 rounded"
            type="text"
            id="firstName"
            placeholder="Digite seu primeiro nome"
            {...register("firstName", { required: true })}
          />
        </div>
      </div>
      <div className="mb-4">
        <label className="block font-bold mb-2" htmlFor="lastName">
          Último nome
        </label>
        <div className="relative">
          <span className="absolute inset-y-0 left-0 pl-3 flex items-center">
            <IdentificationBadge className="text-green-500" />
          </span>
          <input
            className="w-full pl-10 pr-3 py-2 border border-gray-300 rounded"
            type="text"
            id="lastName"
            placeholder="Digite seu último nome"
            {...register("lastName", { required: true })}
          />
        </div>
      </div>
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
        Cadastrar
      </button>
      <Link href={"/sign-in"} className="mt-4 text-center text-gray-600 cursor-pointer">
        Já tem uma conta? <span className="transition duration-300 ease-in-out hover:text-green-500">Fazer login</span>
      </Link>
    </form>)
}