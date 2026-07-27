"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import { FcGoogle } from "react-icons/fc";
import { signIn } from "@/lib/auth-client";

export default function LoginPage() {
  const router = useRouter();
  const [submitting, setSubmitting] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);
    const form = e.target;
    const email = form.email.value;
    const password = form.password.value;

    await signIn.email(
      { email, password },
      {
        onSuccess: () => {
          toast.success("Logged in successfully!");
          router.push("/");
        },
        onError: (ctx) => {
          toast.error(ctx.error?.message || "Login failed. Please check your credentials.");
          setSubmitting(false);
        },
      }
    );
  };

  const handleGoogleLogin = async () => {
    await signIn.social({ provider: "google", callbackURL: "/" });
  };

  const handleForgotPassword = () => {
    toast("Password reset is currently unavailable. Please contact support.", { icon: "ℹ️" });
  };

  return (
    <div className="max-w-md mx-auto px-6 py-16">
      <h1 className="text-3xl font-bold text-center text-gray-800 dark:text-white mb-8">
        Login to MediQueue
      </h1>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-sm font-medium mb-1">Email</label>
          <input
            name="email"
            type="email"
            required
            className="w-full border dark:border-gray-700 rounded-lg px-4 py-2 bg-transparent"
          />
        </div>
        <div>
          <label className="block text-sm font-medium mb-1">Password</label>
          <input
            name="password"
            type="password"
            required
            className="w-full border dark:border-gray-700 rounded-lg px-4 py-2 bg-transparent"
          />
        </div>

        <div className="text-right">
          <button
            type="button"
            onClick={handleForgotPassword}
            className="text-sm text-green-600 hover:underline"
          >
            Forgot Password?
          </button>
        </div>

        <button
          type="submit"
          disabled={submitting}
          className="w-full bg-green-600 hover:bg-green-700 text-white py-3 rounded-lg font-medium disabled:opacity-60"
        >
          {submitting ? "Logging in..." : "Login"}
        </button>
      </form>

      <div className="flex items-center gap-3 my-6">
        <div className="flex-1 h-px bg-gray-300 dark:bg-gray-700" />
        <span className="text-sm text-gray-500">or</span>
        <div className="flex-1 h-px bg-gray-300 dark:bg-gray-700" />
      </div>

      <button
        onClick={handleGoogleLogin}
        className="w-full border dark:border-gray-700 py-3 rounded-lg font-medium flex items-center justify-center gap-2 hover:bg-gray-50 dark:hover:bg-gray-800"
      >
        <FcGoogle size={20} />
        Continue with Google
      </button>

      <p className="text-center text-sm text-gray-500 mt-6">
        Don&apos;t have an account?{" "}
        <Link href="/register" className="text-green-600 font-medium hover:underline">
          Register
        </Link>
      </p>
    </div>
  );
}