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

  setIsLoading(false);
  toast({
    title: "Email Sent",
    description: "Check your inbox for a verification email.",
  });
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
          title: "Email Sent",
          description: `Check your inbox for a verification email. {billingPortal.url}`,
        });
        setIsLoading(false);

        // if (billingPortal.success) window.location.href = billingPortal.url;
      }}
    >
      Subscribe now
    </Button>
  );
}
