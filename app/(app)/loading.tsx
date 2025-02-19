import { Loader } from 'lucide-react'
import React from 'react'

const Loading = () => {
  return (
    <div className='w-full h-full flex items-center justify-center'>
        <Loader className='size-6 animate-spin text-muted-foreground'/>
    </div>
  )
}

export default Loading