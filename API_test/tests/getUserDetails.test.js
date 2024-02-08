const request = require("supertest");
const server = "http://localhost:3000";

function generateRandomString() {
  return Math.random().toString(36).substring(2, 15);
}

describe("User Details Fetching", () => {
  let userData = {
    username: `testuser_${generateRandomString()}`,
    password: "password",
    email: `test_${generateRandomString()}@example.com`,
  };

  let token; // Variable to store the token

  beforeAll(async () => {
    // Create a user before running tests
    const createUserResponse = await request(server)
      .post("/api/v1/users")
      .send(userData);
    expect(createUserResponse.statusCode).toBe(200); 

    // Authenticate the user to get the token
    const authResponse = await request(server)
      .post("/api/v1/auth")
      .send({ email: userData.email, password: userData.password });
    expect(authResponse.statusCode).toBe(200);
    expect(authResponse.body).toHaveProperty("token");
    token = authResponse.body.token; // Capture the token
  });

  it("should fetch the user details successfully with valid token", async () => {
    const response = await request(server)
      .get("/api/v1/users")
      .set("Authorization", token); // Correctly set the Authorization header

    expect(response.statusCode).toBe(200);
    expect(response.body).toHaveProperty("id");
    expect(response.body).toHaveProperty("email", userData.email);
    expect(response.body).toHaveProperty("imageUrl");
  });

  it("should not allow getting user details without proper authorization", async () => {
    const response = await request(server)
      .get("/api/v1/users")
      .set("Authorization", " invalid-token"); // Sending an invalid token


    
    expect(response.statusCode).toBe(403);
    expect(response.body).toHaveProperty("message","Unauthorized");
  });


});
