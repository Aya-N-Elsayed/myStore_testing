const request = require("supertest");
const server = "http://localhost:3000";

function generateRandomString() {
  return Math.random().toString(36).substring(2, 15);
}

describe("User Update", () => {
  let userData = {
    name: "initialName",
    email: `initial_${generateRandomString()}@example.com`,
    password: "initialPassword123",
  };

  let token; // Variable to store the token

  beforeAll(async () => {
    // Create a user before running tests
    const createUserResponse = await request(server)
      .post("/api/v1/users")
      .send(userData);
    expect(createUserResponse.statusCode).toBe(200);

    // Authenticate to get a token
    const authResponse = await request(server)
      .post("/api/v1/auth")
      .send({ email: userData.email, password: userData.password });
    expect(authResponse.statusCode).toBe(200);
    token = authResponse.body.token; // Capture the token
  });
  it("should delete the user details successfully", async () => {
    const response = await request(server)
      .delete("/api/v1/users")
      .set("Authorization", token); // Correctly set the Authorization header

    expect(response.statusCode).toBe(200);
    expect(response.body).toHaveProperty(
      "message",
      "User deleted with success"
    );
  });

  it("should not allow user deletion without proper authorization", async () => {
    const response = await request(server)
      .delete("/api/v1/users")
      .set("Authorization", " invalid-token"); // Sending an invalid token

    expect(response.statusCode).toBe(403);
    expect(response.body).toHaveProperty("message","Unauthorized to delete");
  });
});
