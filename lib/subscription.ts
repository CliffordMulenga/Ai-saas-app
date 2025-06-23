import { auth } from "@clerk/nextjs/server";
import prismadb from "@/lib/prismadb";

const DAY_IN_MS = 86_400_000;

export const checkSubscription = async () => {
  const session = auth(); // no need for await here
  const userId = session.userId;

  if (!userId) {
    return false;
  }

  const userSubscription = await prismadb.userSubscription.findUnique({
    where: {
      userId: userId,
    },
    select: {
      stripeSubscriptionId: true,
      stripeCurrentPeriodEnd: true,
      stripeCustomerId: true,
      stripePriceId: true,
    },
  });

  if (
    !userSubscription ||
    !userSubscription.stripePriceId ||
    !userSubscription.stripeCurrentPeriodEnd
  ) {
    return false;
  }

  const isValid =
    userSubscription.stripeCurrentPeriodEnd.getTime() + DAY_IN_MS >
    Date.now();

  return !!isValid;
};
