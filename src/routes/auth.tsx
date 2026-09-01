import { createFileRoute, useNavigate, Link } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { toast } from "sonner";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Loader2, Mail, Lock, User as UserIcon, ArrowLeft } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Logo } from "@/components/logo";
import { GradientOrb } from "@/components/gradient-orb";

export const Route = createFileRoute("/auth")({
  head: () => ({
    meta: [
      { title: "Sign in — CareerPilot AI" },
      { name: "description", content: "Sign in or create your CareerPilot AI account." },
      { name: "robots", content: "noindex" },
    ],
  }),
  component: AuthPage,
});

const signInSchema = z.object({
  email: z.string().trim().email("Enter a valid email").max(255),
  password: z.string().min(6, "Min 6 characters").max(100),
});

const signUpSchema = signInSchema.extend({
  full_name: z.string().trim().min(2, "Enter your name").max(80),
});

function AuthPage() {
  const navigate = useNavigate();
  const [checking, setChecking] = useState(true);

  useEffect(() => {
    let mounted = true;

    supabase.auth
      .getSession()
      .then(({ data }) => {
        if (mounted) {
          if (data?.session) navigate({ to: "/dashboard", replace: true });
          else setChecking(false);
        }
      })
      .catch(() => {
        if (mounted) setChecking(false);
      });

    // Timeout safety fallback: if getSession takes > 1.5s, display form anyway
    const timer = setTimeout(() => {
      if (mounted) setChecking(false);
    }, 1500);

    const { data: sub } = supabase.auth.onAuthStateChange((_e, session) => {
      if (session && mounted) navigate({ to: "/dashboard", replace: true });
    });

    return () => {
      mounted = false;
      clearTimeout(timer);
      sub.subscription.unsubscribe();
    };
  }, [navigate]);

  if (checking) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-background">
        <Loader2 className="h-6 w-6 animate-spin text-primary" />
      </div>
    );
  }

  return (
    <div className="relative flex min-h-screen items-center justify-center overflow-hidden bg-background bg-hero-radial px-4 py-12">
      <GradientOrb className="-left-20 top-1/3 h-96 w-96" />
      <GradientOrb className="-right-20 bottom-0 h-96 w-96 opacity-30" />

      <Link to="/" className="absolute left-4 top-4 inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground">
        <ArrowLeft className="h-4 w-4" /> Back
      </Link>

      <motion.div
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
        className="relative w-full max-w-md"
      >
        <div className="mb-6 flex justify-center"><Logo /></div>

        <div className="rounded-2xl border border-border bg-card/80 p-6 shadow-card backdrop-blur-xl sm:p-8">
          <div className="mb-6 text-center">
            <h1 className="font-display text-2xl font-bold tracking-tight">Welcome to CareerPilot</h1>
            <p className="mt-1 text-sm text-muted-foreground">Your AI copilot for placement success.</p>
          </div>

          <Tabs defaultValue="signin" className="w-full">
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="signin">Sign in</TabsTrigger>
              <TabsTrigger value="signup">Create account</TabsTrigger>
            </TabsList>
            <TabsContent value="signin" className="mt-6"><SignInForm /></TabsContent>
            <TabsContent value="signup" className="mt-6"><SignUpForm /></TabsContent>
          </Tabs>

         
        </div>

        <p className="mt-6 text-center text-xs text-muted-foreground">
          By continuing you agree to our Terms & Privacy Policy.
        </p>
      </motion.div>
    </div>
  );
}

function SignInForm() {
  const [loading, setLoading] = useState(false);
  const form = useForm<z.infer<typeof signInSchema>>({
    resolver: zodResolver(signInSchema),
    defaultValues: { email: "", password: "" },
  });

  const onSubmit = form.handleSubmit(async (values) => {
    setLoading(true);
    const { error } = await supabase.auth.signInWithPassword(values);
    setLoading(false);
    if (error) toast.error(error.message);
  });

  return (
    <form onSubmit={onSubmit} className="space-y-4">
      <div className="space-y-2">
        <Label htmlFor="si-email">Email</Label>
        <div className="relative">
          <Mail className="pointer-events-none absolute left-3 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input id="si-email" type="email" placeholder="you@college.edu" className="pl-9" {...form.register("email")} />
        </div>
        {form.formState.errors.email && <p className="text-xs text-destructive">{form.formState.errors.email.message}</p>}
      </div>
      <div className="space-y-2">
        <Label htmlFor="si-pw">Password</Label>
        <div className="relative">
          <Lock className="pointer-events-none absolute left-3 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input id="si-pw" type="password" placeholder="••••••••" className="pl-9" {...form.register("password")} />
        </div>
        {form.formState.errors.password && <p className="text-xs text-destructive">{form.formState.errors.password.message}</p>}
      </div>
      <Button type="submit" disabled={loading} className="w-full bg-gradient-brand text-white hover:opacity-90">
        {loading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />} Sign in
      </Button>
    </form>
  );
}

function SignUpForm() {
  const [loading, setLoading] = useState(false);
  const form = useForm<z.infer<typeof signUpSchema>>({
    resolver: zodResolver(signUpSchema),
    defaultValues: { full_name: "", email: "", password: "" },
  });

  const onSubmit = form.handleSubmit(async (values) => {
    setLoading(true);
    const { error } = await supabase.auth.signUp({
      email: values.email,
      password: values.password,
      options: {
        emailRedirectTo: `${window.location.origin}/dashboard`,
        data: { full_name: values.full_name },
      },
    });
    setLoading(false);
    if (error) return toast.error(error.message);
    toast.success("Account created! You're in.");
  });

  return (
    <form onSubmit={onSubmit} className="space-y-4">
      <div className="space-y-2">
        <Label htmlFor="su-name">Full name</Label>
        <div className="relative">
          <UserIcon className="pointer-events-none absolute left-3 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input id="su-name" placeholder="Ada Lovelace" className="pl-9" {...form.register("full_name")} />
        </div>
        {form.formState.errors.full_name && <p className="text-xs text-destructive">{form.formState.errors.full_name.message}</p>}
      </div>
      <div className="space-y-2">
        <Label htmlFor="su-email">Email</Label>
        <div className="relative">
          <Mail className="pointer-events-none absolute left-3 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input id="su-email" type="email" placeholder="you@college.edu" className="pl-9" {...form.register("email")} />
        </div>
        {form.formState.errors.email && <p className="text-xs text-destructive">{form.formState.errors.email.message}</p>}
      </div>
      <div className="space-y-2">
        <Label htmlFor="su-pw">Password</Label>
        <div className="relative">
          <Lock className="pointer-events-none absolute left-3 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input id="su-pw" type="password" placeholder="At least 6 characters" className="pl-9" {...form.register("password")} />
        </div>
        {form.formState.errors.password && <p className="text-xs text-destructive">{form.formState.errors.password.message}</p>}
      </div>
      <Button type="submit" disabled={loading} className="w-full bg-gradient-brand text-white hover:opacity-90">
        {loading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />} Create account
      </Button>
    </form>
  );
}

