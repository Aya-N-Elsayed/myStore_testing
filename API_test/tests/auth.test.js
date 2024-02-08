const request = require("supertest");
const server = "http://localhost:3000"; // Adjust as necessary
function generateRandomString() {
    return Math.random().toString(36).substring(2, 15); // Generates a random string
  }

  describe("User Authentication Flow", () => {
    // Randomize userData for each test run
    let userData = {
      username: `testuser_${generateRandomString()}`,
      password: "password", // Keep the password constant for simplicity
      email: `test_${generateRandomString()}@example.com`
    };
  

  beforeAll(async () => {
    // Attempt to create a user before running tests
    const response = await request(server)
      .post("/api/v1/users")
        .send(userData);
        expect(response.statusCode).toBe(200);

   
  });

  it("Login with valid credentials should succeed", async () => {
    const response = await request(server)
      .post("/api/v1/auth")
      .send({ email: userData.email, password: userData.password });
    expect(response.statusCode).toBe(200);
    expect(response.body).toHaveProperty("token");
  });

  it("Login with invalid credentials should fail", async () => {
    const response = await request(server)
      .post("/api/v1/auth")
      .send({ email: "wronguser", password: "wrongpass" });
    expect(response.statusCode).toBe(401);
    expect(response.body).toHaveProperty("message","Incorrect email or password");

  });

  // Additional tests...
});
