import { useRouter } from "next/router";
import { useEffect } from "react";
import { ComponentType } from "react";

// Use ComponentType to type the WrappedComponent
const withAuth = (WrappedComponent: ComponentType<any>) => {
  const Wrapper = (props: React.ComponentProps<typeof WrappedComponent>) => {
    const router = useRouter();
    const isAuthenticated = false; // Replace this with your actual authentication logic

    useEffect(() => {
      if (!isAuthenticated) {
        // If user is not authenticated, redirect to login
        router.push("/login");
      }
    }, [isAuthenticated, router]);

    if (!isAuthenticated) {
      // Show a loading spinner or return null while redirecting
      return <div>Loading...</div>;
    }

    return <WrappedComponent {...props} />;
  };

  return Wrapper;
};

export default withAuth;
