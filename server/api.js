const { z } = require("zod");
const initializeAPI = async (app) => {
  app.post("/api/login", login);
};

const inputScheme = z.object({
  username: z.string().email().min(1),
  password: z.string().min(10),
});

const login = async (req, res) => {
  const input = inputScheme.safeParse(req.body);
  if (input) {
    return res.status(400).send(input);
  }

  const { username, password } = req.body;

  const answer = `
    <h1>Answer</h1>
    <p>Username: ${username}</p>
    <p>Password: ${password}</p>
  `;

  res.send(answer);
};

module.exports = { initializeAPI };
