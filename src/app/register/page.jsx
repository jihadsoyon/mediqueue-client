"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import { FcGoogle } from "react-icons/fc";
import { signUp, signIn } from "@/lib/auth-client";

export default function RegisterPage() {
  const router = useRouter();
  const [submitting, setSubmitting] = useState(false);
  const [passwordError, setPasswordError] = useState("");

  const validatePassword = (password) => {
    if (password.length < 6) return "Password must be at least 6 characters long.";
    if (!/[A-Z]/.test(password)) return "Password must contain an uppercase letter.";
    if (!/[a-z]/.test(password)) return "Password must contain a lowercase letter.";
    return "";
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const form = e.target;
    const name = form.name.value;
    const email = form.email.value;
    const photoURL = form.photoURL.value;
    const password = form.password.value;

    const error = validatePassword(password);
    if (error) {
      setPasswordError(error);
      return;
    }
    setPasswordError("");
    setSubmitting(true);

    await signUp.email(
      { name, email, password, image: photoURL },
      {
        onSuccess: () => {
          toast.success("Registration successful! Please login.");
          router.push("/login");
        },
        onError: (ctx) => {
          toast.error(ctx.error?.message || "Registration failed. Please try again.");
          setSubmitting(false);
        },
      }
    );
  };

  const handleGoogleRegister = async () => {
    await signIn.social({ provider: "google", callbackURL: "/" });
  };

  return (
    <div className="max-w-md mx-auto px-6 py-16">
      <h1 className="text-3xl font-bold text-center text-gray-800 dark:text-white mb-8">
        Register to MediQueue
      </h1>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-sm font-medium mb-1">Full Name</label>
          <input name="name" required className="w-full border dark:border-gray-700 rounded-lg px-4 py-2 bg-transparent" />
        </div>
        <div>
          <label className="block text-sm font-medium mb-1">Email</label>
          <input name="email" type="email" required className="w-full border dark:border-gray-700 rounded-lg px-4 py-2 bg-transparent" />
        </div>
        <div>
          <label className="block text-sm font-medium mb-1">Photo URL</label>
          <input name="photoURL" type="url" required className="w-full border dark:border-gray-700 rounded-lg px-4 py-2 bg-transparent" />
        </div>
        <div>
          <label className="block text-sm font-medium mb-1">Password</label>
          <input name="password" type="password" required className="w-full border dark:border-gray-700 rounded-lg px-4 py-2 bg-transparent" />
          {passwordError && <p className="text-red-500 text-xs mt-1">{passwordError}</p>}
          <p className="text-xs text-gray-500 mt-1">
            Must be at least 6 characters with an uppercase and a lowercase letter.
          </p>
        </div>

        <button
          type="submit"
          disabled={submitting}
          className="w-full bg-green-600 hover:bg-green-700 text-white py-3 rounded-lg font-medium disabled:opacity-60"
        >
          {submitting ? "Registering..." : "Register"}
        </button>
      </form>

      <div className="flex items-center gap-3 my-6">
        <div className="flex-1 h-px bg-gray-300 dark:bg-gray-700" />
        <span className="text-sm text-gray-500">or</span>
        <div className="flex-1 h-px bg-gray-300 dark:bg-gray-700" />
      </div>

      <button
        onClick={handleGoogleRegister}
        className="w-full border dark:border-gray-700 py-3 rounded-lg font-medium flex items-center justify-center gap-2 hover:bg-gray-50 dark:hover:bg-gray-800"
      >
        <FcGoogle size={20} />
        Continue with Google
      </button>

      <p className="text-center text-sm text-gray-500 mt-6">
        Already have an account?{" "}
        <Link href="/login" className="text-green-600 font-medium hover:underline">
          Login
        </Link>
      </p>
    </div>
  );
}