import type { Request, Response } from "express";
import bcrypt from "bcrypt";
import { z } from "zod";
import { signToken } from "../utils/jwt";

// Stockage en mémoire (MVP)
type User = { id: string; email: string; passwordHash: string };
const users: User[] = [];

const registerSchema = z.object({
  email: z.string().email(),
  password: z.string().min(6),
});

const loginSchema = z.object({
  email: z.string().email(),
  password: z.string().min(1),
});

export async function register(req: Request, res: Response) {
  const parsed = registerSchema.safeParse(req.body);
  if (!parsed.success) return res.status(400).json(parsed.error);

  const { email, password } = parsed.data;

  const exists = users.find((u) => u.email === email);
  if (exists) return res.status(409).json({ message: "Email already used" });

  const passwordHash = await bcrypt.hash(password, 10);

  const user: User = {
    id: crypto.randomUUID(),
    email,
    passwordHash,
  };

  users.push(user);

  const token = signToken({ id: user.id, email: user.email });

  return res.json({
    token,
    user: { id: user.id, email: user.email },
  });
}

export async function login(req: Request, res: Response) {
  const parsed = loginSchema.safeParse(req.body);
  if (!parsed.success) return res.status(400).json(parsed.error);

  const { email, password } = parsed.data;

  const user = users.find((u) => u.email === email);
  if (!user) return res.status(401).json({ message: "Invalid credentials" });

  const ok = await bcrypt.compare(password, user.passwordHash);
  if (!ok) return res.status(401).json({ message: "Invalid credentials" });

  const token = signToken({ id: user.id, email: user.email });

  return res.json({
    token,
    user: { id: user.id, email: user.email },
  });
}

export function me(req: any, res: Response) {
  return res.json({ user: req.user });
}
