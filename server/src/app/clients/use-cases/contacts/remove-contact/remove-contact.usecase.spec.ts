import { Client, ClientProps } from "../../../../../domain/clients/client.entity";
import { Contact } from "../../../../../domain/contacts/contact.entity";
import { InMemoryClientRepository } from "../../../../../infra/repositories/in-memory-client.repository";
import { RemoveContactFromClientUseCase } from "./remove-contact.usecase";

describe("RemoveContactFromClientUseCase", () => {
  let removeContactFromClientUseCase: RemoveContactFromClientUseCase;
  let clientRepository: InMemoryClientRepository;

  beforeEach(() => {
    clientRepository = new InMemoryClientRepository();
    removeContactFromClientUseCase = new RemoveContactFromClientUseCase(clientRepository);
  });

  it("should remove the specified contact from the client", async () => {
    const clientProps: ClientProps = {
      fullName: "John Doe",
      email: "johndoe@example.com",
      phone: "1234567890",
      contacts: [new Contact({
        fullName: "Jane Smith",
        email: "janesmith@example.com",
        phone: "9876543210",
        registrationDate: new Date(),
        clientId: "666e3cf8-c853-45e6-80ab-72a161e21460"
      })],
    };
    const createdClient = await clientRepository.create(new Client(clientProps));

    await removeContactFromClientUseCase.execute(createdClient.id, createdClient.contacts[0].id);

    const updatedClient = await clientRepository.getById(createdClient.id);
    expect(updatedClient).toBeDefined();
    expect(updatedClient.contacts.length).toBe(0);
  });

  it("should throw an error if the client with the specified ID does not exist", async () => {
    const nonExistentClientId = "non-existent-client-id";
    const contactId = "contact-id";
    await expect(removeContactFromClientUseCase.execute(nonExistentClientId, contactId)).rejects.toThrowError(
      "Client not found"
    );
  });

  it("should throw an error if the contact with the specified ID does not exist in the client", async () => {
    const clientProps: ClientProps = {
      fullName: "John Doe",
      email: "johndoe@example.com",
      phone: "1234567890",
    };
    const createdClient = await clientRepository.create(new Client(clientProps));

    const nonExistentContactId = "non-existent-contact-id";
    await expect(
      removeContactFromClientUseCase.execute(createdClient.id, nonExistentContactId)
    ).rejects.toThrowError("Contact not found");
  });
});
