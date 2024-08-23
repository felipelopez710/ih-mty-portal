import Link from "next/link";
import Image from "next/image";
import { headers } from "next/headers";
import { createClient } from "@/utils/supabase/server";
import { redirect } from "next/navigation";
import { SubmitButton } from "./submit-button";

const colorCodes = [
  {
    id: 1,
    color: 'bg-rainbow-red'
  },
  {
    id: 2,
    color: 'bg-rainbow-pink'
  },
  {
    id: 3,
    color: 'bg-rainbow-magenta'
  },
  {
    id: 4,
    color: 'bg-rainbow-blue'
  },
  {
    id: 5,
    color: 'bg-rainbow-green'
  },
  {
    id: 6,
    color: 'bg-rainbow-lime'
  },
  {
    id: 7,
    color: 'bg-rainbow-orange'
  },
  {
    id: 8,
    color: 'bg-rainbow-yellow'
  },
]

export default function Login({
  searchParams,
}: {
  searchParams: { message: string };
}) {
  const signIn = async (formData: FormData) => {
    "use server";

    const email = formData.get("email") as string;
    const password = formData.get("password") as string;
    const supabase = createClient();

    const { error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (error) {
      return redirect("/login?message=Could not authenticate user");
    }

    return redirect("/");
  };

  const signUp = async (formData: FormData) => {
    "use server";

    const origin = headers().get("origin");
    const email = formData.get("email") as string;
    const password = formData.get("password") as string;
    const supabase = createClient();

    const { error } = await supabase.auth.signUp({
      email,
      password,
      /* options: {
        emailRedirectTo: `${origin}/auth/callback`,
      }, */
    });

    if (error) {
      console.log(error)
      return redirect("/login?message=Could not authenticate user");
    }

    return redirect("/login?message=Check email to continue sign in process");
  };

  return (
    <main className="w-full min-h-screen bg-light-background flex items-center justify-center">
      <div className="flex-1 flex flex-col w-full p-8 sm:max-w-md justify-center gap-10 bg-white rounded-xl drop-shadow-login-card">

        <div className="logo-container">
          <Image
            src="/logo-ih-mty-color.png"
            width={164}
            height={52}
            alt="logo-ih"
          />
        </div>

        <div className="copy-container flex flex-col gap-1">
          <div className="section-title text-2xl font-semibold">Login to your account</div>
          <div className="secondary-text text-base text-gray-500 font-light">Enter your credentials bellow</div>
        </div>

        <form className="animate-in flex-1 flex flex-col w-full justify-center gap-2 text-foreground">
          <label className="text-md" htmlFor="email">
            Email
          </label>
          <input
            className="rounded-md px-4 py-2.5 bg-inherit border mb-6"
            name="email"
            placeholder="you@example.com"
            required
          />
          <label className="text-md" htmlFor="password">
            Password
          </label>
          <input
            className="rounded-md px-4 py-2.5 bg-inherit border mb-6"
            type="password"
            name="password"
            placeholder="••••••••"
            required
          />
          <SubmitButton
            formAction={signIn}
            className="ih-button rounded-lg py-3.5 text-white font-semibold text-sm"
            pendingText="Signing In..."
          >
            Sign In
          </SubmitButton>
          {/* <SubmitButton
            formAction={signUp}
            className="border border-foreground/20 rounded-md px-4 py-2 text-foreground mb-2"
            pendingText="Signing Up..."
          >
            Sign Up
          </SubmitButton>
          {searchParams?.message && (
            <p className="mt-4 p-4 bg-foreground/10 text-foreground text-center">
              {searchParams.message}
            </p>
          )} */}
        </form>
      </div>

      <div className="decorative-stipe w-full h-4 bg-red-600 absolute bottom-0 left-0 flex">
        {
          colorCodes.map((color:any)=>{
            return(
              <div key={color.id} className={`flex-1 h-full ${color.color}`}></div>
          )})
        }
        {
          colorCodes.map((color:any)=>{
            return(
              <div key={color.id} className={`flex-1 h-full ${color.color}`}></div>
          )})
        }
      </div>
    </main>
  );
}
