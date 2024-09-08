import { BACKEND_URL } from "@/entrypoints/background/common/constants.ts";
import { decrypt } from "@/entrypoints/background/common/decrypt.ts";
import { getAuthService } from "@/entrypoints/background/auth/auth-service.ts";
import { DashboardRes } from "@/entrypoints/background/clock/types.ts";
import { queryOptions } from "@tanstack/react-query";
import { BG_KEYS } from "@/entrypoints/background/api/query-keys.ts";

async function getDashboard() {
  console.log("getDashboard called!");
  const url = `${BACKEND_URL}/Admin/adm_dashboard/MainDashboard`;
  return fetch(url, {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${await getAuthService().getToken()}`,
    },
  }).then(async (r) => {
    if (!r.ok) {
      console.error(r.statusText, decrypt(await r.text()));
      throw new Error("Failed to fetch dashboard data");
    }
    const data = await r.text();
    return JSON.parse(decrypt(data)) as DashboardRes;
  });
}

export const getDashboardQueryOptions = () =>
  queryOptions({
    queryKey: [BG_KEYS.dashboard],
    queryFn: getDashboard,
    staleTime: 20000,
  });
