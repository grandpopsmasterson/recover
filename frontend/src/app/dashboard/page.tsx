// app/dashboard/page.tsx
import { redirect } from 'next/navigation'

export default function DashboardRedirect() {
    redirect('/dashboard/ridgeline')
}