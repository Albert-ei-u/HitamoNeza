"use client";

import { useRouter } from "next/navigation";
import { FormEvent, useEffect, useState } from "react";
import { apiFetch } from "@/lib/api";
import { clearToken, getToken } from "@/lib/auth";

type ProfileResponse = {
  userId: number;
  email: string;
};

type MatchResponse = {
  user: ProfileResponse;
  result: {
    score: number;
    matchedSkills: string[];
    missingSkills: string[];
    recommendation: string;
    generatedAt: string;
  };
};

export default function DashboardPage() {
  const router = useRouter();
  const [profile, setProfile] = useState<ProfileResponse | null>(null);
  const [jobSkills, setJobSkills] = useState("nestjs, postgres, jwt");
  const [candidateSkills, setCandidateSkills] = useState("nestjs, jwt");
  const [result, setResult] = useState<MatchResponse["result"] | null>(null);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const token = getToken();
    if (!token) {
      router.replace("/login");
      return;
    }

    apiFetch<ProfileResponse>("/users/me", { token })
      .then((data) => setProfile(data))
      .catch((err) => {
        setError(err instanceof Error ? err.message : "Failed to load profile");
        clearToken();
        router.replace("/login");
      })
      .finally(() => setLoading(false));
  }, [router]);

  async function onScoreMatch(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const token = getToken();
    if (!token) {
      router.replace("/login");
      return;
    }

    setError("");
    try {
      const response = await apiFetch<MatchResponse>("/ai/match", {
        method: "POST",
        token,
        body: {
          jobSkills: jobSkills.split(",").map((s) => s.trim()).filter(Boolean),
          candidateSkills: candidateSkills
            .split(",")
            .map((s) => s.trim())
            .filter(Boolean),
        },
      });
      setResult(response.result);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Match request failed");
    }
  }

  function logout() {
    clearToken();
    router.push("/login");
  }

  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <p className="text-slate-600">Loading dashboard...</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen p-6">
      <div className="mx-auto flex w-full max-w-4xl flex-col gap-6">
        <section className="panel p-6">
          <div className="flex flex-wrap items-center justify-between gap-4">
            <div>
              <h1 className="text-3xl font-bold text-slate-900">Dashboard</h1>
              <p className="mt-2 text-sm text-slate-600">
                Authenticated as {profile?.email}
              </p>
            </div>
            <button
              onClick={logout}
              className="rounded-lg border border-slate-300 bg-white px-4 py-2 text-sm font-semibold text-slate-700 hover:bg-slate-100"
            >
              Logout
            </button>
          </div>
        </section>

        <section className="panel p-6">
          <h2 className="text-xl font-semibold text-slate-900">AI Match Score</h2>
          <p className="mt-2 text-sm text-slate-600">
            This calls protected `POST /api/v1/ai/match`.
          </p>

          <form onSubmit={onScoreMatch} className="mt-4 space-y-4">
            <div>
              <label className="mb-1 block text-sm font-medium text-slate-700">
                Job Skills (comma-separated)
              </label>
              <input
                value={jobSkills}
                onChange={(e) => setJobSkills(e.target.value)}
                className="w-full rounded-lg border border-slate-300 p-3"
                required
              />
            </div>
            <div>
              <label className="mb-1 block text-sm font-medium text-slate-700">
                Candidate Skills (comma-separated)
              </label>
              <input
                value={candidateSkills}
                onChange={(e) => setCandidateSkills(e.target.value)}
                className="w-full rounded-lg border border-slate-300 p-3"
                required
              />
            </div>
            <button
              type="submit"
              className="rounded-lg bg-sky-600 px-5 py-3 font-semibold text-white hover:bg-sky-700"
            >
              Score Match
            </button>
          </form>
        </section>

        {result ? (
          <section className="panel p-6">
            <h3 className="text-lg font-semibold text-slate-900">
              Match Result: {result.score}%
            </h3>
            <p className="mt-2 text-sm text-slate-700">
              Recommendation: {result.recommendation}
            </p>
            <p className="mt-2 text-sm text-slate-700">
              Matched skills: {result.matchedSkills.join(", ") || "None"}
            </p>
            <p className="mt-2 text-sm text-slate-700">
              Missing skills: {result.missingSkills.join(", ") || "None"}
            </p>
          </section>
        ) : null}

        {error ? (
          <section className="panel border-rose-200 bg-rose-50 p-4">
            <p className="text-sm text-rose-700">{error}</p>
          </section>
        ) : null}
      </div>
    </div>
  );
}
