import { INestApplication } from "@nestjs/common";
import axios from "axios";

describe("ClientController", () => {
  const API_URL = "http://localhost:3333/clients/";
  let app: INestApplication;

  beforeAll(async () => {
    // app = await NestFactory.create(AppModule);
    // await app.listen(3333);
  });

  afterAll(async () => {
    // await app.close();
  });

  it("should be able authenticate a client", async () => {
    const clientData = {
      firstName: "John",
      lastName: "Doe",
      email: "jonhdoe@example.com",
      phone: "01234567891"
    };
    const response = await axios.post(API_URL, clientData);
    expect(response.status).toBe(201);
    expect(response.data).toBeDefined();
    expect(response.data).toBeInstanceOf(Object);
    expect(response.data.id).toBeDefined();
    expect(response.data.id).toEqual(expect.any(String));
    expect(response.data.firstName).toEqual(clientData.firstName);
    expect(response.data.lastName).toEqual(clientData.lastName);
    expect(response.data.email).toEqual(clientData.email);
    expect(response.data.phone).toEqual(clientData.phone);
    expect(response.data.createdAt).toBeDefined();
    expect(response.data.createdAt).toEqual(expect.any(String));
    expect(response.data.contacts).toBeDefined();
    expect(response.data.contacts).toBeInstanceOf(Array);
    expect(response.data.contacts).toHaveLength(0);
    const newResponse = await axios.post(API_URL + "auth", { email: clientData.email, phone: clientData.phone });
    expect(newResponse.status).toBe(200);
    expect(newResponse.data).toBeDefined();
    expect(newResponse.data).toBeInstanceOf(Object);
    expect(newResponse.data).toHaveProperty("access_token");
    expect(newResponse.data.access_token).toEqual(expect.any(String));
    await axios.delete(API_URL + response.data.id);
  });

  it("should be able create a new client", async () => {
    const clientData = {
      firstName: "John",
      lastName: "Doe",
      email: "jonhdoe@example.com",
      phone: "01234567891"
    };
    const response = await axios.post(API_URL, clientData);
    expect(response.status).toBe(201);
    expect(response.data).toBeDefined();
    expect(response.data).toBeInstanceOf(Object);
    expect(response.data.id).toBeDefined();
    expect(response.data.id).toEqual(expect.any(String));
    expect(response.data.firstName).toEqual(clientData.firstName);
    expect(response.data.lastName).toEqual(clientData.lastName);
    expect(response.data.email).toEqual(clientData.email);
    expect(response.data.phone).toEqual(clientData.phone);
    expect(response.data.createdAt).toBeDefined();
    expect(response.data.createdAt).toEqual(expect.any(String));
    expect(response.data.contacts).toBeDefined();
    expect(response.data.contacts).toBeInstanceOf(Array);
    expect(response.data.contacts).toHaveLength(0);
    await axios.delete(API_URL + response.data.id);
  });

  it("should be able update a client", async () => {
    const clientData = {
      firstName: "John",
      lastName: "Doe",
      email: "jonhdoe@example.com",
      phone: "01234567891"
    };
    const response = await axios.post(API_URL, clientData);
    expect(response.status).toBe(201);
    expect(response.data).toBeDefined();
    expect(response.data).toBeInstanceOf(Object);
    expect(response.data.id).toBeDefined();
    expect(response.data.id).toEqual(expect.any(String));
    expect(response.data.firstName).toEqual(clientData.firstName);
    expect(response.data.lastName).toEqual(clientData.lastName);
    expect(response.data.email).toEqual(clientData.email);
    expect(response.data.phone).toEqual(clientData.phone);
    expect(response.data.createdAt).toBeDefined();
    expect(response.data.createdAt).toEqual(expect.any(String));
    expect(response.data.contacts).toBeDefined();
    expect(response.data.contacts).toBeInstanceOf(Array);
    expect(response.data.contacts).toHaveLength(0);
    const newClientData = {
      firstName: "Jane",
      lastName: "Doe",
      email: "janedoe@example.com",
      phone: "98765432109"
    };
    const newResponse = await axios.patch(API_URL + response.data.id, newClientData);
    expect(newResponse.status).toBe(200);
    expect(newResponse.data).toBeDefined();
    expect(newResponse.data).toBeInstanceOf(Object);
    expect(newResponse.data.id).toBeDefined();
    expect(newResponse.data.id).toEqual(response.data.id);
    expect(newResponse.data.firstName).toEqual(newClientData.firstName);
    expect(newResponse.data.lastName).toEqual(newClientData.lastName);
    expect(newResponse.data.email).toEqual(newClientData.email);
    expect(newResponse.data.phone).toEqual(newClientData.phone);
    expect(newResponse.data.createdAt).toBeDefined();
    expect(newResponse.data.createdAt).toEqual(expect.any(String));
    expect(newResponse.data.contacts).toBeDefined();
    expect(newResponse.data.contacts).toBeInstanceOf(Array);
    expect(newResponse.data.contacts).toHaveLength(0);
    await axios.delete(API_URL + response.data.id);
  });

  it("should be able get a client", async () => {
    const clientData = {
      firstName: "John",
      lastName: "Doe",
      email: "jonhdoe@example.com",
      phone: "01234567891"
    };
    const response = await axios.post(API_URL, clientData);
    expect(response.status).toBe(201);
    expect(response.data).toBeDefined();
    expect(response.data).toBeInstanceOf(Object);
    expect(response.data.id).toBeDefined();
    expect(response.data.id).toEqual(expect.any(String));
    expect(response.data.firstName).toEqual(clientData.firstName);
    expect(response.data.lastName).toEqual(clientData.lastName);
    expect(response.data.email).toEqual(clientData.email);
    expect(response.data.phone).toEqual(clientData.phone);
    expect(response.data.createdAt).toBeDefined();
    expect(response.data.createdAt).toEqual(expect.any(String));
    expect(response.data.contacts).toBeDefined();
    expect(response.data.contacts).toBeInstanceOf(Array);
    expect(response.data.contacts).toHaveLength(0);
    const newResponse = await axios.get(API_URL + response.data.id);
    expect(newResponse.status).toBe(200);
    expect(newResponse.data).toBeDefined();
    expect(newResponse.data).toBeInstanceOf(Object);
    expect(newResponse.data.id).toBeDefined();
    expect(newResponse.data.id).toEqual(response.data.id);
    expect(newResponse.data.firstName).toEqual(clientData.firstName);
    expect(newResponse.data.lastName).toEqual(clientData.lastName);
    expect(newResponse.data.email).toEqual(clientData.email);
    expect(newResponse.data.phone).toEqual(clientData.phone);
    expect(newResponse.data.createdAt).toBeDefined();
    expect(newResponse.data.createdAt).toEqual(expect.any(String));
    expect(newResponse.data.contacts).toBeDefined();
    expect(newResponse.data.contacts).toBeInstanceOf(Array);
    expect(newResponse.data.contacts).toHaveLength(0);
    await axios.delete(API_URL + response.data.id);
  });

  it("should be able get all clients", async () => {
    const clientData = {
      firstName: "John",
      lastName: "Doe",
      email: "jonhdoe@example.com",
      phone: "01234567891"
    };
    await axios.post(API_URL, clientData);
    const response = await axios.get(API_URL);
    expect(response.status).toBe(200);
    expect(response.data).toBeDefined();
    expect(response.data).toBeInstanceOf(Array);
    expect(response.data).toHaveLength(1);
    expect(response.data[0]).toBeDefined();
    expect(response.data[0]).toBeInstanceOf(Object);
    expect(response.data[0].id).toBeDefined();
    expect(response.data[0].id).toEqual(expect.any(String));
    expect(response.data[0].firstName).toEqual(clientData.firstName);
    expect(response.data[0].lastName).toEqual(clientData.lastName);
    expect(response.data[0].email).toEqual(clientData.email);
    expect(response.data[0].phone).toEqual(clientData.phone);
    expect(response.data[0].createdAt).toBeDefined();
    expect(response.data[0].createdAt).toEqual(expect.any(String));
    expect(response.data[0].contacts).toBeDefined();
    expect(response.data[0].contacts).toBeInstanceOf(Array);
    expect(response.data[0].contacts).toHaveLength(0);
    await axios.delete(API_URL + response.data[0].id);
  });

  it("should be able delete a client", async () => {
    const clientData = {
      firstName: "John",
      lastName: "Doe",
      email: "jondoe@example.com",
      phone: "01234567891"
    };
    const response = await axios.post(API_URL, clientData);
    expect(response.status).toBe(201);
    expect(response.data).toBeDefined();
    expect(response.data).toBeInstanceOf(Object);
    expect(response.data.id).toBeDefined();
    expect(response.data.id).toEqual(expect.any(String));
    expect(response.data.firstName).toEqual(clientData.firstName);
    expect(response.data.lastName).toEqual(clientData.lastName);
    expect(response.data.email).toEqual(clientData.email);
    expect(response.data.phone).toEqual(clientData.phone);
    expect(response.data.createdAt).toBeDefined();
    expect(response.data.createdAt).toEqual(expect.any(String));
    expect(response.data.contacts).toBeDefined();
    expect(response.data.contacts).toBeInstanceOf(Array);
    expect(response.data.contacts).toHaveLength(0);
    await axios.delete(API_URL + response.data.id);
    const newResponse = await axios.get(API_URL);
    expect(newResponse.status).toBe(200);
    expect(newResponse.data).toBeDefined();
    expect(newResponse.data).toBeInstanceOf(Array);
    expect(newResponse.data).toHaveLength(0);
  });

  it("should be able add a contact", async () => {
    const clientData = {
      firstName: "John",
      lastName: "Doe",
      email: "jonhdoe@example.com",
      phone: "01234567891",
    };
    const contactData = {
      firstName: "Jane",
      lastName: "Doe",
      email: "janedoe@example.com",
      phone: "01234567891",
    };
    const response = await axios.post(API_URL, clientData);
    expect(response.status).toBe(201);
    expect(response.data).toBeDefined();
    expect(response.data).toBeInstanceOf(Object);
    expect(response.data.id).toBeDefined();
    expect(response.data.id).toEqual(expect.any(String));
    expect(response.data.firstName).toEqual(clientData.firstName);
    expect(response.data.lastName).toEqual(clientData.lastName);
    expect(response.data.email).toEqual(clientData.email);
    expect(response.data.phone).toEqual(clientData.phone);
    expect(response.data.createdAt).toBeDefined();
    expect(response.data.createdAt).toEqual(expect.any(String));
    expect(response.data.contacts).toBeDefined();
    expect(response.data.contacts).toBeInstanceOf(Array);
    expect(response.data.contacts).toHaveLength(0);
    const newResponse = await axios.post(API_URL + response.data.id + "/contacts", contactData);
    expect(newResponse.status).toBe(201);
    expect(newResponse.data).toBeDefined();
    expect(newResponse.data).toBeInstanceOf(Object);
    expect(newResponse.data.id).toBeDefined();
    expect(newResponse.data.id).toEqual(expect.any(String));
    expect(newResponse.data.firstName).toEqual(contactData.firstName);
    expect(newResponse.data.lastName).toEqual(contactData.lastName);
    expect(newResponse.data.email).toEqual(contactData.email);
    expect(newResponse.data.phone).toEqual(contactData.phone);
    expect(newResponse.data.registeredAt).toBeDefined();
    expect(newResponse.data.registeredAt).toEqual(expect.any(String));
    await axios.delete(API_URL + response.data.id);
  });

  it("should be able update contact", async () => {
    const clientData = {
      firstName: "John",
      lastName: "Doe",
      email: "jonhdoe@example.com",
      phone: "01234567891",
    };
    const contactData = {
      firstName: "Jane",
      lastName: "Doe",
      email: "janedoe@example.com",
      phone: "01234567891",
    };
    const response = await axios.post(API_URL, clientData);
    const newResponse = await axios.post(API_URL + response.data.id + "/contacts", contactData);
    expect(newResponse.status).toBe(201);
    expect(newResponse.data).toBeDefined();
    expect(newResponse.data).toBeInstanceOf(Object);
    expect(newResponse.data.id).toBeDefined();
    expect(newResponse.data.id).toEqual(expect.any(String));
    expect(newResponse.data.firstName).toEqual(contactData.firstName);
    expect(newResponse.data.lastName).toEqual(contactData.lastName);
    expect(newResponse.data.email).toEqual(contactData.email);
    expect(newResponse.data.phone).toEqual(contactData.phone);
    expect(newResponse.data.registeredAt).toBeDefined();
    expect(newResponse.data.registeredAt).toEqual(expect.any(String));
    const updatedContactData = {
      firstName: "Mary",
      lastName: "Doe",
      email: "marydoe@example.com",
      phone: "98765432101",
    };
    const updatedResponse = await axios.patch(API_URL + response.data.id + "/contacts/" + newResponse.data.id, updatedContactData);
    expect(updatedResponse.status).toBe(200);
    expect(updatedResponse.data).toBeDefined();
    expect(updatedResponse.data).toBeInstanceOf(Object);
    expect(updatedResponse.data.id).toBeDefined();
    expect(updatedResponse.data.id).toEqual(expect.any(String));
    expect(updatedResponse.data.firstName).toEqual(updatedContactData.firstName);
    expect(updatedResponse.data.lastName).toEqual(updatedContactData.lastName);
    expect(updatedResponse.data.email).toEqual(updatedContactData.email);
    expect(updatedResponse.data.phone).toEqual(updatedContactData.phone);
    expect(updatedResponse.data.registeredAt).toBeDefined();
    expect(updatedResponse.data.registeredAt).toEqual(expect.any(String));
    await axios.delete(API_URL + response.data.id);
  });

  it("should be able delete contact", async () => {
    const clientData = {
      firstName: "John",
      lastName: "Doe",
      email: "jonhdoe@example.com",
      phone: "01234567891",
    };
    const contactData = {
      firstName: "Jane",
      lastName: "Doe",
      email: "janedoe@example.com",
      phone: "01234567891",
    };
    const response = await axios.post(API_URL, clientData);
    const newResponse = await axios.post(API_URL + response.data.id + "/contacts", contactData);
    expect(newResponse.status).toBe(201);
    expect(newResponse.data).toBeDefined();
    expect(newResponse.data).toBeInstanceOf(Object);
    expect(newResponse.data.id).toBeDefined();
    expect(newResponse.data.id).toEqual(expect.any(String));
    expect(newResponse.data.firstName).toEqual(contactData.firstName);
    expect(newResponse.data.lastName).toEqual(contactData.lastName);
    expect(newResponse.data.email).toEqual(contactData.email);
    expect(newResponse.data.phone).toEqual(contactData.phone);
    expect(newResponse.data.registeredAt).toBeDefined();
    expect(newResponse.data.registeredAt).toEqual(expect.any(String));
    await axios.delete(API_URL + response.data.id + "/contacts/" + newResponse.data.id);
    const updatedResponse = await axios.get(API_URL + response.data.id);
    expect(updatedResponse.status).toBe(200);
    expect(updatedResponse.data).toBeDefined();
    expect(updatedResponse.data).toBeInstanceOf(Object);
    expect(updatedResponse.data.id).toBeDefined();
    expect(updatedResponse.data.id).toEqual(response.data.id);
    expect(updatedResponse.data.firstName).toEqual(response.data.firstName);
    expect(updatedResponse.data.lastName).toEqual(response.data.lastName);
    expect(updatedResponse.data.email).toEqual(response.data.email);
    expect(updatedResponse.data.phone).toEqual(response.data.phone);
    expect(updatedResponse.data.createdAt).toBeDefined();
    expect(updatedResponse.data.createdAt).toEqual(response.data.createdAt);
    expect(updatedResponse.data.contacts).toBeDefined();
    expect(updatedResponse.data.contacts).toBeInstanceOf(Array);
    expect(updatedResponse.data.contacts.length).toEqual(0);
    await axios.delete(API_URL + response.data.id);
  });
});