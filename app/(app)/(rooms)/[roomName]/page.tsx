"use client"
import Loading from '@/features/room/components/Loading'
import Unauthaurized from '@/features/room/components/Unauthaurized'
import { useGetCall } from '@/features/room/hooks/use-get-call'
import { BackgroundFiltersProvider, StreamCall, StreamTheme } from '@stream-io/video-react-sdk'
import React, { useState } from 'react'
import Prejoin from '@/features/room/components/Prejoin'
import { images } from '@/features/room/lib/utils'
import Room from '@/features/room/components/Room'

interface Props {
    params: Promise<{
        roomName: string
    }>
}

const Page = ({params}: Props) => {
    const {roomName} = React.use(params)
    const {isLoading, call} = useGetCall({roomName: roomName})
    const [isSetupComplete, setIsSetupComplete] = useState<boolean>(false)

    if(isLoading) return <Loading title={"Setting up your room"} />
    if(!call) return <Unauthaurized />
  return (
    <StreamCall call={call}>
        <StreamTheme className='w-full h-full'>
            {
                !isSetupComplete ? (
                    <Prejoin setIsSetupComplete={setIsSetupComplete}/>
                ):(
                    <BackgroundFiltersProvider
                    backgroundBlurLevel={undefined}
                    backgroundImages={images}
                    >
                        <Room />
                    </BackgroundFiltersProvider>
                )
            }
        </StreamTheme>
    </StreamCall>
  )
}

export default Page