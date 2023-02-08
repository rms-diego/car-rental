import {
  describe,
  expect,
  test,
  beforeAll,
  beforeEach,
  afterEach,
} from "vitest";

import agent from "supertest";

import { app } from "../../../src/app";

import { NEW_USER_PAYLOAD } from "../../mocks";
import { Jwt, TokenDecoded } from "../../../src/utils/jwt";

describe("Creating test for useCase of delete a user", () => {
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

  // exclui o usuário cadastrado pelo 'beforeEach'
  afterEach(async () => {
    if (token) {
      await agent(app.server).delete("/user/deleteUser").set({ token });
    }
  });

  test("[DELETE]'/user/deleteUSer' - Should be error thrown if user id does not exists on decoded token", async () => {
    const tokenDecoded = Jwt.compareToken(token) as TokenDecoded;

    const INVALID_USER_ID = {
      ...tokenDecoded,
      id: tokenDecoded.id + "a",
    };

    const TOKEN_INVALID_USER = Jwt.createToken(INVALID_USER_ID);

    const { body: error } = await agent(app.server)
      .delete("/user/deleteUser")
      .send(NEW_USER_PAYLOAD)
      .set({ token: TOKEN_INVALID_USER });

    console.log(error);

    expect(error).toStrictEqual({ error: "user does not exists" });
  });

  test("[DELETE]'/user/deleteUSer' - ", async () => {
    const { body: userDeleted } = await agent(app.server)
      .delete("/user/deleteUser")
      .send(NEW_USER_PAYLOAD)
      .set({ token });

    expect(userDeleted).toStrictEqual({ message: "user deleted" });
    token = "";
  });
});
