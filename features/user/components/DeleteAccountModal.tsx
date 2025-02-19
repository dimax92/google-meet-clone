import React, { useState } from 'react'
import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
    AlertDialogTrigger,
} from "@/components/ui/alert-dialog"
import { toast } from 'sonner';
import { deleteAccount } from '../actions';
import logout from '@/lib/logout';
import { useRouter } from 'next/navigation';


type Props = {
    open: boolean;
    setOpen: (open: boolean) => void
}

const DeleteAccountModal = ({ open, setOpen }: Props) => {
    const [isPending, setIsPending] = useState<boolean>(false)
    const router = useRouter()

    const onClick = async () => {
try {
    setIsPending(true)
    router.refresh()
    await deleteAccount()
    toast.success("Your account has been deleted")
    await logout()
} catch (error) {
    toast.error("An error occured. Please try again"+ error)
} finally {
    setIsPending(false)
}
    }
    return (
        <AlertDialog open={open} onOpenChange={setOpen}>
            <AlertDialogTrigger>Open</AlertDialogTrigger>
            <AlertDialogContent>
                <AlertDialogHeader>
                    <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
                    <AlertDialogDescription>
                        This action cannot be undone. This will permanently delete your account
                        and remove your data from our servers.
                    </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                    <AlertDialogCancel disabled={isPending}>Cancel</AlertDialogCancel>
                    <AlertDialogAction 
                    disabled={isPending}
                    onClick={onClick}
                    className='bg-destructive text-destructive-foreground hover:bg-destructive/80 hover:text-destructive-foreground'
                    >Continue</AlertDialogAction>
                </AlertDialogFooter>
            </AlertDialogContent>
        </AlertDialog>

    )
}

export default DeleteAccountModal