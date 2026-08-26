import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger, DialogFooter } from "@/components/ui/dialog";
import { toast } from "sonner";
import { Plus, Briefcase, Trash2, Trophy, Send, XCircle } from "lucide-react";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { motion } from "framer-motion";
import type { Database } from "@/integrations/supabase/types";

export const Route = createFileRoute("/_authenticated/placements")({
  head: () => ({ meta: [{ title: "Placement Tracker — CareerPilot AI" }, { name: "robots", content: "noindex" }] }),
  component: PlacementsPage,
});

type Status = Database["public"]["Enums"]["app_status"];

const schema = z.object({
  company: z.string().trim().min(1).max(100),
  role: z.string().trim().min(1).max(100),
  status: z.enum(["applied","oa_cleared","interview","selected","rejected","offer"]),
  salary_lpa: z.string().optional(),
  applied_at: z.string().optional(),
  notes: z.string().max(1000).optional(),
});
type FormT = z.infer<typeof schema>;

const STAGES: { key: Status; label: string; tint: string }[] = [
  { key: "applied", label: "Applied", tint: "bg-slate-500/15 text-slate-300" },
  { key: "oa_cleared", label: "OA Cleared", tint: "bg-indigo-500/15 text-indigo-300" },
  { key: "interview", label: "Interview", tint: "bg-purple-500/15 text-purple-300" },
  { key: "selected", label: "Selected", tint: "bg-cyan-500/15 text-cyan-300" },
  { key: "offer", label: "Offer", tint: "bg-emerald-500/15 text-emerald-300" },
  { key: "rejected", label: "Rejected", tint: "bg-rose-500/15 text-rose-300" },
];

function PlacementsPage() {
  const qc = useQueryClient();
  const [open, setOpen] = useState(false);

  const { data: apps = [], isLoading } = useQuery({
    queryKey: ["applications"],
    queryFn: async () => {
      const { data, error } = await supabase.from("applications").select("*").order("applied_at", { ascending: false });
      if (error) throw error;
      return data;
    },
  });

  const create = useMutation({
    mutationFn: async (v: FormT) => {
      const { data: sess } = await supabase.auth.getUser();
      if (!sess.user) throw new Error("Not signed in");
      const { error } = await supabase.from("applications").insert({
        user_id: sess.user.id,
        company: v.company,
        role: v.role,
        status: v.status,
        salary_lpa: v.salary_lpa ? Number(v.salary_lpa) : null,
        applied_at: v.applied_at || new Date().toISOString().slice(0, 10),
        notes: v.notes || null,
      });
      if (error) throw error;
    },
    onSuccess: () => { qc.invalidateQueries({ queryKey: ["applications"] }); toast.success("Application added"); setOpen(false); },
    onError: (e: Error) => toast.error(e.message),
  });

  const updateStatus = useMutation({
    mutationFn: async ({ id, status }: { id: string; status: Status }) => {
      const { error } = await supabase.from("applications").update({ status }).eq("id", id);
      if (error) throw error;
    },
    onSuccess: () => qc.invalidateQueries({ queryKey: ["applications"] }),
  });

  const del = useMutation({
    mutationFn: async (id: string) => (await supabase.from("applications").delete().eq("id", id)).error,
    onSuccess: () => { qc.invalidateQueries({ queryKey: ["applications"] }); toast.success("Removed"); },
  });

  const stats = {
    total: apps.length,
    interviews: apps.filter((a) => a.status === "interview").length,
    offers: apps.filter((a) => a.status === "offer" || a.status === "selected").length,
    rejected: apps.filter((a) => a.status === "rejected").length,
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-wrap items-end justify-between gap-4">
        <div>
          <h1 className="font-display text-3xl font-bold tracking-tight">Placement Tracker</h1>
          <p className="mt-1 text-sm text-muted-foreground">Every application, every OA, every interview — one pipeline.</p>
        </div>
        <AddDialog open={open} setOpen={setOpen} onSubmit={(v) => create.mutate(v)} loading={create.isPending} />
      </div>

      <div className="grid gap-4 md:grid-cols-4">
        <Stat label="Applications" value={stats.total} icon={Briefcase} />
        <Stat label="In interview" value={stats.interviews} icon={Send} tint="text-purple-300" />
        <Stat label="Offers / Selected" value={stats.offers} icon={Trophy} tint="text-cyan" />
        <Stat label="Rejected" value={stats.rejected} icon={XCircle} tint="text-rose-400" />
      </div>

      {/* Kanban */}
      <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
        {STAGES.map((s) => {
          const items = apps.filter((a) => a.status === s.key);
          return (
            <div key={s.key} className="rounded-2xl border border-border bg-card/60 p-4 backdrop-blur">
              <div className="mb-3 flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <span className={`rounded-full px-2 py-0.5 text-xs ${s.tint}`}>{s.label}</span>
                  <span className="text-xs text-muted-foreground">{items.length}</span>
                </div>
              </div>
              <div className="space-y-2">
                {items.length === 0 && (<p className="rounded-lg border border-dashed border-border px-3 py-6 text-center text-xs text-muted-foreground">Nothing here yet</p>)}
                {items.map((a) => (
                  <motion.div key={a.id} layout initial={{ opacity: 0, y: 6 }} animate={{ opacity: 1, y: 0 }} className="group rounded-xl border border-border/60 bg-background/60 p-3">
                    <div className="flex items-start justify-between gap-2">
                      <div className="min-w-0">
                        <p className="truncate text-sm font-medium">{a.company}</p>
                        <p className="truncate text-xs text-muted-foreground">{a.role}</p>
                      </div>
                      <button onClick={() => del.mutate(a.id)} className="text-muted-foreground opacity-0 transition group-hover:opacity-100 hover:text-destructive"><Trash2 className="h-3.5 w-3.5" /></button>
                    </div>
                    <div className="mt-2 flex items-center justify-between">
                      <span className="text-[11px] text-muted-foreground">{a.applied_at} {a.salary_lpa ? `· ₹${a.salary_lpa} LPA` : ""}</span>
                      <Select value={a.status} onValueChange={(v) => updateStatus.mutate({ id: a.id, status: v as Status })}>
                        <SelectTrigger className="h-7 w-28 text-xs bg-background/50"><SelectValue /></SelectTrigger>
                        <SelectContent>{STAGES.map((x) => <SelectItem key={x.key} value={x.key}>{x.label}</SelectItem>)}</SelectContent>
                      </Select>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          );
        })}
      </div>

      {isLoading && <p className="text-sm text-muted-foreground">Loading…</p>}
    </div>
  );
}

function Stat({ label, value, icon: Icon, tint }: { label: string; value: number; icon: React.ComponentType<{ className?: string }>; tint?: string }) {
  return (
    <div className="rounded-2xl border border-border bg-card/70 p-5 backdrop-blur">
      <div className="flex items-start justify-between">
        <div>
          <p className="text-xs text-muted-foreground">{label}</p>
          <p className={`mt-1 font-display text-3xl font-bold ${tint || ""}`}>{value}</p>
        </div>
        <div className="grid h-9 w-9 place-items-center rounded-lg bg-gradient-brand text-white"><Icon className="h-4 w-4" /></div>
      </div>
    </div>
  );
}

function AddDialog({ open, setOpen, onSubmit, loading }: { open: boolean; setOpen: (b: boolean) => void; onSubmit: (v: FormT) => void; loading: boolean }) {
  const form = useForm<FormT>({
    resolver: zodResolver(schema),
    defaultValues: { company: "", role: "", status: "applied", salary_lpa: "", applied_at: new Date().toISOString().slice(0, 10), notes: "" },
  });
  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button className="bg-gradient-brand text-white"><Plus className="mr-2 h-4 w-4" /> New application</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-md">
        <DialogHeader><DialogTitle>Track a new application</DialogTitle></DialogHeader>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
          <div className="grid grid-cols-2 gap-3">
            <div className="space-y-2"><Label>Company</Label><Input placeholder="Google" {...form.register("company")} /></div>
            <div className="space-y-2"><Label>Role</Label><Input placeholder="SDE Intern" {...form.register("role")} /></div>
          </div>
          <div className="grid grid-cols-2 gap-3">
            <div className="space-y-2"><Label>Status</Label>
              <Select value={form.watch("status")} onValueChange={(v) => form.setValue("status", v as Status)}><SelectTrigger><SelectValue /></SelectTrigger><SelectContent>{STAGES.map((s) => <SelectItem key={s.key} value={s.key}>{s.label}</SelectItem>)}</SelectContent></Select>
            </div>
            <div className="space-y-2"><Label>Salary (LPA)</Label><Input type="number" step="0.1" placeholder="12" {...form.register("salary_lpa")} /></div>
          </div>
          <div className="space-y-2"><Label>Applied on</Label><Input type="date" {...form.register("applied_at")} /></div>
          <div className="space-y-2"><Label>Notes</Label><Textarea rows={3} placeholder="Referral from Ada, HR round scheduled..." {...form.register("notes")} /></div>
          <DialogFooter><Button type="submit" disabled={loading} className="w-full bg-gradient-brand text-white">Add application</Button></DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
