import { Contact } from "../contacts/contact.entity";
import { Client, ClientProps } from "./client.entity";

describe("Client", () => {
  const clientProps: ClientProps = {
    fullName: "John Doe",
    email: "johndoe@example.com",
    phone: "1234567890",
    createdAt: new Date(),
    contacts: [],
  };

  describe("constructor", () => {
    it("should create a new Client instance", () => {
      const client = new Client(clientProps);

      expect(client).toBeInstanceOf(Client);
      expect(client.fullName).toEqual(clientProps.fullName);
      expect(client.email).toEqual(clientProps.email);
      expect(client.phone).toEqual(clientProps.phone);
      expect(client.createdAt).toEqual(clientProps.createdAt);
      expect(client.contacts).toEqual(clientProps.contacts);
      expect(client.id).toBeDefined();
    });

    it("should assign the provided id if available", () => {
      const customId = "custom-id";
      const client = new Client(clientProps, customId);

      expect(client.id).toEqual(customId);
    });

    it("should set default values if props are not provided", () => {
      const client = new Client({ fullName: "Jane Doe", email: "janedoe@example.com", phone: "9876543210" });

      expect(client.createdAt).toBeInstanceOf(Date);
      expect(client.contacts).toEqual([]);
    });
  });

  describe("toObject", () => {
    it("should return the Client properties as an object", () => {
      const client = new Client(clientProps);
      const clientObject = client.toObject();

      expect(clientObject).toEqual({
        id: expect.any(String),
        ...clientProps,
        contacts: [],
      });
    });
  });

  describe("setters", () => {
    it("should set the fullName property", () => {
      const client = new Client(clientProps);
      const newFullName = "Jane Doe";
      client.fullName = newFullName;

      expect(client.fullName).toEqual(newFullName);
    });

    it("should set the email property", () => {
      const client = new Client(clientProps);
      const newEmail = "janedoe@example.com";
      client.email = newEmail;

      expect(client.email).toEqual(newEmail);
    });

    it("should set the phone property", () => {
      const client = new Client(clientProps);
      const newPhone = "9876543210";
      client.phone = newPhone;

      expect(client.phone).toEqual(newPhone);
    });

    it("should set the createdAt property", () => {
      const client = new Client(clientProps);
      const newCreatedAt = new Date();
      client.createdAt = newCreatedAt;

      expect(client.createdAt).toEqual(newCreatedAt);
    });

    it("should set the contacts property", () => {
      const client = new Client(clientProps);
      const newContacts: Contact[] = [
        new Contact({ fullName: "Contact 1", email: "contact1@example.com", phone: "1111111111", registrationDate: new Date(), clientId: client.id }),
        new Contact({ fullName: "Contact 2", email: "contact2@example.com", phone: "2222222222", registrationDate: new Date(), clientId: client.id }),
      ];
      client.contacts = newContacts;

      expect(client.contacts).toEqual(newContacts);
    });
  });

  describe("addContact", () => {
    it("should add a new contact to the client's contacts", () => {
      const client = new Client(clientProps);
      const contact = new Contact({ fullName: "New Contact", email: "newcontact@example.com", phone: "9999999999", registrationDate: new Date(), clientId: client.id });
      client.addContact(contact);

      expect(client.contacts).toContain(contact);
    });
  });

  describe("updateContact", () => {
    it("should update an existing contact in the client's contacts", () => {
      const client = new Client(clientProps);
      const contact = new Contact({ fullName: "Contact 1", email: "contact1@example.com", phone: "1111111111", registrationDate: new Date(), clientId: client.id });
      client.addContact(contact);

      const updatedContact = new Contact({ fullName: "Updated Contact", email: "updatedcontact@example.com", phone: "9999999999", registrationDate: new Date(), clientId: client.id }, contact.id);
      client.updateContact(updatedContact);
      expect(client.contacts).toContain(updatedContact);
    });

    it("should return the updated contact", () => {
      const client = new Client(clientProps);
      const contact = new Contact({ fullName: "Contact 1", email: "contact1@example.com", phone: "1111111111", registrationDate: new Date(), clientId: client.id });
      client.addContact(contact);

      const updatedContact = new Contact({ fullName: "Updated Contact", email: "updatedcontact@example.com", phone: "9999999999", registrationDate: new Date(), clientId: client.id }, contact.id);
      const result = client.updateContact(updatedContact);

      expect(result).toEqual(updatedContact);
    });

    it("should not update the contact if it does not exist in the client's contacts", () => {
      const client = new Client(clientProps);
      const contact = new Contact({ fullName: "Contact 1", email: "contact1@example.com", phone: "1111111111", registrationDate: new Date(), clientId: client.id });

      const updatedContact = new Contact({ fullName: "Updated Contact", email: "updatedcontact@example.com", phone: "9999999999", registrationDate: new Date(), clientId: client.id }, contact.id);
      const result = client.updateContact(updatedContact);

      expect(result).toBeUndefined();
    });
  });

  describe("removeContact", () => {
    it("should remove an existing contact from the client's contacts", () => {
      const client = new Client(clientProps);
      const contact = new Contact({ fullName: "Contact 1", email: "contact1@example.com", phone: "1111111111", registrationDate: new Date(), clientId: client.id });
      client.addContact(contact);

      client.removeContact(contact);

      expect(client.contacts).not.toContain(contact);
    });

    it("should return the removed contact", () => {
      const client = new Client(clientProps);
      const contact = new Contact({ fullName: "Contact 1", email: "contact1@example.com", phone: "1111111111", registrationDate: new Date(), clientId: client.id });
      client.addContact(contact);

      const result = client.removeContact(contact);

      expect(result).toBeUndefined();
      expect(client.contacts).not.toContain(contact);
    });

    it("should not remove the contact if it does not exist in the client's contacts", () => {
      const client = new Client(clientProps);
      const contact = new Contact({ fullName: "Contact 1", email: "contact1@example.com", phone: "1111111111", registrationDate: new Date(), clientId: client.id });

      const result = client.removeContact(contact);

      expect(result).toBeUndefined();
    });
  });
});
