import request from "supertest";
import { app } from "../../app";

it("should return a 201 on successful signup", () => {
  return request(app)
    .post("/api/users/signup")
    .send({
      email: "test@test.com",
      password: "password",
    })
    .expect(201);
});

it("should return a 400 with an invalid email", () => {
  return request(app)
    .post("/api/users/signup")
    .send({
      email: "test",
      password: "password",
    })
    .expect(400);
});

it("should return a 400 with an invalid password", () => {
  return request(app)
    .post("/api/users/signup")
    .send({
      email: "test",
      password: "1",
    })
    .expect(400);
});

it("should return a 400 with no email and password", () => {
  return request(app).post("/api/users/signup").send({}).expect(400);
});

it("should not allow duplicates email", async () => {
  await request(app)
    .post("/api/users/signup")
    .send({
      email: "test@test.com",
      password: "password",
    })
    .expect(201);

  await request(app)
    .post("/api/users/signup")
    .send({
      email: "test@test.com",
      password: "password",
    })
    .expect(400);
});

it("should set a cookie after signup", async () => {
  const response = await request(app)
    .post("/api/users/signup")
    .send({
      email: "test@test.com",
      password: "password",
    })
    .expect(201);

  expect(response.get("Set-Cookie")).toBeDefined();
});
