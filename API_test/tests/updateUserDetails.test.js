const request = require("supertest");
const server = "http://localhost:3000";

function generateRandomString() {
  return Math.random().toString(36).substring(2, 15);
}

describe("User Update", () => {
  let userData = {
    name: "initialName",
    email: `initial_${generateRandomString()}@example.com`,
    password: "initialPassword123"
  };
  
  let updatedUserData = {
    name: "newName123",
    email: "new_email123@gmail.com",
    password: "newpassword123"
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
  it("should update the user details successfully", async () => {
    const response = await request(server)
      .patch('/api/v1/users') 
      .set("Authorization", token)// Correctly set the Authorization header
      .send( updatedUserData ); 
  
    expect(response.statusCode).toBe(200);
    expect(response.body).toHaveProperty("message", "User updated with success");
  });
  
  it("should fail to update user details with an unauthorized call", async () => {
    const response = await request(server)
    .patch('/api/v1/users') 
    .set("Authorization", token+1)
    .send( updatedUserData ); 

  expect(response.statusCode).toBe(403);
  expect(response.body).toHaveProperty("message","invalid signature");
   
  });
});
