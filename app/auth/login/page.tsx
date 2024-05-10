'use client';
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { useFormState } from 'react-dom';
import login from './login';

export default function Login() {
  const [state, formAction] = useFormState(login, { error: "" });
  return (
   <form action={formAction}>
    <Label  htmlFor="email">Email</Label>
    <Input type="email" id="email" name="email" />
    <Label  htmlFor="password">Password</Label>
    <Input type="password" id="password" name="password" />
    <Button type="submit">Login</Button>
   </form>
  )
}
