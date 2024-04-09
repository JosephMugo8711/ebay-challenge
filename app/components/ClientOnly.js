"use client"

// ClientOnly component to conditionally render its children only on the client-side
// This prevents Next.js hydration errors in situations where components rely on client-side features
import { useEffect, useState } from "react";

export default function ClientOnly({ children }) {
  // State to track whether the component is rendered on the client
  const [isClient, setIsClient] = useState(false)
  
  // Set isClient to true on mount (client-side)
  useEffect(() => setIsClient(true), [])

  // Render children only if the component is on the client-side
  return (<> {isClient ? <div>{children}</div> : null} </>);
};
