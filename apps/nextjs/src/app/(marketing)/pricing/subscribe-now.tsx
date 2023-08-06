"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useSession } from "@clerk/nextjs";

import { Button } from "@acme/ui/button";
import { useToast } from "@acme/ui/use-toast";

import { api } from "~/trpc/client";

export function SubscribeNow(props: { planId: string }) {
  const { toast } = useToast();
  const [isLoading, setIsLoading] = useState(false);

  const router = useRouter();
  const session = useSession();

  return (
    <Button
      disabled={isLoading}
      onClick={async () => {
        if (!session.isSignedIn) router.push("/signin");

        const billingPortal = await api.stripe.createSession.mutate({
          planId: props.planId,
        });
        setIsLoading(true);
        toast({
          title: "Awaiting...",
          description: `Subscribe now still in development. (We need to change payment system from stripe to others)`,
        });
        setIsLoading(false);

        // if (billingPortal.success) window.location.href = billingPortal.url;
      }}
    >
      Subscribe now
    </Button>
  );
}
