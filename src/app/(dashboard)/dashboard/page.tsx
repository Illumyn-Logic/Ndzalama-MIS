import { auth } from "@/auth";
import { redirect } from "next/navigation";

const ROLE_DASHBOARDS: Record<string, string> = {
  SUPER_ADMIN: "/admin", ADMIN: "/admin", REGISTRAR: "/admin",
  FINANCE_OFFICER: "/finance", FACILITATOR: "/facilitator",
  ASSESSOR: "/assessor", MODERATOR: "/moderator",
  SME_MENTOR: "/mentor", HOST_EMPLOYER: "/employer",
  LEARNER: "/learner", PROSPECTIVE_LEARNER: "/",
};

export default async function DashboardRouter() {
  const session = await auth();
  if (!session?.user) redirect("/login");
  
  const target = ROLE_DASHBOARDS[session.user.role] || "/";
  redirect(target);
}