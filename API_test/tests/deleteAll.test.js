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
  


  const adminKey = "keyadmin123"; // The admin key for authorization
  beforeAll(async () => {

      
  });
  it("should delete All users details successfully", async () => {
    const response = await request(server)
      .delete('/api/v1/all-users') 
      .send({ key_admin: adminKey }) // Send the admin key in the request body

      expect(response.statusCode).toBe(200);
      expect(response.body).toHaveProperty("message", "Users deleted with success");
    });
  
   
    it("should not delete all users with invalid admin key", async () => {
      const response = await request(server)
        .delete('/api/v1/all-users')
        .send({ key_admin: "invalidKey" }) // Send an invalid admin key
  
      expect(response.statusCode).toBe(403); 
      expect(response.body).toHaveProperty("message","Unauthorized access");
    });
  });
