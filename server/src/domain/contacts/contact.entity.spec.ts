import { Contact } from "./contact.entity";

describe("ContactEntity", () => {
  it("should be able to create", () => {
    const contactData = {
      firstName: "John",
      lastName: "Doe",
      email: "jonhdoe@example.com",
      phone: "01234567891"
    };
    const contactInstace = new Contact(contactData);
    expect(contactInstace).toBeDefined();
    expect(contactInstace).toBeInstanceOf(Contact);
    expect(contactInstace.id).toBeDefined();
    expect(contactInstace.firstName).toEqual(contactData.firstName);
    expect(contactInstace.lastName).toEqual(contactData.lastName);
    expect(contactInstace.email).toEqual(contactData.email);
    expect(contactInstace.phone).toEqual(contactData.phone);
  });

  it("should be able to update", () => {
    const contactData = {
      firstName: "John",
      lastName: "Doe",
      email: "jonhdoe@example.com",
      phone: "01234567891"
    };
    const contactInstace = new Contact(contactData);
    expect(contactInstace).toBeDefined();
    expect(contactInstace).toBeInstanceOf(Contact);
    expect(contactInstace.id).toBeDefined();
    expect(contactInstace.firstName).toEqual(contactData.firstName);
    expect(contactInstace.lastName).toEqual(contactData.lastName);
    expect(contactInstace.email).toEqual(contactData.email);
    expect(contactInstace.phone).toEqual(contactData.phone);
    const newContactData = {
      firstName: "Jane",
      lastName: "Doe",
      email: "janedoe@example.com",
      phone: "98765432109"
    };
    contactInstace.firstName = newContactData.firstName;
    contactInstace.lastName = newContactData.lastName;
    contactInstace.email = newContactData.email;
    contactInstace.phone = newContactData.phone;
    expect(contactInstace).toBeDefined();
    expect(contactInstace).toBeInstanceOf(Contact);
    expect(contactInstace.id).toBeDefined();
    expect(contactInstace.firstName).toEqual(newContactData.firstName);
    expect(contactInstace.lastName).toEqual(newContactData.lastName);
    expect(contactInstace.email).toEqual(newContactData.email);
    expect(contactInstace.phone).toEqual(newContactData.phone);
  });

  it("should not be able to create with invalid phone number", () => {
    const clientData = {
      firstName: "John",
      lastName: "Doe",
      email: "jonhdoe@example.com",
      phone: "invalid-phone-number"
    };
    expect(() => new Contact(clientData)).toThrowError("Invalid phone number");
  });

  it("should not be able to create with invalid email", () => {
    const clientData = {
      firstName: "John",
      lastName: "Doe",
      email: "invalid-email",
      phone: "01234567891"
    };
    expect(() => new Contact(clientData)).toThrowError("Invalid email");
  });
});