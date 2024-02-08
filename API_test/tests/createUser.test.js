const request = require("supertest");
const server = "http://localhost:3000"; // Adjust as necessary

function generateRandomString() {
    return Math.random().toString(36).substring(2, 15); // Generates a random string
  }


describe("User Management - Field Validation", () => {
    let userData={
    username: `testuser_${generateRandomString()}`,
    password: "password", // Keep the password constant for simplicity
    email: `test_${generateRandomString()}@example.com`
  };
    
  it("should create a new user successfully with all fields provided", async () => {
    

    const response = await request(server)
      .post("/api/v1/users")
      .send(userData);

    expect(response.statusCode).toBe(200);
    expect(response.body).toHaveProperty("message", "User registered with success");
    expect(response.body).toHaveProperty("token");
  });

  it("should fail to create a user without an email", async () => {
    const { email, ...userWithoutEmail } =  userData; // Destructure to remove email

    const response = await request(server)
      .post("/api/v1/users")
      .send(userWithoutEmail);

    expect(response.statusCode).toBe(401); // Assuming 400 Bad Request for missing required fields
    expect(response.body).toHaveProperty("message"); // Check for error message
  });

  it("should fail to create a user without a password", async () => {
    const { password, ...userWithoutPassword } =  userData; // Destructure to remove password

    const response = await request(server)
      .post("/api/v1/users")
      .send(userWithoutPassword);

    expect(response.statusCode).toBe(401);  
    expect(response.body).toHaveProperty("message"); // Check for error message
  });

  it("should fail to create a user without a name", async () => {
    const { name, ...userWithoutName } =  userData; // Destructure to remove name
    userWithoutName.email = `invalidtest_${generateRandomString()}@example.com` // Ensure email is unique for this test

    const response = await request(server)
      .post("/api/v1/users")
      .send(userWithoutName);

    expect(response.statusCode).toBe(401);  
    expect(response.body).toHaveProperty("message"); // Check for error message
  });

  it("should fail to create a user with an empty body", async () => {
    const response = await request(server)
      .post("/api/v1/users")
      .send({});

    expect(response.statusCode).toBe(401);
    expect(response.body).toHaveProperty("message"); // Check for error message
  });
});
