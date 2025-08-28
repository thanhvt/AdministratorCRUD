'use client'

import { useRouter } from 'next/navigation'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import {
  Button,
  Input,
  Card,
  CardContent,
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
  Icon,
} from '@banking/ui'
import { useAuthStore } from '@banking/services'

const formSchema = z.object({
  email: z.string().email("Invalid email address."),
  password: z.string().min(1, "Password is required."),
})

export function LoginForm() {
  const { login } = useAuthStore()
  const router = useRouter()

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: 'admin@banking.com',
      password: 'admin123',
    },
  })

  const { isSubmitting } = form.formState

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    try {
      await login(values)
      router.push('/dashboard')
    } catch (err: any) {
      form.setError('root', {
        type: 'manual',
        message: err.message || 'Login failed. Please check your credentials.',
      })
    }
  }

  return (
    <Card variant="glass" className="w-full">
      <CardContent className="p-6">
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Input type="email" placeholder="Email" {...field} />
                  </FormControl>
                  <FormLabel>Email</FormLabel>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Input type="password" placeholder="Password" {...field} />
                  </FormControl>
                  <FormLabel>Password</FormLabel>
                  <FormMessage />
                </FormItem>
              )}
            />

            {form.formState.errors.root && (
              <div className="text-destructive text-sm font-medium text-center">
                {form.formState.errors.root.message}
              </div>
            )}

            <Button type="submit" className="w-full" loading={isSubmitting} variant="premium">
              Sign In
            </Button>
          </form>
        </Form>
      </CardContent>

            <div className="mt-6 flex items-center justify-center">
              <Icon name="Lock" className="h-4 w-4 text-muted-foreground" />
              <p className="ml-2 text-xs text-muted-foreground">Secure SSL Connection</p>
            </div>
    </Card>
  )
}
