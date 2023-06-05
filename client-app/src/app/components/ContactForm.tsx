import { Envelope, IdentificationBadge, Phone } from "@phosphor-icons/react";
import { useForm } from "react-hook-form";
import { ContactFormProps, ContactProps } from "../contexts/ClientContext";
import { useClientContext } from "../hooks/useClientContext";

type AddContactFormProps = {
  onClose: () => void;
  contactSelected: ContactProps | null
}

export function ContactForm(props: AddContactFormProps) {
  const { clientLogged, addContact, updateContact, deleteContact } = useClientContext();
  const { register, handleSubmit } = useForm<ContactFormProps>();

  const onSubmit = async (data: any) => {
    if (!props.contactSelected) {
      await addContact(clientLogged!.client.id, data);
    } else {
      await updateContact(clientLogged!.client.id, props.contactSelected.id, data)
    }
    props.onClose();
  };

  const handleDeleteContact = () => {
    deleteContact(clientLogged!.client.id, props.contactSelected!.id);
    props.onClose();
  }

  return (
    <div className="flex flex-col items-center justify-center">
      <h2 className="text-2xl font-bold mb-4">Adicionar contato</h2>
      <form onSubmit={handleSubmit(onSubmit)}>
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
              {...register("firstName")}
              defaultValue={props.contactSelected?.firstName}
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
              {...register("lastName")}
              defaultValue={props.contactSelected?.lastName}
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
              {...register("email")}
              defaultValue={props.contactSelected?.email}
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
              {...register("phone")}
              defaultValue={props.contactSelected?.phone}
            />
          </div>
        </div>
        <button
          className="w-full bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded"
          type="submit"
        >
          {!props.contactSelected ? "Cadastrar" : "Atualizar"}
        </button>
        {props.contactSelected && (
          < button
            className="w-full bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded mt-1"
            type="button"
            onClick={handleDeleteContact}
          >
            Excluir
          </button>
        )}
      </form>
    </div >
  )
}