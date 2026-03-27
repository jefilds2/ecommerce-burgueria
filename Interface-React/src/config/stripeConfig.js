import { loadStripe } from "@stripe/stripe-js";

const stripePromise = loadStripe('pk_test_51T9mT2ItSqhHNCHDnsJkJzoDu6K65CVxT3utsJGGw7gbfNC3GRAGqS80BZKOYJ7SmLME3XeS7zjIVucB0RIsL4JS00pB55KplK');

export default stripePromise;