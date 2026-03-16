import { apiOk } from "@/lib/api-response";
import { clearAdminSession } from "@/lib/admin-auth";

export async function POST() {
  await clearAdminSession();
  return apiOk({ success: true });
}
