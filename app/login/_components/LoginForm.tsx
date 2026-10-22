"use client";

/**
 * LoginForm — handles both the credential sign-in flow and displays
 * server-returned error messages from NextAuth.
 */

import { useState, type FormEvent } from "react";
import { signIn }                   from "next-auth/react";
import { useRouter, useSearchParams } from "next/navigation";

// Map NextAuth error codes to user-friendly messages
const ERROR_MESSAGES: Record<string, string> = {
  CredentialsSignin:  "Invalid email or password.",
  OAuthSignin:        "Could not connect to the sign-in service.",
  OAuthCallback:      "Authentication callback failed.",
  OAuthCreateAccount: "Could not create account via OAuth.",
  default:            "Something went wrong. Please try again.",
};

export default function LoginForm() {
  const router       = useRouter();
  const searchParams = useSearchParams();

  // NextAuth redirects back with ?error=<code> on failure
  const urlError = searchParams.get("error");

  const [email,    setEmail]    = useState("");
  const [password, setPassword] = useState("");
  const [error,    setError]    = useState<string | null>(
    urlError ? (ERROR_MESSAGES[urlError] ?? ERROR_MESSAGES.default) : null
  );
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setError(null);

    if (!email.trim() || !password) {
      setError("Please enter your email and password.");
      return;
    }

    setLoading(true);
    try {
      const result = await signIn("credentials", {
        email:    email.trim().toLowerCase(),
        password,
        redirect: false, // handle redirect ourselves for better UX
      });

      if (result?.error) {
        setError(ERROR_MESSAGES[result.error] ?? ERROR_MESSAGES.default);
      } else {
        // Redirect to the originally requested page or dashboard root
        const callbackUrl = searchParams.get("callbackUrl") ?? "/";
        router.push(callbackUrl);
        router.refresh(); // flush server component cache so session is visible
      }
    } catch {
      setError(ERROR_MESSAGES.default);
    } finally {
      setLoading(false);
    }
  }

  return (
    <form onSubmit={handleSubmit} className="w-full flex flex-col gap-0">
      {/* Error banner */}
      {error && (
        <div
          role="alert"
          className="w-full mb-4 px-4 py-2.5 rounded-xl bg-red-50 border border-red-200 text-red-700 text-xs text-center"
        >
          {error}
        </div>
      )}

      {/* Email */}
      <div className="w-full mb-3">
        <label htmlFor="email" className="sr-only">
          Email
        </label>
        <input
          id="email"
          type="email"
          name="email"
          autoComplete="email"
          required
          placeholder="Enter your club GSuite email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          disabled={loading}
          className="w-full px-4 py-3 rounded-xl border border-[#e2e8f0] text-sm text-[#1e293b] placeholder-[#94a3b8] outline-none focus:border-[#1a3353] focus:ring-2 focus:ring-[#1a3353]/10 transition-all bg-white disabled:opacity-60"
        />
      </div>

      {/* Password */}
      <div className="w-full mb-4">
        <label htmlFor="password" className="sr-only">
          Password
        </label>
        <input
          id="password"
          type="password"
          name="password"
          autoComplete="current-password"
          required
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          disabled={loading}
          className="w-full px-4 py-3 rounded-xl border border-[#e2e8f0] text-sm text-[#1e293b] placeholder-[#94a3b8] outline-none focus:border-[#1a3353] focus:ring-2 focus:ring-[#1a3353]/10 transition-all bg-white disabled:opacity-60"
        />
      </div>

      {/* Submit */}
      <button
        type="submit"
        disabled={loading}
        className="w-full py-3 rounded-xl bg-[#1a3353] text-white text-sm font-semibold hover:bg-[#142843] transition-colors shadow-sm mb-4 disabled:opacity-60 disabled:cursor-not-allowed flex items-center justify-center gap-2"
      >
        {loading ? (
          <>
            <svg
              className="animate-spin h-4 w-4 text-white"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              aria-hidden="true"
            >
              <circle
                className="opacity-25"
                cx="12"
                cy="12"
                r="10"
                stroke="currentColor"
                strokeWidth="4"
              />
              <path
                className="opacity-75"
                fill="currentColor"
                d="M4 12a8 8 0 018-8v8z"
              />
            </svg>
            Signing in…
          </>
        ) : (
          "Sign In"
        )}
      </button>

      {/* Divider */}
      <div className="flex items-center gap-3 w-full mb-4">
        <div className="flex-1 h-px bg-[#e2e8f0]" />
        <span className="text-xs text-[#94a3b8]">or</span>
        <div className="flex-1 h-px bg-[#e2e8f0]" />
      </div>

      {/* Google — disabled until OAuth app credentials are configured */}
      <button
        type="button"
        disabled
        title="Google sign-in coming soon"
        className="w-full flex items-center justify-center gap-3 py-3 rounded-xl border border-[#e2e8f0] text-sm font-medium text-[#94a3b8] cursor-not-allowed opacity-50"
      >
        {/* Google "G" SVG */}
        <svg width="18" height="18" viewBox="0 0 48 48" aria-hidden="true">
          <path
            fill="#EA4335"
            d="M24 9.5c3.54 0 6.71 1.22 9.21 3.6l6.85-6.85C35.9 2.38 30.47 0 24 0 14.62 0 6.51 5.38 2.56 13.22l7.98 6.19C12.43 13.72 17.74 9.5 24 9.5z"
          />
          <path
            fill="#4285F4"
            d="M46.98 24.55c0-1.57-.15-3.09-.38-4.55H24v9.02h12.94c-.58 2.96-2.26 5.48-4.78 7.18l7.73 6c4.51-4.18 7.09-10.36 7.09-17.65z"
          />
          <path
            fill="#FBBC05"
            d="M10.53 28.59c-.48-1.45-.76-2.99-.76-4.59s.27-3.14.76-4.59l-7.98-6.19C.92 16.46 0 20.12 0 24c0 3.88.92 7.54 2.56 10.78l7.97-6.19z"
          />
          <path
            fill="#34A853"
            d="M24 48c6.48 0 11.93-2.13 15.89-5.81l-7.73-6c-2.15 1.45-4.92 2.3-8.16 2.3-6.26 0-11.57-4.22-13.47-9.91l-7.98 6.19C6.51 42.62 14.62 48 24 48z"
          />
          <path fill="none" d="M0 0h48v48H0z" />
        </svg>
        Sign in with Google
      </button>
    </form>
  );
}
