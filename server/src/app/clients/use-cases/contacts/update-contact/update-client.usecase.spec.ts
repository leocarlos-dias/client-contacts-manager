import { Client } from "../../../../../domain/clients/client.entity";
import { Contact } from "../../../../../domain/contacts/contact.entity";
import { InMemoryClientRepository } from "../../../../../infra/repositories/in-memory-client.repository";
import { InputUpdateContactDTO } from "./update-client.dto";
import { UpdateContactInClientUseCase } from "./update-contact.usecase";

describe("UpdateContactInClientUseCase", () => {
  let updateContactUseCase: UpdateContactInClientUseCase;
  let clientRepository: InMemoryClientRepository;

  beforeEach(() => {
    clientRepository = new InMemoryClientRepository();
    updateContactUseCase = new UpdateContactInClientUseCase(clientRepository);
  });

  it("should update the contact in the client", async () => {
    const clientId = "66705715-4a0a-4adb-b520-96359a08290f";
    const contactId = "66705715-4a0a-4adb-b520-96359a0829ab";
    const contact = {
      fullName: "John Doe",
      email: "johndoe@example.com",
      phone: "1234567890",
      registrationDate: new Date(),
      clientId
    };
    await clientRepository.create(new Client({
      fullName: "Client",
      email: "client@example.com",
      phone: "9876543210",
      createdAt: new Date(),
      contacts: [new Contact(contact, contactId)],
    }, clientId));


    const updatedContact: InputUpdateContactDTO = {
      fullName: "Jane Doe",
      email: "janedoe@example.com",
      phone: "0987654321",
    };

    const updatedContactDTO = await updateContactUseCase.execute(clientId, contactId, updatedContact);
    expect(updatedContactDTO.id).toEqual(contactId);
    expect(updatedContactDTO.fullName).toEqual(updatedContact.fullName);
    expect(updatedContactDTO.email).toEqual(updatedContact.email);
    expect(updatedContactDTO.phone).toEqual(updatedContact.phone);
    expect(updatedContactDTO.registrationDate).toBeInstanceOf(Date);

    const updatedClient = await clientRepository.getById(clientId);
    expect(updatedClient).toBeDefined();
    expect(updatedClient.contacts.length).toEqual(1);
    expect(updatedClient.contacts[0].clientId).toEqual(updatedContactDTO.clientId);
    expect(updatedClient.contacts[0].fullName).toEqual(updatedContactDTO.fullName);
    expect(updatedClient.contacts[0].email).toEqual(updatedContactDTO.email);
    expect(updatedClient.contacts[0].phone).toEqual(updatedContactDTO.phone);
    expect(updatedClient.contacts[0].registrationDate).toEqual(updatedContactDTO.registrationDate);
  });

  it("should throw an error if the client is not found", async () => {
    const clientId = "non-existing-client";
    const contactId = "66705715-4a0a-4adb-b520-96359a0829ab";
    const updatedContact: InputUpdateContactDTO = {
      fullName: "Jane Doe",
      email: "janedoe@example.com",
      phone: "0987654321",
    };

    await expect(updateContactUseCase.execute(clientId, contactId, updatedContact)).rejects.toThrowError(
      "Cliente não encontrado"
    );
  });

  it("should throw an error if the contact is not found in the client", async () => {
    const clientId = "client-id";
    const contactId = "non-existing-contact";
    const updatedContact: InputUpdateContactDTO = {
      fullName: "Jane Doe",
      email: "janedoe@example.com",
      phone: "0987654321",
    };

    await clientRepository.create(new Client({
      fullName: "Client",
      email: "client@example.com",
      phone: "9876543210",
      createdAt: new Date(),
    }, clientId));

    await expect(updateContactUseCase.execute(clientId, contactId, updatedContact)).rejects.toThrowError(
      "Contato não encontrado"
    );
  });
});
