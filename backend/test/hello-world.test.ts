import { describe, expect, test } from "vitest";

import agent from "supertest";

import { app } from "../src/app";

describe("Hello world", () => {
  test("Should return a hello world message", async () => {
    const expectBodyResponse = { message: "Hello world !" };

    await app.ready();
    const { body } = await agent(app.server).get("/").expect(200);

    expect(body).toEqual(expectBodyResponse);
  });
});
