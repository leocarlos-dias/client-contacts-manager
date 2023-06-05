"use client"
import { ContactForm } from "@/app/components/ContactForm";
import { Modal } from "@/app/components/Modal";
import { ClientFormProps, ContactProps } from "@/app/contexts/ClientContext";
import { useClientContext } from "@/app/hooks/useClientContext";
import { useModal } from "@/app/hooks/useModal";
import { DotsNine, SignOut, Trash, UserPlus } from "@phosphor-icons/react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useForm } from "react-hook-form";

export default function Dashboard(): JSX.Element | null {
  const { clientLogged, updateClient, deleteClient } = useClientContext();
  const { closeModal, modalOpen, openModal } = useModal();
  const { register, handleSubmit } = useForm<Partial<ClientFormProps>>();
  const [showDropdown, setShowDropdown] = useState(false);
  const [showSidebar, setShowSidebar] = useState(false);
  const [contactSelected, setContactSelected] = useState<ContactProps | null>(null);
  const router = useRouter();

  const handleDropdownOptionClick = (option: string, client?: ContactProps) => {
    switch (option) {
      case "create":
        setContactSelected(null)
        openModal();
        break;
      case "update":
        setContactSelected(client!)
        openModal();
        break;
      case "remove":
        deleteClient(clientLogged!.client.id);
        setContactSelected(null)
        break;
      case "signout":
        router.push("/sign-in");
        setContactSelected(null)
        break;
    };
    setShowDropdown(false);
  };

  const onSubmit = (data: Partial<ClientFormProps>) => {
    updateClient(clientLogged!.client.id, data);
  };

  const getInitialName = (firstName: string, lastName: string): string => firstName.charAt(0).toUpperCase() + lastName.charAt(0).toUpperCase()
  const getResumeName = (firstName: string, lastName: string): string => {
    const partsName = `${firstName} ${lastName}`.split(" ");
    const first = partsName.shift();
    const last = partsName.pop();
    const initials = partsName.map(part => part.charAt(0).toUpperCase()).join(" ");
    return `${first} ${initials} ${last}`;
  }

  if (!clientLogged) {
    router.back();
    return null;
  }

  return (
    <>
      <div className="flex h-screen">
        <div className="w-full flex-shrink-0 bg-gray-200 min-w-[300px] sm:w-1/4">
          <header className="p-4 flex items-center justify-between">
            <div className="flex items-center" onClick={_ => setShowSidebar(true)}>
              <span className="w-8 h-8 rounded-full mr-2 flex items-center justify-center bg-gray-300">{getInitialName(clientLogged.client.firstName, clientLogged.client.lastName)}</span>
              <h2 className="text-2xl font-bold">{getResumeName(clientLogged.client.firstName, clientLogged.client.lastName)}</h2>
            </div>
            <div className="relative transition duration-300 ease-in-out hover:scale-110">
              <DotsNine
                className="cursor-pointer"
                size={28}
                onClick={() => setShowDropdown(!showDropdown)}
              />
              {showDropdown && (
                <div className="absolute right-0 mt-2 bg-white p-2 shadow rounded w-40 cursor-pointer hover:scale-100">
                  <div className="flex flex-col space-y-2">
                    <button
                      className="flex items-center space-x-2 text-gray-500 hover:text-gray-700"
                      onClick={() => handleDropdownOptionClick("create")}
                    >
                      <UserPlus size={16} />
                      <span>Adicionar</span>
                    </button>
                    <button
                      className="flex items-center space-x-2 text-red-500 hover:text-red-700"
                      onClick={() => handleDropdownOptionClick("remove")}
                    >
                      <Trash size={16} />
                      <span>Excluir</span>
                    </button>
                    <button
                      className="flex items-center space-x-2 text-gray-500 hover:text-gray-700"
                      onClick={() => handleDropdownOptionClick("signout")}
                    >
                      <SignOut size={16} />
                      <span>Desconectar</span>
                    </button>
                  </div>
                </div>
              )}
            </div>
          </header>
          <div className="p-4">
            <h2 className="text-2xl font-bold mb-4">Contatos</h2>
            <div className="overflow-y-auto divide-y divide-gray-300" style={{ maxHeight: "calc(100vh - 160px)" }}>
              {clientLogged.client.contacts.map(contact => (
                <div
                  onClick={_ => handleDropdownOptionClick("update", contact)}
                  key={contact.id}
                  className="flex items-center px-2 py-4 rounded-lg cursor-pointer hover:bg-gray-300"
                >
                  <div className="w-12 h-12 bg-gray-400 rounded-full mr-4"></div>
                  <div>
                    <h3 className="font-bold text-gray-800">{getResumeName(contact.firstName, contact.lastName)}</h3>
                    <p className="text-gray-500">{contact.phone}</p>
                    <p className="text-gray-500">{contact.email}</p>
                    <p className="text-gray-500">{contact.registeredAt.toString().substring(0, 10)}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
          {showSidebar && (<aside className={`fixed inset-0 bg-gray-100 min-w-[300px] w-full sm:w-1/4 ${showSidebar ? "animate-fade-right animate-ease-in-out" : "-translate-x-96"}`}>
            <div className="flex flex-col h-screen p-4">
              <button className="mb-4 text-gray-500" onClick={_ => setShowSidebar(false)} >
                Voltar
              </button>
              <h2 className="text-2xl font-bold mb-4">Perfil</h2>
              <form onSubmit={handleSubmit(onSubmit)}>
                <div className="mb-4">
                  <label className="block text-gray-700">Nome</label>
                  <input
                    {...register("firstName")}
                    type="text"
                    defaultValue={clientLogged.client.firstName}
                    className="w-full p-2 border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
                <div className="mb-4">
                  <label className="block text-gray-700">Sobrenome</label>
                  <input
                    {...register("lastName")}
                    type="text"
                    defaultValue={clientLogged.client.lastName}
                    className="w-full p-2 border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
                <div className="mb-4">
                  <label className="block text-gray-700">Telefone</label>
                  <input
                    {...register("phone")}
                    type="text"
                    defaultValue={clientLogged.client.phone}
                    className="w-full p-2 border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
                <div className="mb-4">
                  <label className="block text-gray-700">E-mail</label>
                  <input
                    {...register("email")}
                    type="email"
                    defaultValue={clientLogged.client.email}
                    className="w-full p-2 border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
                <button
                  type="submit"
                  className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-700"
                >
                  Salvar
                </button>
              </form>
            </div>
          </aside >)}
        </div>
        <div className="hidden w-3/4 bg-gray-100 sm:block">
          <div className="flex items-center justify-center h-full">
            <p className="text-gray-400">Selecione um contato para começar a conversar</p>
          </div>
        </div>
      </div >
      <Modal isOpen={modalOpen} onClose={closeModal}>
        <ContactForm onClose={closeModal} contactSelected={contactSelected} />
      </Modal>
    </>
  );
}