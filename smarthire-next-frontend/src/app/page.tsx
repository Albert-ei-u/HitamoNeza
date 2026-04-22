import Link from "next/link";

export default function Home() {
  return (
    <div className="flex min-h-screen items-center justify-center p-6">
      <main className="panel w-full max-w-4xl p-10">
        <p className="inline-flex rounded-full bg-accent-soft px-3 py-1 text-sm font-medium text-sky-800">
          SmartHire Platform
        </p>
        <h1 className="mt-5 text-4xl font-bold tracking-tight text-slate-900">
          Hire Smarter With AI-Powered Skill Matching
        </h1>
        <p className="mt-4 max-w-2xl text-slate-600">
          Sign in and test your protected backend endpoints directly from this
          dashboard. Register users, log in with JWT, fetch profile data, and
          score candidate-job fit.
        </p>

        <div className="mt-8 flex flex-wrap gap-3">
          <Link
            href="/register"
            className="rounded-xl bg-slate-900 px-5 py-3 font-semibold text-white transition hover:bg-slate-800"
          >
            Create Account
          </Link>
          <Link
            href="/login"
            className="rounded-xl border border-slate-300 bg-white px-5 py-3 font-semibold text-slate-700 transition hover:bg-slate-100"
          >
            Login
          </Link>
          <Link
            href="/dashboard"
            className="rounded-xl border border-sky-200 bg-sky-50 px-5 py-3 font-semibold text-sky-700 transition hover:bg-sky-100"
          >
            Open Dashboard
          </Link>
        </div>
      </main>
    </div>
  );
}
