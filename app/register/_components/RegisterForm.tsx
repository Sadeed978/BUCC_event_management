"use client";

import { useState, type FormEvent } from "react";
import { useRouter } from "next/navigation";
import { Eye, EyeOff } from "lucide-react";
import { useAuth } from "@/components/auth/AuthProvider";
import { toast } from "sonner";

export default function RegisterForm() {
  const router = useRouter();
  const { signUp, signInWithGoogle } = useAuth();

  const [name,     setName]     = useState("");
  const [email,    setEmail]    = useState("");
  const [password, setPassword] = useState("");
  const [confirm,  setConfirm]  = useState("");
  const [showPw,   setShowPw]   = useState(false);
  const [loading,  setLoading]  = useState(false);
  const [error,    setError]    = useState<string | null>(null);

  const validate = () => {
    if (!name.trim())    return "Name is required.";
    if (!email.trim())   return "Email is required.";
    if (password.length < 8) return "Password must be at least 8 characters.";
    if (password !== confirm)  return "Passwords do not match.";
    return null;
  };

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    setError(null);
    const err = validate();
    if (err) { setError(err); return; }

    setLoading(true);
    try {
      await signUp(email.trim(), password, name.trim());
      toast.success("Account created! Welcome to Eventora.");
      router.push("/");
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : "Registration failed.";
      if (msg.includes("email-already-in-use")) {
        setError("An account with this email already exists.");
      } else if (msg.includes("invalid-email")) {
        setError("Please enter a valid email address.");
      } else if (msg.includes("weak-password")) {
        setError("Password is too weak. Use at least 8 characters.");
      } else {
        setError(msg);
      }
    } finally {
      setLoading(false);
    }
  }

  async function handleGoogle() {
    setError(null);
    setLoading(true);
    try {
      await signInWithGoogle();
      toast.success("Signed in with Google!");
      router.push("/");
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : "Google sign-in failed.";
      if (msg.includes("popup-closed-by-user")) {
        setError(null); // user dismissed — no error needed
      } else {
        setError("Google sign-in failed. Please try again.");
      }
    } finally {
      setLoading(false);
    }
  }

  return (
    <form onSubmit={handleSubmit} noValidate className="flex flex-col gap-3">
      {error && (
        <div role="alert" className="px-4 py-2.5 rounded-xl bg-red-50 border border-red-200 text-red-700 text-xs text-center">
          {error}
        </div>
      )}

      {/* Name */}
      <div>
        <label htmlFor="name" className="block text-xs font-semibold text-slate-700 mb-1">Full name</label>
        <input
          id="name" type="text" autoComplete="name" required
          placeholder="Your full name"
          value={name} onChange={(e) => setName(e.target.value)}
          disabled={loading}
          className="w-full px-4 py-2.5 rounded-xl border border-slate-200 text-sm text-slate-900 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-violet-500 focus:border-transparent disabled:opacity-60"
        />
      </div>

      {/* Email */}
      <div>
        <label htmlFor="reg-email" className="block text-xs font-semibold text-slate-700 mb-1">Email address</label>
        <input
          id="reg-email" type="email" autoComplete="email" required
          placeholder="you@example.com"
          value={email} onChange={(e) => setEmail(e.target.value)}
          disabled={loading}
          className="w-full px-4 py-2.5 rounded-xl border border-slate-200 text-sm text-slate-900 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-violet-500 focus:border-transparent disabled:opacity-60"
        />
      </div>

      {/* Password */}
      <div>
        <label htmlFor="reg-password" className="block text-xs font-semibold text-slate-700 mb-1">Password</label>
        <div className="relative">
          <input
            id="reg-password" type={showPw ? "text" : "password"} autoComplete="new-password" required
            placeholder="At least 8 characters"
            value={password} onChange={(e) => setPassword(e.target.value)}
            disabled={loading}
            className="w-full pl-4 pr-10 py-2.5 rounded-xl border border-slate-200 text-sm text-slate-900 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-violet-500 focus:border-transparent disabled:opacity-60"
          />
          <button type="button" onClick={() => setShowPw((v) => !v)}
            className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600"
            aria-label={showPw ? "Hide password" : "Show password"}
          >
            {showPw ? <EyeOff size={15} /> : <Eye size={15} />}
          </button>
        </div>
      </div>

      {/* Confirm password */}
      <div>
        <label htmlFor="confirm" className="block text-xs font-semibold text-slate-700 mb-1">Confirm password</label>
        <input
          id="confirm" type={showPw ? "text" : "password"} autoComplete="new-password" required
          placeholder="Repeat password"
          value={confirm} onChange={(e) => setConfirm(e.target.value)}
          disabled={loading}
          className="w-full px-4 py-2.5 rounded-xl border border-slate-200 text-sm text-slate-900 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-violet-500 focus:border-transparent disabled:opacity-60"
        />
      </div>

      {/* Submit */}
      <button
        type="submit" disabled={loading}
        className="w-full py-2.5 rounded-xl bg-violet-600 text-white text-sm font-semibold hover:bg-violet-700 transition-colors shadow-sm disabled:opacity-60 disabled:cursor-not-allowed flex items-center justify-center gap-2 mt-1"
      >
        {loading ? (
          <><span className="w-4 h-4 rounded-full border-2 border-white border-t-transparent animate-spin" /> Creating account…</>
        ) : "Create account"}
      </button>

      {/* Divider */}
      <div className="flex items-center gap-3 my-1">
        <div className="flex-1 h-px bg-slate-200" />
        <span className="text-xs text-slate-400">or</span>
        <div className="flex-1 h-px bg-slate-200" />
      </div>

      {/* Google */}
      <button
        type="button" onClick={handleGoogle} disabled={loading}
        className="w-full flex items-center justify-center gap-3 py-2.5 rounded-xl border border-slate-200 text-sm font-medium text-slate-700 hover:bg-slate-50 transition-colors disabled:opacity-60 disabled:cursor-not-allowed"
      >
        <svg width="16" height="16" viewBox="0 0 48 48" aria-hidden="true">
          <path fill="#EA4335" d="M24 9.5c3.54 0 6.71 1.22 9.21 3.6l6.85-6.85C35.9 2.38 30.47 0 24 0 14.62 0 6.51 5.38 2.56 13.22l7.98 6.19C12.43 13.72 17.74 9.5 24 9.5z"/>
          <path fill="#4285F4" d="M46.98 24.55c0-1.57-.15-3.09-.38-4.55H24v9.02h12.94c-.58 2.96-2.26 5.48-4.78 7.18l7.73 6c4.51-4.18 7.09-10.36 7.09-17.65z"/>
          <path fill="#FBBC05" d="M10.53 28.59c-.48-1.45-.76-2.99-.76-4.59s.27-3.14.76-4.59l-7.98-6.19C.92 16.46 0 20.12 0 24c0 3.88.92 7.54 2.56 10.78l7.97-6.19z"/>
          <path fill="#34A853" d="M24 48c6.48 0 11.93-2.13 15.89-5.81l-7.73-6c-2.15 1.45-4.92 2.3-8.16 2.3-6.26 0-11.57-4.22-13.47-9.91l-7.98 6.19C6.51 42.62 14.62 48 24 48z"/>
        </svg>
        Continue with Google
      </button>
    </form>
  );
}
