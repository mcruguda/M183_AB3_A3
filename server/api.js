const z = require("zod");
const { default: errorMap } = require("zod/locales/en.js");
const initializeAPI = async (app) => {
  app.post("/api/login", login);
};

const inputScheme = z
  .object({
    username: z
      .string()
      .min(1, { message: "Username cannot be empty." })
      .email({ message: "Username needs to be a Email address." }),
    password: z
      .string()
      .min(10, { message: "Password has to be at leas 10 characters." }),
  })
  .strip();

const login = async (req, res) => {
  const input = await inputScheme.safeParse(req.body);
  if ((input.success = false)) {
    return res.status(400).send(
      input.error.issues.map(({ message }) => {
        return { message };
      })
    );
  }
  // if ((input.success = false)) {
  //   return res.status(400).send(input);
  // }

  const { username, password } = req.body;

  const answer = `
    <h1>Answer</h1>
    <p>Username: ${username}</p>
    <p>Password: ${password}</p>
  `;

  res.send(answer);
};

module.exports = { initializeAPI };
