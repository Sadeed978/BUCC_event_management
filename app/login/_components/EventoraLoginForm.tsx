"use client";

import { useState, useId, type FormEvent } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { Mail, Lock, Eye, EyeOff, AlertCircle, Loader2 } from "lucide-react";
import { useAuth } from "@/components/auth/AuthProvider";
import { toast } from "sonner";

/* ── helpers ──────────────────────────────────────────────────────────── */

function mapFirebaseError(msg: string): string {
  if (msg.includes("user-not-found") || msg.includes("wrong-password") || msg.includes("invalid-credential"))
    return "Incorrect email or password. Please try again.";
  if (msg.includes("too-many-requests"))
    return "Too many failed attempts. Please wait a moment and try again.";
  if (msg.includes("invalid-email"))
    return "Please enter a valid email address.";
  if (msg.includes("network-request-failed"))
    return "Network error. Check your connection and try again.";
  return "Sign-in failed. Please try again.";
}

function validateEmail(v: string) {
  if (!v.trim()) return "Email is required.";
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v)) return "Enter a valid email address.";
  return "";
}

function validatePassword(v: string) {
  if (!v) return "Password is required.";
  return "";
}

/* ── Google SVG ───────────────────────────────────────────────────────── */
function GoogleIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 48 48" aria-hidden="true" focusable="false">
      <path fill="#EA4335" d="M24 9.5c3.54 0 6.71 1.22 9.21 3.6l6.85-6.85C35.9 2.38 30.47 0 24 0 14.62 0 6.51 5.38 2.56 13.22l7.98 6.19C12.43 13.72 17.74 9.5 24 9.5z" />
      <path fill="#4285F4" d="M46.98 24.55c0-1.57-.15-3.09-.38-4.55H24v9.02h12.94c-.58 2.96-2.26 5.48-4.78 7.18l7.73 6c4.51-4.18 7.09-10.36 7.09-17.65z" />
      <path fill="#FBBC05" d="M10.53 28.59c-.48-1.45-.76-2.99-.76-4.59s.27-3.14.76-4.59l-7.98-6.19C.92 16.46 0 20.12 0 24c0 3.88.92 7.54 2.56 10.78l7.97-6.19z" />
      <path fill="#34A853" d="M24 48c6.48 0 11.93-2.13 15.89-5.81l-7.73-6c-2.15 1.45-4.92 2.3-8.16 2.3-6.26 0-11.57-4.22-13.47-9.91l-7.98 6.19C6.51 42.62 14.62 48 24 48z" />
    </svg>
  );
}

/* ── Component ────────────────────────────────────────────────────────── */
export default function EventoraLoginForm() {
  const uid          = useId();
  const router       = useRouter();
  const searchParams = useSearchParams();
  const { signIn, signInWithGoogle } = useAuth();

  const callbackUrl = searchParams.get("callbackUrl") ?? "/";

  const [email,       setEmail]       = useState("");
  const [password,    setPassword]    = useState("");
  const [showPw,      setShowPw]      = useState(false);
  const [touched,     setTouched]     = useState({ email: false, password: false });
  const [globalError, setGlobalError] = useState<string | null>(null);
  const [loading,     setLoading]     = useState(false);
  const [googleLoad,  setGoogleLoad]  = useState(false);

  // Inline field errors (only show after field is touched)
  const emailErr    = touched.email    ? validateEmail(email)       : "";
  const passwordErr = touched.password ? validatePassword(password) : "";
  const anyLoading  = loading || googleLoad;

  /* Submit */
  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    setTouched({ email: true, password: true });
    setGlobalError(null);

    if (validateEmail(email) || validatePassword(password)) return;

    setLoading(true);
    try {
      await signIn(email.trim(), password);
      toast.success("Signed in — welcome back!");
      router.push(callbackUrl);
      router.refresh();
    } catch (err: unknown) {
      setGlobalError(mapFirebaseError(err instanceof Error ? err.message : ""));
    } finally {
      setLoading(false);
    }
  }

  /* Google */
  async function handleGoogle() {
    setGlobalError(null);
    setGoogleLoad(true);
    try {
      await signInWithGoogle();
      toast.success("Signed in with Google!");
      router.push(callbackUrl);
      router.refresh();
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : "";
      if (!msg.includes("popup-closed-by-user") && !msg.includes("cancelled-popup-request")) {
        setGlobalError("Google sign-in failed. Please try again.");
      }
    } finally {
      setGoogleLoad(false);
    }
  }

  /* Reusable input class builder */
  const inputCls = (hasErr: boolean) =>
    [
      "w-full rounded-xl border bg-slate-50 py-3 pl-10 pr-4 text-sm text-slate-900",
      "placeholder:text-slate-400 transition-all duration-150 outline-none",
      "focus:bg-white focus:ring-2 focus:ring-offset-0",
      hasErr
        ? "border-red-400 focus:border-red-400 focus:ring-red-200"
        : "border-slate-200 focus:border-violet-500 focus:ring-violet-100",
      anyLoading ? "opacity-60 cursor-not-allowed" : "",
    ].join(" ");

  return (
    <form onSubmit={handleSubmit} noValidate className="flex flex-col gap-4">

      {/* Global error */}
      {globalError && (
        <div
          role="alert"
          className="flex items-start gap-2.5 rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700"
        >
          <AlertCircle size={16} className="mt-0.5 shrink-0" />
          <span>{globalError}</span>
        </div>
      )}

      {/* Email */}
      <div>
        <label htmlFor={`${uid}-email`} className="mb-1.5 block text-xs font-semibold text-slate-700">
          Email address
        </label>
        <div className="relative">
          <Mail
            size={15}
            className={`absolute left-3.5 top-1/2 -translate-y-1/2 transition-colors ${
              emailErr ? "text-red-400" : "text-slate-400"
            }`}
          />
          <input
            id={`${uid}-email`}
            type="email"
            autoComplete="email"
            required
            placeholder="you@example.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            onBlur={() => setTouched((t) => ({ ...t, email: true }))}
            disabled={anyLoading}
            aria-invalid={!!emailErr}
            aria-describedby={emailErr ? `${uid}-email-err` : undefined}
            className={inputCls(!!emailErr)}
          />
        </div>
        {emailErr && (
          <p id={`${uid}-email-err`} className="mt-1 flex items-center gap-1 text-xs text-red-600">
            <AlertCircle size={11} /> {emailErr}
          </p>
        )}
      </div>

      {/* Password */}
      <div>
        <div className="mb-1.5 flex items-center justify-between">
          <label htmlFor={`${uid}-pw`} className="text-xs font-semibold text-slate-700">
            Password
          </label>
          <button
            type="button"
            tabIndex={-1}
            className="text-xs font-medium text-violet-600 hover:text-violet-800 transition-colors focus-visible:outline-none focus-visible:underline"
          >
            Forgot password?
          </button>
        </div>
        <div className="relative">
          <Lock
            size={15}
            className={`absolute left-3.5 top-1/2 -translate-y-1/2 transition-colors ${
              passwordErr ? "text-red-400" : "text-slate-400"
            }`}
          />
          <input
            id={`${uid}-pw`}
            type={showPw ? "text" : "password"}
            autoComplete="current-password"
            required
            placeholder="Your password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            onBlur={() => setTouched((t) => ({ ...t, password: true }))}
            disabled={anyLoading}
            aria-invalid={!!passwordErr}
            aria-describedby={passwordErr ? `${uid}-pw-err` : undefined}
            className={`${inputCls(!!passwordErr)} pr-11`}
          />
          <button
            type="button"
            onClick={() => setShowPw((v) => !v)}
            className="absolute right-3.5 top-1/2 -translate-y-1/2 rounded p-0.5 text-slate-400 hover:text-slate-600 transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-violet-400"
            aria-label={showPw ? "Hide password" : "Show password"}
          >
            {showPw ? <EyeOff size={15} /> : <Eye size={15} />}
          </button>
        </div>
        {passwordErr && (
          <p id={`${uid}-pw-err`} className="mt-1 flex items-center gap-1 text-xs text-red-600">
            <AlertCircle size={11} /> {passwordErr}
          </p>
        )}
      </div>

      {/* Submit */}
      <button
        type="submit"
        disabled={anyLoading}
        className="mt-1 flex w-full items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-violet-600 to-purple-700 py-3 text-sm font-semibold text-white shadow-lg shadow-violet-900/25 transition-all hover:from-violet-500 hover:to-purple-600 hover:shadow-violet-900/35 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-violet-500 focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-60"
      >
        {loading ? (
          <>
            <Loader2 size={15} className="animate-spin" />
            Signing in…
          </>
        ) : (
          "Log in"
        )}
      </button>

      {/* Divider */}
      <div className="flex items-center gap-3">
        <div className="h-px flex-1 bg-slate-200" />
        <span className="text-xs font-medium text-slate-400">OR</span>
        <div className="h-px flex-1 bg-slate-200" />
      </div>

      {/* Google */}
      <button
        type="button"
        onClick={handleGoogle}
        disabled={anyLoading}
        className="flex w-full items-center justify-center gap-3 rounded-xl border border-slate-200 bg-white py-3 text-sm font-semibold text-slate-700 shadow-sm transition-all hover:border-slate-300 hover:bg-slate-50 hover:shadow focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-violet-500 focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-60"
      >
        {googleLoad ? (
          <Loader2 size={15} className="animate-spin text-slate-500" />
        ) : (
          <GoogleIcon />
        )}
        Continue with Google
      </button>
    </form>
  );
}
