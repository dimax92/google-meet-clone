"use client"
import React from 'react'
import {
    StreamCall,
    StreamVideo,
    StreamVideoClient,
    User,
} from "@stream-io/video-react-sdk";
import useCurrentUser from '@/hooks/use-current-user';
import { redirect } from 'next/navigation';
import { useRoom } from '../hooks/use-room';

interface Props {
    children: React.ReactNode;
    user: {
        id: string;
        name: string;
        image: string;
    }
}


const RoomProvider = ({ children, user }: Props) => {
    const { client } = useRoom({
        id: user.id,
        name: user.name,
        image: user.image
    })

    if(!client) return null
    return (
        <StreamVideo client={client}>
            {children}
        </StreamVideo>
    )
}

export default RoomProvider