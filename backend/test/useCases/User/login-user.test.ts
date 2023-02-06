import {
  afterEach,
  beforeAll,
  beforeEach,
  describe,
  expect,
  test,
} from "vitest";

import agent from "supertest";

import { app } from "../../../src/app";

import {
  INVALID_EMAIL_LOGIN_USER_PAYLOAD,
  INVALID_PASSWORD_LOGIN_USER_PAYLOAD,
  NEW_USER_PAYLOAD,
  VALID_LOGIN_USER_PAYLOAD,
} from "../mocks";

describe("Creating test for useCase of creating a new user", () => {
  beforeAll(async () => {
    await app.ready();
  });

  // cria o usuário antes de cada teste
  beforeEach(async () => {
    await agent(app.server)
      .post("/user/create")
      .send(NEW_USER_PAYLOAD)
      .expect(201);
  });

  // exclui usuário criado após o termino de cada teste
  afterEach(async () => {
    const {
      body: { token },
    } = await agent(app.server).post("/user/login").send(NEW_USER_PAYLOAD);

    await agent(app.server).delete("/user/deleteUser").set({ token });
  });

  test("[Post] '/user/login' - Should be able to make login", async () => {
    const {
      body: { token },
    } = await agent(app.server)
      .post("/user/login")
      .send(VALID_LOGIN_USER_PAYLOAD)
      .expect(200);

    expect(token).toBeDefined();
    expect(token).toBeTypeOf("string");
  });

  test("[Post] '/user/login' - Should be thrown a new error if user digit wrong email or user does not exists", async () => {
    const { body: error } = await agent(app.server)
      .post("/user/login")
      .send(INVALID_EMAIL_LOGIN_USER_PAYLOAD)
      .expect(404);

    expect(error).toStrictEqual({
      error: "wrong email or user does not exists",
    });
  });

  test("[Post] '/user/login' - Should be thrown a new error if user digit wrong password", async () => {
    const { body: error } = await agent(app.server)
      .post("/user/login")
      .send(INVALID_PASSWORD_LOGIN_USER_PAYLOAD)
      .expect(400);

    expect(error).toStrictEqual({ error: "wrong password" });
  });
});
