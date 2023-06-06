"use client"
import { ClientProps, ContactProps, useAuth } from "@/app/contexts/AuthContext";
import axios from "axios";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { useForm } from "react-hook-form";

type ContactFormInputs = {
  fullName: string;
  email: string;
  phone: string;
};

type ClientFormInputs = {
  fullName: string;
  email: string;
  phone: string;
}

export default function DashboardPage() {
  const { client, setClient } = useAuth();
  const { register: registerAddContact, handleSubmit: handleSubmitAddContact, formState: { errors: errorsAddContact }, reset: resetAddContact } = useForm<ContactFormInputs>();
  const { register: registerContact, handleSubmit: handleSubmitContact, formState: { errors: errorsContact }, reset: resetContact } = useForm<ContactFormInputs>();
  const { register: registerClient, handleSubmit: handleSubmitClient, formState: { errors: errorsClient }, reset: resetClient } = useForm<ClientFormInputs>();
  const router = useRouter();
  useEffect(() => {
    (async function () {
      try {
        const token = localStorage.getItem("access_token");
        const response = await axios.get("http://localhost:3000/profile", {
          headers: { Authorization: `Bearer ${token}` },
        })
        const client = response.data
        setClient(client);
      } catch (error) {
        console.log("Erro ao obter as informações do cliente:", error);
      }
    })()
  }, [setClient]);

  const addContact = async (data: ContactFormInputs) => {
    try {
      const response = await axios.post<ContactProps>(`http://localhost:3000/clients/${client!.id}/contacts`, data, {
        headers: { Authorization: `Bearer ${localStorage.getItem("access_token")}` },
      });
      if (response.status !== 201) {
        throw new Error("Erro ao cadastrar contato");
      }
      const newContact = response.data;
      setClient(previousValue => ({ ...previousValue!, contacts: [...previousValue!.contacts, newContact] }));
      resetContact();
    } catch (error) {
      console.error(error);
    }
  };

  const removeContact = async (contactId: string) => {
    try {
      const response = await axios.delete(`http://localhost:3000/clients/${client!.id}/contacts/${contactId}`, {
        headers: { Authorization: `Bearer ${localStorage.getItem("access_token")}` },
      });
      if (response.status !== 204) {
        throw new Error("Erro ao remover contato");
      }
      const newContacts = client!.contacts.filter(contact => contact.id !== contactId);
      setClient(previousValue => ({ ...previousValue!, contacts: newContacts }));
    } catch (error) {
      console.error(error);
    }
  }

  const updateContact = async (contactId: string, data: ContactFormInputs) => {
    try {
      const response = await axios.patch<ContactProps>(`http://localhost:3000/clients/${client!.id}/contacts/${contactId}`, data, {
        headers: { Authorization: `Bearer ${localStorage.getItem("access_token")}` },
      });
      const updatedContact = response.data;
      setClient(prevClient => ({
        ...prevClient!,
        contacts: prevClient!.contacts.map(contact => contact.id === updatedContact.id ? updatedContact : contact
        )
      }));
    } catch (error) {
      console.error(error);
    }
  };

  const updateClient = async (data: ClientFormInputs) => {
    try {
      const response = await axios.patch<ClientProps>(`http://localhost:3000/clients/${client!.id}`, data, {
        headers: { Authorization: `Bearer ${localStorage.getItem("access_token")}` },
      });
      const updatedClient = response.data;
      setClient(prevClient => ({
        ...prevClient!,
        ...updatedClient
      }));
    } catch (error) {
      console.error(error);
    }
  }

  const removeClient = async () => {
    try {
      const response = await axios.delete(`http://localhost:3000/clients/${client!.id}`, {
        headers: { Authorization: `Bearer ${localStorage.getItem("access_token")}` },
      });
      if (response.status !== 204) {
        throw new Error("Erro ao remover cliente");
      }
      setClient(null);
    } catch (error) {
      console.error(error);
    }
  }

  const signOut = () => {
    localStorage.removeItem("access_token");
    setClient(null);
    router.push("/");
  }

  return (
    <div className="container mx-auto py-8">
      <h1 className="text-2xl font-bold">Dashboard</h1>
      <p className="mt-2 font-bold mb-2">Bem vindo(a)</p>
      <button className="underline mb-8" onClick={signOut}>SAIR</button>
      {client ? (
        <>
          <details>
            <summary className="text-md font-bold">Atualizar informações</summary>
            <form onSubmit={handleSubmitClient(updateClient)} className="mt-4">
              <div className="mb-4">
                <label htmlFor="fullName" className="block mb-2 font-bold">
                  Nome completo
                </label>
                <input
                  type="text"
                  id="fullName"
                  {...registerClient("fullName")}
                  className={`w-full p-2 border ${errorsClient.fullName ? "border-red-500" : "border-gray-300"
                    }`}
                  defaultValue={client.fullName}
                />
              </div>
              <div className="mb-4">
                <label htmlFor="email" className="block mb-2 font-bold">
                  E-mail
                </label>
                <input
                  type="email"
                  id="email"
                  {...registerClient("email")}
                  className={`w-full p-2 border ${errorsClient.email ? "border-red-500" : "border-gray-300"
                    }`}
                  defaultValue={client.email}
                />
              </div>
              <div className="mb-4">
                <label htmlFor="phone" className="block mb-2 font-bold">
                  Telefone
                </label>
                <input
                  type="tel"
                  id="phone"
                  {...registerClient("phone", { required: true })}
                  className={`w-full p-2 border ${errorsClient.phone ? "border-red-500" : "border-gray-300"
                    }`}
                  defaultValue={client.email}
                />
              </div>
              <button
                type="submit"
                className="w-full py-2 px-4 bg-blue-500 text-white font-bold rounded hover:bg-blue-700 mb-2 "
              >
                Atualizar
              </button>
              <button
                type="button"
                onClick={removeClient}
                className="w-full py-2 px-4 bg-red-500 text-white font-bold rounded hover:bg-red-700"
              >
                Excluir
              </button>
            </form>
          </details>
          <div className="grid grid-cols-2 gap-2">
            <p className="mt-4"><span className="font-bold">Seu nome: </span> {client.fullName}</p>
            <p className="mt-4"><span className="font-bold">Seu email: </span> {client.email}</p>
            <p className="mt-4"><span className="font-bold">Seu telefone: </span> {client.phone}</p>
            <p className="mt-4"><span className="font-bold">Sua data de registro: </span> {client.createdAt.substring(0, 10)}</p>
          </div>
          <h2 className="text-xl font-bold mt-8">Adicionar contatos</h2>
          <form onSubmit={handleSubmitAddContact(addContact)} className="mt-4">
            <div className="mb-4">
              <label htmlFor="fullName" className="block mb-2 font-bold">
                Nome completo
              </label>
              <input
                type="text"
                id="fullName"
                {...registerAddContact("fullName", { required: true })}
                className={`w-full p-2 border ${errorsAddContact.fullName ? "border-red-500" : "border-gray-300"
                  }`}
              />
              {errorsAddContact.fullName && (
                <span className="text-red-500">This field is required</span>
              )}
            </div>
            <div className="mb-4">
              <label htmlFor="email" className="block mb-2 font-bold">
                E-mail
              </label>
              <input
                type="email"
                id="email"
                {...registerAddContact("email", { required: true })}
                className={`w-full p-2 border ${errorsAddContact.email ? "border-red-500" : "border-gray-300"
                  }`}
              />
              {errorsAddContact.email && (
                <span className="text-red-500">This field is required</span>
              )}
            </div>
            <div className="mb-4">
              <label htmlFor="phone" className="block mb-2 font-bold">
                Telefone
              </label>
              <input
                type="tel"
                id="phone"
                {...registerAddContact("phone", { required: true })}
                className={`w-full p-2 border ${errorsAddContact.phone ? "border-red-500" : "border-gray-300"
                  }`}
              />
              {errorsAddContact.phone && (
                <span className="text-red-500">This field is required</span>
              )}
            </div>
            <button
              type="submit"
              className="w-full py-2 px-4 bg-blue-500 text-white font-bold rounded hover:bg-blue-700"
            >
              Add Contact
            </button>
          </form>
          <p className="mt-4 font-bold">Seus contatos:</p>
          {
            client.contacts.length > 0 ?
              (<ul className="list-disc ml-8 mt-8">
                {client.contacts.map(contact => (
                  <li key={contact.id}>
                    <p>{contact.fullName}</p>
                    <p>{contact.email}</p>
                    <p>{contact.phone}</p>
                    <p>{contact.registrationDate.substring(0, 10)}</p>
                    <details>
                      <summary className="cursor-pointer">Editar</summary>
                      <form onSubmit={handleSubmitContact(data => updateContact(contact.id, data))} className="mt-4">
                        <div className="mb-4">
                          <label htmlFor="fullName" className="block mb-2 font-bold">
                            Nome completo
                          </label>
                          <input
                            type="text"
                            id="fullName"
                            defaultValue={contact.fullName}
                            {...registerContact("fullName", { required: false })}
                            className={`w-full p-2 border ${errorsContact.fullName ? "border-red-500" : "border-gray-300"
                              }`}
                          />
                        </div>
                        <div className="mb-4">
                          <label htmlFor="fullName" className="block mb-2 font-bold">
                            email
                          </label>
                          <input
                            type="text"
                            id="email"
                            defaultValue={contact.email}
                            {...registerContact("email", { required: false })}
                            className={`w-full p-2 border ${errorsContact.email ? "border-red-500" : "border-gray-300"
                              }`}
                          />
                        </div>
                        <div className="mb-4">
                          <label htmlFor="fullName" className="block mb-2 font-bold">
                            telefone
                          </label>
                          <input
                            type="text"
                            id="phone"
                            defaultValue={contact.phone}
                            {...registerContact("phone", { required: false })}
                            className={`w-full p-2 border ${errorsContact.phone ? "border-red-500" : "border-gray-300"
                              }`}
                          />
                        </div>
                        <div className="mb-4">
                          <button
                            type="submit"
                            className="ml-2 text-blue-500"
                          >
                            Editar
                          </button>
                          <button
                            type="button"
                            onClick={() => removeContact(contact.id)}
                            className="ml-2 text-red-500"
                          >
                            Remover
                          </button>
                        </div>
                      </form>
                    </details>
                  </li>
                ))}
              </ul>)
              : <p className="mt-8">Você não possui contatos cadastrados.</p>
          }
        </>
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
}
