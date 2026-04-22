"use client";

import Link from "next/link";
import { FormEvent, useState } from "react";
import { apiFetch } from "@/lib/api";

type RegisterResponse = {
  id: number;
  name: string;
  email: string;
  createdAt: string;
};

export default function RegisterPage() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  async function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setLoading(true);
    setError("");
    setMessage("");

    try {
      const response = await apiFetch<RegisterResponse>("/users", {
        method: "POST",
        body: { name, email, password },
      });
      setMessage(`Account created for ${response.email}. You can now login.`);
      setName("");
      setEmail("");
      setPassword("");
    } catch (err) {
      setError(err instanceof Error ? err.message : "Registration failed");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="flex min-h-screen items-center justify-center p-6">
      <main className="panel w-full max-w-lg p-8">
        <h1 className="text-3xl font-bold text-slate-900">Create Account</h1>
        <p className="mt-2 text-sm text-slate-600">
          This calls `POST /api/v1/users` on your Nest backend.
        </p>

        <form onSubmit={onSubmit} className="mt-6 space-y-4">
          <input
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Full name"
            className="w-full rounded-lg border border-slate-300 p-3"
            required
          />
          <input
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Email"
            type="email"
            className="w-full rounded-lg border border-slate-300 p-3"
            required
          />
          <input
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Password (min 6 chars)"
            type="password"
            minLength={6}
            className="w-full rounded-lg border border-slate-300 p-3"
            required
          />

          <button
            type="submit"
            disabled={loading}
            className="w-full rounded-lg bg-slate-900 p-3 font-semibold text-white disabled:opacity-60"
          >
            {loading ? "Creating..." : "Register"}
          </button>
        </form>

        {message ? (
          <p className="mt-4 rounded-lg bg-emerald-50 p-3 text-sm text-emerald-700">
            {message}
          </p>
        ) : null}
        {error ? (
          <p className="mt-4 rounded-lg bg-rose-50 p-3 text-sm text-rose-700">
            {error}
          </p>
        ) : null}

        <p className="mt-6 text-sm text-slate-600">
          Already registered?{" "}
          <Link href="/login" className="font-semibold text-sky-700 underline">
            Go to login
          </Link>
        </p>
      </main>
    </div>
  );
}
