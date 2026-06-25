import { useEffect, useState } from "react";
import { api } from "./api";

// Resolves the current user's first organization id. A real app would let the
// user switch between workspaces; this keeps the starter simple.
export function useOrg(): number | null {
  const [orgId, setOrgId] = useState<number | null>(null);
  useEffect(() => {
    api.me()
      .then((me) => setOrgId(me.organizations?.[0]?.org_id ?? null))
      .catch(() => {});
  }, []);
  return orgId;
}
