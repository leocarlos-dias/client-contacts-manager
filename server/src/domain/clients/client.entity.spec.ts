import { Contact } from "../contacts/contact.entity";
import { Client } from "./client.entity";

describe("ClientEntity", () => {
  it(("should be able to create"), () => {
    const clientData = {
      firstName: "John",
      lastName: "Doe",
      email: "jonhdoe@example.com",
      phone: "01234567891"
    };
    const clientInstace = new Client(clientData);
    expect(clientInstace).toBeDefined();
    expect(clientInstace).toBeInstanceOf(Client);
    expect(clientInstace.id).toBeDefined();
    expect(clientInstace.firstName).toEqual(clientData.firstName);
    expect(clientInstace.lastName).toEqual(clientData.lastName);
    expect(clientInstace.email).toEqual(clientData.email);
    expect(clientInstace.phone).toEqual(clientData.phone);
    expect(clientInstace.createdAt).toBeDefined();
    expect(clientInstace.contacts).toBeDefined();
    expect(clientInstace.contacts.length).toEqual(0);
  });

  it(("should be able to create with contacts"), () => {
    const clientData = {
      firstName: "John",
      lastName: "Doe",
      email: "jonhdoe@example.com",
      phone: "01234567891"
    };
    const contactsData = [
      {
        firstName: "Jane",
        lastName: "Doe",
        email: "janedoe@example.com",
        phone: "01234567891",
      }
    ];
    const contactsInstace = contactsData.map(c => new Contact(c));
    contactsInstace.forEach(c => c.register());
    const clientInstace = new Client(clientData, undefined, contactsInstace);
    expect(clientInstace).toBeDefined();
    expect(clientInstace).toBeInstanceOf(Client);
    expect(clientInstace.id).toBeDefined();
    expect(clientInstace.firstName).toEqual(clientData.firstName);
    expect(clientInstace.lastName).toEqual(clientData.lastName);
    expect(clientInstace.email).toEqual(clientData.email);
    expect(clientInstace.phone).toEqual(clientData.phone);
    expect(clientInstace.createdAt).toBeDefined();
    expect(clientInstace.contacts).toBeDefined();
    expect(clientInstace.contacts).toHaveLength(1);
    expect(clientInstace.contacts[0].id).toBeDefined();
    expect(clientInstace.contacts[0].firstName).toEqual(contactsData[0].firstName);
    expect(clientInstace.contacts[0].lastName).toEqual(contactsData[0].lastName);
    expect(clientInstace.contacts[0].email).toEqual(contactsData[0].email);
    expect(clientInstace.contacts[0].phone).toEqual(contactsData[0].phone);
    expect(clientInstace.contacts[0].registeredAt).toBeDefined();
    expect(clientInstace.contacts[0].registeredAt).toBeInstanceOf(Date);
  });

  it(("should be able to update"), () => {
    const clientData = {
      firstName: "John",
      lastName: "Doe",
      email: "jonhdoe@example.com",
      phone: "01234567891"
    };
    const clientInstace = new Client(clientData);
    const newClientData = {
      firstName: "Jane",
      lastName: "Doe",
      email: "janedoe@example.com",
      phone: "01234567891"
    };
    clientInstace.firstName = newClientData.firstName;
    clientInstace.lastName = newClientData.lastName;
    clientInstace.email = newClientData.email;
    clientInstace.phone = newClientData.phone;
    expect(clientInstace).toBeDefined();
    expect(clientInstace).toBeInstanceOf(Client);
    expect(clientInstace.id).toBeDefined();
    expect(clientInstace.firstName).toEqual(newClientData.firstName);
    expect(clientInstace.lastName).toEqual(newClientData.lastName);
    expect(clientInstace.email).toEqual(newClientData.email);
    expect(clientInstace.phone).toEqual(newClientData.phone);
  });

  it(("should be able to add contact"), () => {
    const clientData = {
      firstName: "John",
      lastName: "Doe",
      email: "jonhdoe@example.com",
      phone: "01234567891"
    };
    const clientInstace = new Client(clientData);
    const contactData = {
      firstName: "Jane",
      lastName: "Doe",
      email: "janedoe@example.com",
      phone: "01234567891"
    };
    const contactInstace = new Contact(contactData);
    clientInstace.addContact(contactInstace);
    expect(clientInstace).toBeDefined();
    expect(clientInstace).toBeInstanceOf(Client);
    expect(clientInstace.id).toBeDefined();
    expect(clientInstace.firstName).toEqual(clientData.firstName);
    expect(clientInstace.lastName).toEqual(clientData.lastName);
    expect(clientInstace.email).toEqual(clientData.email);
    expect(clientInstace.phone).toEqual(clientData.phone);
    expect(clientInstace.contacts).toBeDefined();
    expect(clientInstace.contacts).toHaveLength(1);
    expect(clientInstace.contacts[0]).toBeDefined();
    expect(clientInstace.contacts[0]).toBeInstanceOf(Contact);
    expect(clientInstace.contacts[0].id).toBeDefined();
    expect(clientInstace.contacts[0].firstName).toEqual(contactData.firstName);
    expect(clientInstace.contacts[0].lastName).toEqual(contactData.lastName);
    expect(clientInstace.contacts[0].email).toEqual(contactData.email);
    expect(clientInstace.contacts[0].phone).toEqual(contactData.phone);
    expect(clientInstace.contacts[0].registeredAt).toBeDefined();
    expect(clientInstace.contacts[0].registeredAt).toBeInstanceOf(Date);
  });

  it(("should be able to remove contact"), () => {
    const clientData = {
      firstName: "John",
      lastName: "Doe",
      email: "jonhdoe@example.com",
      phone: "01234567891"
    };
    const clientInstace = new Client(clientData);
    const contactData = {
      firstName: "Jane",
      lastName: "Doe",
      email: "janedoe@example.com",
      phone: "01234567891"
    };
    const contactInstace = new Contact(contactData);
    clientInstace.addContact(contactInstace);
    expect(clientInstace).toBeDefined();
    expect(clientInstace).toBeInstanceOf(Client);
    expect(clientInstace.id).toBeDefined();
    expect(clientInstace.firstName).toEqual(clientData.firstName);
    expect(clientInstace.lastName).toEqual(clientData.lastName);
    expect(clientInstace.email).toEqual(clientData.email);
    expect(clientInstace.phone).toEqual(clientData.phone);
    expect(clientInstace.contacts).toBeDefined();
    expect(clientInstace.contacts).toHaveLength(1);
    expect(clientInstace.contacts[0]).toBeDefined();
    expect(clientInstace.contacts[0]).toBeInstanceOf(Contact);
    expect(clientInstace.contacts[0].id).toBeDefined();
    expect(clientInstace.contacts[0].firstName).toEqual(contactData.firstName);
    expect(clientInstace.contacts[0].lastName).toEqual(contactData.lastName);
    clientInstace.removeContact(contactInstace);
    expect(clientInstace.contacts).toHaveLength(0);
  });

  it("should be able to update a contact", () => {
    const clientData = {
      firstName: "John",
      lastName: "Doe",
      email: "jonhdoe@example.com",
      phone: "01234567891"
    };
    const clientInstace = new Client(clientData);
    const contactData = {
      firstName: "Jane",
      lastName: "Doe",
      email: "janedoe@example.com",
      phone: "01234567891"
    };
    const contactInstace = new Contact(contactData);
    clientInstace.addContact(contactInstace);
    expect(clientInstace).toBeDefined();
    expect(clientInstace).toBeInstanceOf(Client);
    expect(clientInstace.id).toBeDefined();
    expect(clientInstace.firstName).toEqual(clientData.firstName);
    expect(clientInstace.lastName).toEqual(clientData.lastName);
    expect(clientInstace.email).toEqual(clientData.email);
    expect(clientInstace.phone).toEqual(clientData.phone);
    expect(clientInstace.contacts).toBeDefined();
    expect(clientInstace.contacts).toHaveLength(1);
    expect(clientInstace.contacts[0]).toBeDefined();
    expect(clientInstace.contacts[0]).toBeInstanceOf(Contact);
    expect(clientInstace.contacts[0].id).toBeDefined();
    expect(clientInstace.contacts[0].firstName).toEqual(contactData.firstName);
    expect(clientInstace.contacts[0].lastName).toEqual(contactData.lastName);
    expect(clientInstace.contacts[0].email).toEqual(contactData.email);
    expect(clientInstace.contacts[0].phone).toEqual(contactData.phone);
    expect(clientInstace.contacts[0].registeredAt).toBeDefined();
    expect(clientInstace.contacts[0].registeredAt).toBeInstanceOf(Date);
    const newContactData = {
      firstName: "Mary",
      lastName: "Doe",
      email: "marydoe@example.com",
      phone: "98765432109"
    };
    clientInstace.updateContact(contactInstace, newContactData);
    expect(clientInstace.contacts).toHaveLength(1);
    expect(clientInstace.contacts[0]).toBeDefined();
    expect(clientInstace.contacts[0]).toBeInstanceOf(Contact);
    expect(clientInstace.contacts[0].id).toBeDefined();
    expect(clientInstace.contacts[0].firstName).toEqual(newContactData.firstName);
    expect(clientInstace.contacts[0].lastName).toEqual(newContactData.lastName);
    expect(clientInstace.contacts[0].email).toEqual(newContactData.email);
    expect(clientInstace.contacts[0].phone).toEqual(newContactData.phone);
    expect(clientInstace.contacts[0].registeredAt).toBeDefined();
    expect(clientInstace.contacts[0].registeredAt).toBeInstanceOf(Date);
    expect(clientInstace.contacts[0].registeredAt).toEqual(contactInstace.registeredAt);
  });

  it("should not be able to create with invalid phone number", () => {
    const clientData = {
      firstName: "John",
      lastName: "Doe",
      email: "jonhdoe@example.com",
      phone: "invalid-phone-number"
    };
    expect(() => new Client(clientData)).toThrowError("Invalid phone number");
  });

  it("should not be able to create with invalid email", () => {
    const clientData = {
      firstName: "John",
      lastName: "Doe",
      email: "invalid-email",
      phone: "01234567891"
    };
    expect(() => new Client(clientData)).toThrowError("Invalid email");
  });
});