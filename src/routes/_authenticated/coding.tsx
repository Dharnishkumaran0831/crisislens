import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger, DialogFooter } from "@/components/ui/dialog";
import { toast } from "sonner";
import { Plus, Code2, Flame, Trophy, Trash2, ExternalLink } from "lucide-react";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { motion, AnimatePresence } from "framer-motion";

export const Route = createFileRoute("/_authenticated/coding")({
  head: () => ({ meta: [{ title: "Coding Tracker — CareerPilot AI" }, { name: "robots", content: "noindex" }] }),
  component: CodingPage,
});

const schema = z.object({
  title: z.string().trim().min(2).max(200),
  platform: z.string().min(1).max(50),
  url: z.string().trim().url().max(500).optional().or(z.literal("")),
  difficulty: z.enum(["Easy", "Medium", "Hard"]),
  topic: z.string().trim().min(1).max(80),
  status: z.enum(["todo", "attempted", "solved", "revisit"]),
});
type FormT = z.infer<typeof schema>;

const TOPICS = ["Arrays", "Strings", "Hashing", "Two Pointers", "Sliding Window", "Stack", "Queue", "Linked List", "Trees", "Graphs", "DP", "Greedy", "Backtracking", "Bit Manipulation", "Math"];
const PLATFORMS = ["LeetCode", "Codeforces", "HackerRank", "GFG", "CodeChef", "AtCoder"];

function CodingPage() {
  const qc = useQueryClient();
  const [open, setOpen] = useState(false);
  const [filter, setFilter] = useState<"all" | "solved" | "attempted" | "todo" | "revisit">("all");

  const { data: problems = [], isLoading } = useQuery({
    queryKey: ["coding_problems"],
    queryFn: async () => {
      const { data, error } = await supabase.from("coding_problems").select("*").order("created_at", { ascending: false });
      if (error) throw error;
      return data;
    },
  });

  const create = useMutation({
    mutationFn: async (v: FormT) => {
      const { data: sess } = await supabase.auth.getUser();
      if (!sess.user) throw new Error("Not signed in");
      const { error } = await supabase.from("coding_problems").insert({
        user_id: sess.user.id,
        title: v.title,
        platform: v.platform,
        url: v.url || null,
        difficulty: v.difficulty,
        topic: v.topic,
        status: v.status,
        solved_at: v.status === "solved" ? new Date().toISOString() : null,
      });
      if (error) throw error;
    },
    onSuccess: () => { qc.invalidateQueries({ queryKey: ["coding_problems"] }); toast.success("Problem added"); setOpen(false); },
    onError: (e: Error) => toast.error(e.message),
  });

  const updateStatus = useMutation({
    mutationFn: async ({ id, status }: { id: string; status: FormT["status"] }) => {
      const { error } = await supabase.from("coding_problems").update({
        status,
        solved_at: status === "solved" ? new Date().toISOString() : null,
      }).eq("id", id);
      if (error) throw error;
    },
    onSuccess: () => qc.invalidateQueries({ queryKey: ["coding_problems"] }),
    onError: (e: Error) => toast.error(e.message),
  });

  const del = useMutation({
    mutationFn: async (id: string) => {
      const { error } = await supabase.from("coding_problems").delete().eq("id", id);
      if (error) throw error;
    },
    onSuccess: () => { qc.invalidateQueries({ queryKey: ["coding_problems"] }); toast.success("Deleted"); },
  });

  const filtered = filter === "all" ? problems : problems.filter((p) => p.status === filter);
  const stats = {
    solved: problems.filter((p) => p.status === "solved").length,
    total: problems.length,
    easy: problems.filter((p) => p.status === "solved" && p.difficulty === "Easy").length,
    medium: problems.filter((p) => p.status === "solved" && p.difficulty === "Medium").length,
    hard: problems.filter((p) => p.status === "solved" && p.difficulty === "Hard").length,
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-wrap items-end justify-between gap-4">
        <div>
          <h1 className="font-display text-3xl font-bold tracking-tight">Coding Tracker</h1>
          <p className="mt-1 text-sm text-muted-foreground">DSA, contests, company problems — one place.</p>
        </div>
        <AddDialog open={open} setOpen={setOpen} onSubmit={(v) => create.mutate(v)} loading={create.isPending} />
      </div>

      <div className="grid gap-4 md:grid-cols-4">
        <Stat label="Solved" value={stats.solved} icon={Trophy} sub={`of ${stats.total} tracked`} />
        <Stat label="Easy" value={stats.easy} icon={Code2} sub="Warm-up wins" tint="text-emerald-400" />
        <Stat label="Medium" value={stats.medium} icon={Code2} sub="Sweet spot" tint="text-amber-400" />
        <Stat label="Hard" value={stats.hard} icon={Flame} sub="Big brain time" tint="text-rose-400" />
      </div>

      <div className="rounded-2xl border border-border bg-card/70 p-5 backdrop-blur">
        <div className="mb-4 flex flex-wrap items-center gap-2">
          {(["all", "todo", "attempted", "solved", "revisit"] as const).map((f) => (
            <button
              key={f}
              onClick={() => setFilter(f)}
              className={`rounded-full border px-3 py-1 text-xs capitalize transition ${filter === f ? "border-primary/50 bg-gradient-brand-soft text-foreground" : "border-border bg-background/40 text-muted-foreground hover:text-foreground"}`}
            >
              {f}
            </button>
          ))}
        </div>

        {isLoading ? (
          <p className="text-sm text-muted-foreground">Loading…</p>
        ) : filtered.length === 0 ? (
          <div className="grid place-items-center gap-3 py-16 text-center">
            <div className="grid h-12 w-12 place-items-center rounded-full bg-gradient-brand text-white"><Code2 className="h-5 w-5" /></div>
            <p className="text-sm text-muted-foreground">No problems yet. Add your first to start tracking.</p>
            <Button onClick={() => setOpen(true)} className="bg-gradient-brand text-white"><Plus className="mr-2 h-4 w-4" /> Add problem</Button>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead className="text-xs uppercase tracking-wide text-muted-foreground">
                <tr className="border-b border-border">
                  <th className="pb-3 text-left">Title</th>
                  <th className="pb-3 text-left">Topic</th>
                  <th className="pb-3 text-left">Difficulty</th>
                  <th className="pb-3 text-left">Platform</th>
                  <th className="pb-3 text-left">Status</th>
                  <th className="pb-3" />
                </tr>
              </thead>
              <tbody>
                <AnimatePresence initial={false}>
                  {filtered.map((p) => (
                    <motion.tr key={p.id} initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="border-b border-border/50 hover:bg-background/40">
                      <td className="py-3">
                        <div className="flex items-center gap-2 font-medium">
                          {p.title}
                          {p.url && (<a href={p.url} target="_blank" rel="noreferrer" className="text-muted-foreground hover:text-foreground"><ExternalLink className="h-3.5 w-3.5" /></a>)}
                        </div>
                      </td>
                      <td className="py-3 text-muted-foreground">{p.topic}</td>
                      <td className="py-3">
                        <span className={`rounded-full px-2 py-0.5 text-xs ${p.difficulty === "Easy" ? "bg-emerald-500/10 text-emerald-400" : p.difficulty === "Hard" ? "bg-rose-500/10 text-rose-400" : "bg-amber-500/10 text-amber-400"}`}>{p.difficulty}</span>
                      </td>
                      <td className="py-3 text-muted-foreground">{p.platform}</td>
                      <td className="py-3">
                        <Select value={p.status} onValueChange={(v) => updateStatus.mutate({ id: p.id, status: v as FormT["status"] })}>
                          <SelectTrigger className="h-8 w-32 bg-background/50"><SelectValue /></SelectTrigger>
                          <SelectContent>
                            <SelectItem value="todo">Todo</SelectItem>
                            <SelectItem value="attempted">Attempted</SelectItem>
                            <SelectItem value="solved">Solved</SelectItem>
                            <SelectItem value="revisit">Revisit</SelectItem>
                          </SelectContent>
                        </Select>
                      </td>
                      <td className="py-3 text-right">
                        <button onClick={() => del.mutate(p.id)} className="text-muted-foreground hover:text-destructive"><Trash2 className="h-4 w-4" /></button>
                      </td>
                    </motion.tr>
                  ))}
                </AnimatePresence>
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}

function Stat({ label, value, icon: Icon, sub, tint }: { label: string; value: number; icon: React.ComponentType<{ className?: string }>; sub: string; tint?: string }) {
  return (
    <div className="rounded-2xl border border-border bg-card/70 p-5 backdrop-blur">
      <div className="flex items-start justify-between">
        <div>
          <p className="text-xs text-muted-foreground">{label}</p>
          <p className={`mt-1 font-display text-3xl font-bold ${tint || ""}`}>{value}</p>
          <p className="mt-1 text-[11px] text-muted-foreground">{sub}</p>
        </div>
        <div className="grid h-9 w-9 place-items-center rounded-lg bg-gradient-brand text-white"><Icon className="h-4 w-4" /></div>
      </div>
    </div>
  );
}

function AddDialog({ open, setOpen, onSubmit, loading }: { open: boolean; setOpen: (b: boolean) => void; onSubmit: (v: FormT) => void; loading: boolean }) {
  const form = useForm<FormT>({
    resolver: zodResolver(schema),
    defaultValues: { title: "", platform: "LeetCode", url: "", difficulty: "Medium", topic: "Arrays", status: "todo" },
  });
  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button className="bg-gradient-brand text-white"><Plus className="mr-2 h-4 w-4" /> Add problem</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-md">
        <DialogHeader><DialogTitle>Add a problem</DialogTitle></DialogHeader>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
          <div className="space-y-2"><Label>Title</Label><Input placeholder="Two Sum" {...form.register("title")} />{form.formState.errors.title && <p className="text-xs text-destructive">{form.formState.errors.title.message}</p>}</div>
          <div className="grid grid-cols-2 gap-3">
            <div className="space-y-2"><Label>Platform</Label>
              <Select value={form.watch("platform")} onValueChange={(v) => form.setValue("platform", v)}><SelectTrigger><SelectValue /></SelectTrigger><SelectContent>{PLATFORMS.map((p) => <SelectItem key={p} value={p}>{p}</SelectItem>)}</SelectContent></Select>
            </div>
            <div className="space-y-2"><Label>Difficulty</Label>
              <Select value={form.watch("difficulty")} onValueChange={(v) => form.setValue("difficulty", v as FormT["difficulty"])}><SelectTrigger><SelectValue /></SelectTrigger><SelectContent><SelectItem value="Easy">Easy</SelectItem><SelectItem value="Medium">Medium</SelectItem><SelectItem value="Hard">Hard</SelectItem></SelectContent></Select>
            </div>
          </div>
          <div className="grid grid-cols-2 gap-3">
            <div className="space-y-2"><Label>Topic</Label>
              <Select value={form.watch("topic")} onValueChange={(v) => form.setValue("topic", v)}><SelectTrigger><SelectValue /></SelectTrigger><SelectContent>{TOPICS.map((t) => <SelectItem key={t} value={t}>{t}</SelectItem>)}</SelectContent></Select>
            </div>
            <div className="space-y-2"><Label>Status</Label>
              <Select value={form.watch("status")} onValueChange={(v) => form.setValue("status", v as FormT["status"])}><SelectTrigger><SelectValue /></SelectTrigger><SelectContent><SelectItem value="todo">Todo</SelectItem><SelectItem value="attempted">Attempted</SelectItem><SelectItem value="solved">Solved</SelectItem><SelectItem value="revisit">Revisit</SelectItem></SelectContent></Select>
            </div>
          </div>
          <div className="space-y-2"><Label>URL (optional)</Label><Input placeholder="https://leetcode.com/..." {...form.register("url")} /></div>
          <DialogFooter>
            <Button type="submit" disabled={loading} className="w-full bg-gradient-brand text-white">Add</Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
