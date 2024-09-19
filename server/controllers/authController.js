// controllers/authController.js
import userModel from "../models/users.js";
import Joi from "joi";

const registerSchema = Joi.object({
  first_name: Joi.string().min(3).required(),
  last_name: Joi.string().min(3).required(),
  mob: Joi.string()
    .pattern(/^[0-9]{10}$/)
    .required(),
  password: Joi.string()
    .min(6)
    .pattern(new RegExp("^[a-zA-Z0-9]{6,30}$")) // Ensures letters and numbers
    .required(),
});

export const register = async (req, res) => {
  const { first_name, last_name, mob, password } = req.body;

  // Validate the input using Joi
  const { error } = registerSchema.validate(req.body);
  if (error) {
    return res.status(400).send(error.details[0].message);
  }

  try {
    const existingUser = await userModel.findUserByMob(mob);

    if (existingUser) {
      return res.status(400).send("User already exists.");
    }

    const newUser = await userModel.createUser({
      first_name,
      last_name,
      mob,
      password,
      role: "Participant", // Default role
    });

    res
      .status(201)
      .send(`User registered: ${newUser.first_name} ${newUser.last_name}`);
  } catch (error) {
    console.error("Error during registration:", error);
    res.status(500).send("Internal Server Error");
  }
};

export const login = async (req, res) => {
  const { mob, password } = req.body;

  // Validate input
  if (!mob || !password) {
    return res.status(400).send("Mobile number and password are required.");
  }

  try {
    // Find the user
    const user = await userModel.findUserByMob(mob);
    if (!user) {
      return res.status(401).send("Invalid credentials.");
    }

    // Validate password
    const isPasswordValid = await userModel.validatePassword(password, user.password);
    if (!isPasswordValid) {
      return res.status(401).send("Invalid credentials.");
    }

    // Generate a token
    const token = userModel.generateToken(user);

    res.status(200).json({ token });
  } catch (error) {
    console.error("Error during login:", error);
    res.status(500).send("Internal Server Error");
  }
};

export const assignRole = async (req, res) => {
  const { id, role } = req.body; // Ensure role is provided in the request
  const userRole = req.user?.role; // Assuming `req.user` is set by an authentication middleware

  // Check if the user is an admin
  if (userRole !== "Admin") {
    return res.status(403).send("Forbidden");
  }

  try {
    // Assign role
    const updatedUser = await userModel.assignRole(id, role);
    res
      .status(200)
      .send(
        `Role assigned: ${updatedUser.first_name} ${updatedUser.last_name} is now ${role}`
      );
  } catch (error) {
    console.error("Error during role assignment:", error);
    res.status(500).send("Internal Server Error");
  }
};
