import { expect, describe, beforeAll, afterEach, test } from "vitest";

import agent from "supertest";

import { app } from "../../../src/app";

import { NEW_USER_PAYLOAD } from "../../mocks";

describe("Creating test for useCase of creating a new user", () => {
  beforeAll(async () => {
    await app.ready();
  });

  // exclui o usuário cadastrado
  afterEach(async () => {
    const {
      body: { token },
    } = await agent(app.server).post("/user/login").send(NEW_USER_PAYLOAD);

    await agent(app.server).delete("/user/deleteUser").set({ token });
  });

  test("[Post] '/user/create' - Should be able create a new User", async () => {
    const { body: userCreated } = await agent(app.server)
      .post("/user/create")
      .send(NEW_USER_PAYLOAD)
      .expect(201);

    expect(userCreated).toStrictEqual({ message: "user created" });
  });

  test("[POST]'/user/create' - Should be error thrown if trying to create a user that already exists", async () => {
    const { body: userCreated } = await agent(app.server)
      .post("/user/create")
      .send(NEW_USER_PAYLOAD)
      .expect(201);

    expect(userCreated).toStrictEqual({ message: "user created" });

    const { body: error } = await agent(app.server)
      .post("/user/create")
      .send(NEW_USER_PAYLOAD)
      .expect(400);

    expect(error).toStrictEqual({ error: "User already exists" });
  });
});
