import { Client } from "../../../../../domain/clients/client.entity";
import { InMemoryClientRepository } from "../../../../../infra/repositories/in-memory-client.repository";
import { InputCreateDTO } from "../../create/create-client.dto";
import { InputAddContactDTO } from "./add-contact.dto";
import { AddContactToClientUseCase } from "./add-contact.usecase";

describe("AddContactToClientUseCase", () => {
  let addContactToClientUseCase: AddContactToClientUseCase;
  let clientRepository: InMemoryClientRepository;

  beforeEach(() => {
    clientRepository = new InMemoryClientRepository();
    addContactToClientUseCase = new AddContactToClientUseCase(clientRepository);
  });

  it("should add a contact to the client with the specified ID", async () => {
    const clientProps: InputCreateDTO = {
      fullName: "John Doe",
      email: "johndoe@example.com",
      phone: "1234567890",
    };
    const createdClient = await clientRepository.create(new Client(clientProps));

    const contactProps: InputAddContactDTO = {
      fullName: "Jane Smith",
      email: "janesmith@example.com",
      phone: "9876543210",
    };

    const result = await addContactToClientUseCase.execute(createdClient.id, contactProps);

    expect(result.id).toBeDefined();
    expect(result.fullName).toEqual(contactProps.fullName);
    expect(result.email).toEqual(contactProps.email);
    expect(result.phone).toEqual(contactProps.phone);
    expect(result.registrationDate).toBeDefined();

    const updatedClient = await clientRepository.getById(createdClient.id);
    expect(updatedClient.contacts.length).toBe(1);
    expect(updatedClient.contacts[0].id).toEqual(result.id);
  });

  it("should throw an error if the client with the specified ID does not exist", async () => {
    const nonExistentId = "non-existent-id";
    const contactProps: InputAddContactDTO = {
      fullName: "Jane Smith",
      email: "janesmith@example.com",
      phone: "9876543210",
    };
    await expect(addContactToClientUseCase.execute(nonExistentId, contactProps)).rejects.toThrowError(
      "Client not found"
    );
  });
});
