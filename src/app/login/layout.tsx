import { GoogleOAuthProvider } from "@react-oauth/google";


export default function LoginLayout({ children }: { children: React.ReactNode }) {
  return (
    <GoogleOAuthProvider clientId={process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID ?? ""}>
      <div className="flex min-h-screen items-center justify-center bg-zinc-50 ">
        {children}
      </div>
    </GoogleOAuthProvider>
  );
}