'use client'
import axios from 'axios';
import { useRouter } from 'next/navigation';
import { ReactNode, createContext, useState } from 'react';
import { toast } from "react-hot-toast";

export type ContactProps = {
  id: string;
  firstName: string;
  lastName: string;
  phone: string;
  email: string;
  registeredAt: Date;
};

export type ClientProps = {
  id: string;
  firstName: string;
  lastName: string;
  phone: string;
  email: string;
  createdAt: Date;
  contacts: ContactProps[];
};

export type ClientFormProps = Omit<ClientProps, "id" | "contacts" | "createdAt">

export type ContactFormProps = Omit<ContactProps, "id" | "registeredAt">

export type AuthFormProps = Pick<ClientProps, "email" | "phone">

type ClientContextProps = {
  clientLogged: { client: ClientProps, access_token: string } | null;
  authClient: (data: AuthFormProps) => Promise<void>;
  createClient: (data: ClientFormProps) => Promise<void>;
  getClient: (id: string) => Promise<ClientProps | undefined>;
  getAllClients: () => Promise<ClientProps[] | undefined>;
  updateClient: (id: string, data: Partial<ClientFormProps>) => Promise<void>;
  deleteClient: (id: string) => Promise<void>;
  addContact: (id: string, data: ContactFormProps) => Promise<void>;
  updateContact: (id: string, contactId: string, data: Partial<ContactFormProps>) => Promise<void>;
  deleteContact: (id: string, contactId: string) => Promise<void>;
};

export const ClientContext = createContext<ClientContextProps>({} as ClientContextProps);

export function ClientContextProvider({ children }: { children: ReactNode }) {
  const [clientLogged, setClientLogged] = useState<{ client: ClientProps, access_token: string } | null>(null);
  const router = useRouter();

  const authClient = async (data: AuthFormProps): Promise<void> => {
    try {
      const response = await axios.post<{ access_token: string, client: ClientProps }>("http://localhost:3333/clients/auth", data);
      if (response.status !== 200) {
        toast.error("Credenciais inválidas.")
        return
      }
      if (!response.data) {
        toast.error("Credenciais inválidas.")
        return
      }
      setClientLogged(response.data);
      router.push("/dashboards");
      toast.success("Cliente autenticado com sucesso!")
    } catch (err: any) {
      const errorMessage = err.response.data.message || "Erro desconhecido.";
      toast.error(errorMessage)
    }
  }

  const createClient = async (data: ClientFormProps): Promise<void> => {
    try {
      await axios.post("http://localhost:3333/clients", data);
      toast.success("Cliente cadastrado com sucesso!")
    } catch (err: any) {
      const errorMessage = err.response.data.message || "Erro desconhecido.";
      toast.error(errorMessage)
    }
  };

  const getClient = async (id: string): Promise<ClientProps | undefined> => {
    try {
      const response = await axios.get<ClientProps>("http://localhost:3333/clients/" + id,
        {
          headers: {
            "Content-Type": "application/json",
            "Authorization": "Bearer " + clientLogged?.access_token
          }
        });
      return response.data
    } catch (err: any) {
      const errorMessage = err.response.data.message || "Erro desconhecido.";
      toast.error(errorMessage);
    }
  }

  const getAllClients = async (): Promise<ClientProps[] | undefined> => {
    try {
      const response = await axios.get("http://localhost:3333/clients",
        {
          headers: {
            "Content-Type": "application/json",
            "Authorization": "Bearer " + clientLogged?.access_token
          }
        });
      return response.data
    } catch (err: any) {
      const errorMessage = err.response.data.message || "Erro desconhecido.";
      console.error(errorMessage)
    }
  };

  const updateClient = async (id: string, data: Partial<ClientFormProps>): Promise<void> => {
    try {
      await axios.patch(`http://localhost:3333/clients/${id}`, data,
        {
          headers: {
            "Content-Type": "application/json",
            "Authorization": "Bearer " + clientLogged?.access_token
          }
        });
      setClientLogged(previousValues => ({
        ...previousValues!,
        client: { ...previousValues!.client, ...data },
      }));
      toast.success("Cliente atualzado com sucesso!")
    } catch (err: any) {
      const errorMessage = err.response.data.message || "Erro desconhecido.";
      toast.error(errorMessage)
    }
  };

  const deleteClient = async (id: string): Promise<void> => {
    try {
      await axios.delete(`http://localhost:3333/clients/${id}`,
        {
          headers: {
            "Content-Type": "application/json",
            "Authorization": "Bearer " + clientLogged?.access_token
          }
        });
      setClientLogged(null);
      toast.success("Cliente removido com sucesso!")
    } catch (err: any) {
      const errorMessage = err.response.data.message || "Erro desconhecido.";
      toast.error(errorMessage)
    }
  };

  const addContact = async (id: string, data: ContactFormProps): Promise<void> => {
    try {
      const response = await axios.post<ContactProps>(`http://localhost:3333/clients/${id}/contacts`, data, {
        headers: {
          "Content-Type": "application/json",
          "Authorization": "Bearer " + clientLogged?.access_token
        }
      });
      const contact = response.data;
      setClientLogged(previousValue => previousValue ? { ...previousValue, client: { ...previousValue.client, contacts: [...previousValue.client.contacts, contact] } } : previousValue);
      toast.success("Contato adicionado com sucesso!")
    } catch (err: any) {
      const errorMessage = err.response.data.message || "Erro desconhecido.";
      toast.error(errorMessage)
    }
  };

  const updateContact = async (id: string, contactId: string, data: Partial<ContactFormProps>): Promise<void> => {
    try {
      const response = await axios.patch<ContactProps>(`http://localhost:3333/clients/${id}/contacts/${contactId}`, data, {
        headers: {
          "Content-Type": "application/json",
          "Authorization": "Bearer " + clientLogged?.access_token
        }
      });
      const updatedContact = response.data;
      setClientLogged((previousValues) =>
        previousValues
          ? {
            ...previousValues,
            client: {
              ...previousValues.client,
              contacts: previousValues.client.contacts.map((c) =>
                c.id === contactId ? { ...c, ...updatedContact } : c
              ),
            },
          }
          : previousValues
      );
      toast.success("Contato atualizado com sucesso!")
    } catch (err: any) {
      const errorMessage = err.response.data.message || "Erro desconhecido.";
      toast.error(errorMessage)
    }
    console.log(clientLogged)
  };

  const deleteContact = async (id: string, contactId: string): Promise<void> => {
    try {
      await axios.delete(`http://localhost:3333/clients/${id}/contacts/${contactId}`, {
        headers: {
          "Content-Type": "application/json",
          "Authorization": "Bearer " + clientLogged?.access_token
        }
      });
      setClientLogged((previousValues) =>
        previousValues
          ? {
            ...previousValues,
            client: {
              ...previousValues.client,
              contacts: previousValues.client.contacts.filter((contact) => contact.id !== contactId),
            },
          }
          : previousValues
      );
      toast.success("Contato removido com sucesso!")
    } catch (err: any) {
      const errorMessage = err.response.data.message || "Erro desconhecido.";
      toast.error(errorMessage)
    }
  };

  return (
    <ClientContext.Provider
      value={{
        clientLogged,
        authClient,
        createClient,
        getClient,
        getAllClients,
        updateClient,
        deleteClient,
        addContact,
        updateContact,
        deleteContact,
      }}>
      {children}
    </ClientContext.Provider>
  );
};
function setHeader(arg0: string, arg1: string) {
  throw new Error('Function not implemented.');
}

