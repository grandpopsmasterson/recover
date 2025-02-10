'use client'
import { useEffect, useState } from "react"
import { useParams } from "next/navigation";

export default function NotificationsPage() {
   const params = useParams();
   const [isLoading, setIsLoading] = useState(true);
   const [error, setError] = useState<string | null>(null);

   return (
        <div className="settings--page flex justify-start items-center h-screen">
            Notifications
        </div>
   )
}