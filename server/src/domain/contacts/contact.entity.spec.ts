import { Contact } from "./contact.entity";

describe("Contact", () => {
  const contactProps = {
    fullName: "John Doe",
    email: "johndoe@example.com",
    phone: "1234567890",
    registrationDate: new Date(),
    clientId: "e8812821-cca9-42f4-ae8a-c99682623be2",
  };

  describe("constructor", () => {
    it("should create a new Contact instance", () => {
      const contact = new Contact(contactProps);

      expect(contact).toBeInstanceOf(Contact);
      expect(contact.fullName).toEqual(contactProps.fullName);
      expect(contact.email).toEqual(contactProps.email);
      expect(contact.phone).toEqual(contactProps.phone);
      expect(contact.registrationDate).toEqual(contactProps.registrationDate);
      expect(contact.id).toBeDefined();
    });

    it("should assign the provided id if available", () => {
      const customId = "e8812821-cca9-42f4-ae8a-c99682623be2";
      const contact = new Contact(contactProps, customId);

      expect(contact.id).toEqual(customId);
    });
  });

  describe("toObject", () => {
    it("should return the Contact properties as an object", () => {
      const contact = new Contact(contactProps);
      const contactObject = contact.toObject();

      expect(contactObject).toEqual({
        id: expect.any(String),
        ...contactProps,
      });
    });
  });

  describe("setters", () => {
    it("should set the clientId property", () => {
      const contact = new Contact(contactProps);
      const newClientId = "e8812821-cca9-42f4-ae8a-c99682623be2";
      contact.clientId = newClientId;

      expect(contact.clientId).toEqual(newClientId);
    });

    it("should set the fullName property", () => {
      const contact = new Contact(contactProps);
      const newFullName = "Jane Doe";
      contact.fullName = newFullName;

      expect(contact.fullName).toEqual(newFullName);
    });

    it("should set the email property", () => {
      const contact = new Contact(contactProps);
      const newEmail = "janedoe@example.com";
      contact.email = newEmail;

      expect(contact.email).toEqual(newEmail);
    });

    it("should set the phone property", () => {
      const contact = new Contact(contactProps);
      const newPhone = "9876543210";
      contact.phone = newPhone;

      expect(contact.phone).toEqual(newPhone);
    });

    it("should set the registrationDate property", () => {
      const contact = new Contact(contactProps);
      const newRegistrationDate = new Date();
      contact.registrationDate = newRegistrationDate;

      expect(contact.registrationDate).toEqual(newRegistrationDate);
    });
  });
});
