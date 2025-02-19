"use client"
import { PlaceholdersAndVanishInput } from '@/components/ui/placeholders-and-vanish-input';
import { useStreamVideoClient } from '@stream-io/video-react-sdk';
import { useRouter } from 'next/navigation';
import React, { useState } from 'react'
import { toast } from 'sonner';

const Page = () => {
    const router = useRouter()
    const [url, setUrl] = useState<string>("")
    // const [isLoading, setIsLoading] = useState<boolean>(false)
    const client = useStreamVideoClient()
    const placeholders = [
        "What's the first rule of Fight Club?",
        "Who is Tyler Durden?",
        "Where is Andrew Laeddis Hiding?",
        "Write a Javascript method to reverse a string",
        "How to assemble your own PC?",
    ];
    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setUrl(e.target.value);
    };
    const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if(!client) return
        const roomName = url.split("/").pop()
        if(!roomName){
            toast.error("Invalid Input")
            return
        }
        try {
            const {calls} = await client.queryCalls({
                filter_conditions: {
                    id: roomName
                }
            })
            if(calls.length > 0){
                router.push(`${url}`)
            }else{
                toast.error("Meeting not found")
            }
        } catch (error) {
            console.error(error)
            toast.error("Meeting not found")
        }
    };
    return (
        <main className='w-full h-full flex flex-col items-center p-4'>
            <h1 className='text-4xl md:text-7xl font-bold max-w-7xl'>
                Join meeting
            </h1>
            <p className='mt-5 max-w-lg text-center'>
                Join a meeting to participate in live discussion and collaboration
            </p>
            <div className='mt-20 md:mt-40 w-full'>
                <PlaceholdersAndVanishInput
                    placeholders={placeholders}
                    onChange={handleChange}
                    onSubmit={onSubmit}
                />
            </div>
        </main>
    )
}

export default Page