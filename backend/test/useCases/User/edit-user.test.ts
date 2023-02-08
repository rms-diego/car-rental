import {
  expect,
  describe,
  test,
  beforeAll,
  afterEach,
  beforeEach,
} from "vitest";

import agent from "supertest";

import { app } from "../../../src/app";

import { NEW_USER_PAYLOAD } from "../../mocks";

import { Jwt, TokenDecoded } from "../../../src/utils/jwt";

describe("Creating test for useCase of edit a user", () => {
  let token = "";

  beforeAll(async () => await app.ready());

  // cadastra um usuário e guarda o token na memoria
  beforeEach(async () => {
    await agent(app.server).post("/user/create").send(NEW_USER_PAYLOAD);

    const { body } = await agent(app.server)
      .post("/user/login")
      .send(NEW_USER_PAYLOAD);

    token = body.token;
  });

  // exclui o usuário cadastrado
  afterEach(async () => {
    const {
      body: { token },
    } = await agent(app.server).post("/user/login").send(NEW_USER_PAYLOAD);

    await agent(app.server).delete("/user/deleteUser").set({ token });
  });

  test("[POST]'/user/edit' - Should be error thrown if token is not sent on headers", async () => {
    const { body: error } = await agent(app.server).put("/user/edit");

    expect(error).toStrictEqual({ error: "token is required" });
  });

  test("[POST]'/user/edit' - Should be error thrown if user id does not exists on decoded token", async () => {
    const tokenDecoded = Jwt.compareToken(token) as TokenDecoded;

    const INVALID_USER_ID = {
      ...tokenDecoded,
      id: tokenDecoded.id + "a",
    };

    const TOKEN_INVALID_USER = Jwt.createToken(INVALID_USER_ID);

    const { body: error } = await agent(app.server)
      .put("/user/edit")
      .send(NEW_USER_PAYLOAD)
      .set({ token: TOKEN_INVALID_USER });

    expect(error).toStrictEqual({ error: "user does not exists" });
  });

  test("[POST]'/user/edit' - Should be able to edit a user ", async () => {
    const { body: userEdited } = await agent(app.server)
      .put("/user/edit")
      .send(NEW_USER_PAYLOAD)
      .set({ token });

    expect(userEdited.message).toStrictEqual("user edited");
    expect(userEdited.newToken).toBeTypeOf("string");
  });
});
