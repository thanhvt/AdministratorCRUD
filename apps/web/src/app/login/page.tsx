import { LoginForm } from '../../components/auth/login-form';
import { Logo } from '../../components/layout/logo';

export default function LoginPage() {
  return (
    <main className="relative flex min-h-screen flex-col items-center justify-center overflow-hidden bg-gray-100 dark:bg-gray-900 p-4">
      <div className="absolute inset-0 bg-gradient-to-br from-primary/10 via-transparent to-secondary/10 -z-10" />
      <div className="absolute top-20 -left-20 w-72 h-72 bg-primary/20 rounded-full filter blur-3xl opacity-70 animate-[blob_7s_infinite]" />
      <div className="absolute bottom-20 -right-20 w-72 h-72 bg-secondary/20 rounded-full filter blur-3xl opacity-70 animate-[blob_7s_infinite_4s]" />
      <div className="w-full max-w-md z-10">
        <div className="flex justify-center mb-6">
          <Logo />
        </div>
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-gray-900 dark:text-gray-100 tracking-tight">
            Welcome Back
          </h1>
          <p className="text-muted-foreground mt-2">Securely access your banking administration panel</p>
        </div>
        <LoginForm />
      </div>
    </main>
  );
}
