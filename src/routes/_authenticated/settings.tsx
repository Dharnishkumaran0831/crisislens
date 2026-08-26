import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { toast } from "sonner";
import { supabase } from "@/integrations/supabase/client";
import type { Session } from "@supabase/supabase-js";
import { Loader2, Moon, Sun, Save, ShieldAlert, Trash2, LogOut } from "lucide-react";
import { useRouter } from "@tanstack/react-router";
import { useQueryClient } from "@tanstack/react-query";

export const Route = createFileRoute("/_authenticated/settings")({
  head: () => ({ meta: [{ title: "Settings — CareerPilot AI" }, { name: "robots", content: "noindex" }] }),
  component: SettingsPage,
});

type Profile = {
  full_name: string; college: string; branch: string; year: number | null;
  cgpa: number | null; dream_role: string; dream_company: string; target_salary_lpa: number | null; avatar_url: string;
};

const PREF_KEY = "careerpilot:prefs";
type Prefs = { theme: "dark" | "light"; notifyEmail: boolean; notifyPush: boolean; notifyWeekly: boolean };
const DEFAULT_PREFS: Prefs = { theme: "dark", notifyEmail: true, notifyPush: true, notifyWeekly: true };

function loadPrefs(): Prefs {
  if (typeof window === "undefined") return DEFAULT_PREFS;
  try { return { ...DEFAULT_PREFS, ...(JSON.parse(localStorage.getItem(PREF_KEY) ?? "{}")) }; } catch { return DEFAULT_PREFS; }
}
function applyTheme(t: "dark" | "light") {
  if (typeof document === "undefined") return;
  document.documentElement.classList.toggle("light", t === "light");
}

function SettingsPage() {
  const router = useRouter();
  const qc = useQueryClient();
  const [session, setSession] = useState<Session | null>(null);
  const [profile, setProfile] = useState<Profile>({
    full_name: "", college: "", branch: "", year: null, cgpa: null,
    dream_role: "", dream_company: "", target_salary_lpa: null, avatar_url: "",
  });
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [prefs, setPrefs] = useState<Prefs>(DEFAULT_PREFS);

  const [pw, setPw] = useState({ next: "", confirm: "" });
  const [pwSaving, setPwSaving] = useState(false);

  useEffect(() => {
    const p = loadPrefs();
    setPrefs(p);
    applyTheme(p.theme);
    supabase.auth.getSession().then(async ({ data }) => {
      setSession(data.session);
      if (data.session) {
        const { data: prof } = await supabase.from("profiles").select("*").eq("user_id", data.session.user.id).maybeSingle();
        if (prof) setProfile({
          full_name: prof.full_name ?? "", college: prof.college ?? "", branch: prof.branch ?? "",
          year: prof.year, cgpa: prof.cgpa, dream_role: prof.dream_role ?? "", dream_company: prof.dream_company ?? "",
          target_salary_lpa: prof.target_salary_lpa, avatar_url: prof.avatar_url ?? "",
        });
      }
      setLoading(false);
    });
  }, []);

  const savePrefs = (p: Prefs) => {
    setPrefs(p);
    try { localStorage.setItem(PREF_KEY, JSON.stringify(p)); } catch { /* ignore */ }
  };

  const saveProfile = async () => {
    if (!session) return;
    setSaving(true);
    const { error } = await supabase.from("profiles").update({
      full_name: profile.full_name, college: profile.college, branch: profile.branch,
      year: profile.year, cgpa: profile.cgpa, dream_role: profile.dream_role,
      dream_company: profile.dream_company, target_salary_lpa: profile.target_salary_lpa,
      avatar_url: profile.avatar_url,
    }).eq("user_id", session.user.id);
    setSaving(false);
    if (error) return toast.error(error.message);
    toast.success("Profile saved");
  };

  const changePassword = async () => {
    if (pw.next.length < 8) return toast.error("Password must be at least 8 characters");
    if (pw.next !== pw.confirm) return toast.error("Passwords do not match");
    setPwSaving(true);
    const { error } = await supabase.auth.updateUser({ password: pw.next });
    setPwSaving(false);
    if (error) return toast.error(error.message);
    setPw({ next: "", confirm: "" });
    toast.success("Password updated");
  };

  const signOutAll = async () => {
    await supabase.auth.signOut({ scope: "global" });
    qc.clear();
    router.navigate({ to: "/auth", replace: true });
  };

  const deleteAccount = async () => {
    if (!confirm("This clears all your CareerPilot data (applications, coding problems, profile). Continue?")) return;
    if (!session) return;
    const uid = session.user.id;
    await supabase.from("applications").delete().eq("user_id", uid);
    await supabase.from("coding_problems").delete().eq("user_id", uid);
    await supabase.from("events").delete().eq("user_id", uid);
    await supabase.from("profiles").delete().eq("user_id", uid);
    try { localStorage.clear(); } catch { /* ignore */ }
    toast.success("Data cleared. Signing out.");
    await supabase.auth.signOut();
    router.navigate({ to: "/auth", replace: true });
  };

  if (loading) return <div className="flex items-center gap-2 text-muted-foreground"><Loader2 className="h-4 w-4 animate-spin" /> Loading…</div>;

  return (
    <div className="space-y-6">
      <header>
        <h1 className="font-display text-3xl font-bold">Settings</h1>
        <p className="text-sm text-muted-foreground">Profile, theme, notifications, security.</p>
      </header>

      <Tabs defaultValue="profile">
        <TabsList>
          <TabsTrigger value="profile">Profile</TabsTrigger>
          <TabsTrigger value="appearance">Appearance</TabsTrigger>
          <TabsTrigger value="notifications">Notifications</TabsTrigger>
          <TabsTrigger value="security">Security</TabsTrigger>
          <TabsTrigger value="account">Account</TabsTrigger>
        </TabsList>

        <TabsContent value="profile" className="space-y-4">
          <Panel title="Personal details">
            <div className="grid gap-3 sm:grid-cols-2">
              <Field label="Full name" v={profile.full_name} on={(v) => setProfile({ ...profile, full_name: v })} />
              <Field label="Avatar URL" v={profile.avatar_url} on={(v) => setProfile({ ...profile, avatar_url: v })} />
              <Field label="College" v={profile.college} on={(v) => setProfile({ ...profile, college: v })} />
              <Field label="Branch" v={profile.branch} on={(v) => setProfile({ ...profile, branch: v })} />
              <NumField label="Year (1-5)" v={profile.year} on={(v) => setProfile({ ...profile, year: v })} />
              <NumField label="CGPA" step="0.01" v={profile.cgpa} on={(v) => setProfile({ ...profile, cgpa: v })} />
            </div>
          </Panel>
          <Panel title="Career goals">
            <div className="grid gap-3 sm:grid-cols-2">
              <Field label="Dream role" v={profile.dream_role} on={(v) => setProfile({ ...profile, dream_role: v })} />
              <Field label="Dream company" v={profile.dream_company} on={(v) => setProfile({ ...profile, dream_company: v })} />
              <NumField label="Target salary (LPA)" v={profile.target_salary_lpa} on={(v) => setProfile({ ...profile, target_salary_lpa: v })} />
            </div>
          </Panel>
          <Button onClick={saveProfile} disabled={saving} className="bg-gradient-brand text-white">
            {saving ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : <Save className="mr-2 h-4 w-4" />} Save profile
          </Button>
        </TabsContent>

        <TabsContent value="appearance" className="space-y-4">
          <Panel title="Theme">
            <div className="flex flex-wrap gap-3">
              {(["dark", "light"] as const).map((t) => (
                <button key={t} onClick={() => { const n = { ...prefs, theme: t }; savePrefs(n); applyTheme(t); }}
                  className={`flex items-center gap-2 rounded-xl border px-4 py-3 text-sm ${prefs.theme === t ? "border-primary bg-gradient-brand-soft" : "border-border hover:border-primary/40"}`}>
                  {t === "dark" ? <Moon className="h-4 w-4" /> : <Sun className="h-4 w-4" />} {t === "dark" ? "Dark" : "Light"}
                </button>
              ))}
            </div>
            <p className="mt-3 text-xs text-muted-foreground">Theme is saved locally on this device.</p>
          </Panel>
        </TabsContent>

        <TabsContent value="notifications" className="space-y-3">
          <Panel title="Channels">
            <Toggle label="Email updates" desc="Interview reminders, new job matches" v={prefs.notifyEmail} on={(v) => savePrefs({ ...prefs, notifyEmail: v })} />
            <Toggle label="Push notifications" desc="Realtime alerts on this device" v={prefs.notifyPush} on={(v) => savePrefs({ ...prefs, notifyPush: v })} />
            <Toggle label="Weekly digest" desc="Every Monday: progress, streaks, top jobs" v={prefs.notifyWeekly} on={(v) => savePrefs({ ...prefs, notifyWeekly: v })} />
          </Panel>
        </TabsContent>

        <TabsContent value="security" className="space-y-4">
          <Panel title="Change password">
            <div className="grid gap-3 sm:grid-cols-2">
              <div>
                <Label className="text-xs">New password</Label>
                <Input type="password" value={pw.next} onChange={(e) => setPw({ ...pw, next: e.target.value })} className="mt-1" />
              </div>
              <div>
                <Label className="text-xs">Confirm password</Label>
                <Input type="password" value={pw.confirm} onChange={(e) => setPw({ ...pw, confirm: e.target.value })} className="mt-1" />
              </div>
            </div>
            <Button onClick={changePassword} disabled={pwSaving} className="mt-3 bg-gradient-brand text-white">
              {pwSaving ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : null} Update password
            </Button>
          </Panel>
          <Panel title="Sessions">
            <p className="text-sm text-muted-foreground">Sign out of every device where you're currently signed in.</p>
            <Button variant="outline" onClick={signOutAll} className="mt-3"><LogOut className="mr-2 h-4 w-4" /> Sign out of all sessions</Button>
          </Panel>
        </TabsContent>

        <TabsContent value="account" className="space-y-4">
          <Panel title="Account info">
            <p className="text-sm">Email: <span className="font-mono">{session?.user.email}</span></p>
            <p className="text-sm">User ID: <span className="font-mono text-xs">{session?.user.id}</span></p>
          </Panel>
          <Panel title="Danger zone" tone="danger">
            <div className="flex items-start gap-3">
              <ShieldAlert className="h-5 w-5 text-destructive" />
              <div className="flex-1">
                <p className="text-sm font-medium">Delete all data</p>
                <p className="text-xs text-muted-foreground">Removes your profile, applications, coding problems and events. Cannot be undone.</p>
                <Button variant="destructive" onClick={deleteAccount} className="mt-3"><Trash2 className="mr-2 h-4 w-4" /> Delete my data</Button>
              </div>
            </div>
          </Panel>
        </TabsContent>
      </Tabs>
    </div>
  );
}

function Panel({ title, children, tone }: { title: string; children: React.ReactNode; tone?: "danger" }) {
  return (
    <div className={`rounded-2xl border p-5 ${tone === "danger" ? "border-destructive/40 bg-destructive/5" : "border-border bg-card/60"}`}>
      <h3 className="mb-3 font-display text-lg font-semibold">{title}</h3>
      {children}
    </div>
  );
}
function Field({ label, v, on }: { label: string; v: string; on: (v: string) => void }) {
  return (<div><Label className="text-xs">{label}</Label><Input value={v} onChange={(e) => on(e.target.value)} className="mt-1" /></div>);
}
function NumField({ label, v, on, step }: { label: string; v: number | null; on: (v: number | null) => void; step?: string }) {
  return (<div><Label className="text-xs">{label}</Label>
    <Input type="number" step={step} value={v ?? ""} onChange={(e) => on(e.target.value === "" ? null : Number(e.target.value))} className="mt-1" />
  </div>);
}
function Toggle({ label, desc, v, on }: { label: string; desc: string; v: boolean; on: (v: boolean) => void }) {
  return (
    <div className="flex items-center justify-between border-b border-border/40 py-3 last:border-0">
      <div><p className="text-sm font-medium">{label}</p><p className="text-xs text-muted-foreground">{desc}</p></div>
      <Switch checked={v} onCheckedChange={on} />
    </div>
  );
}
