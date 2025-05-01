import Navbar from '@/Components/App/Navbar';
import {  usePage } from '@inertiajs/react';
import { PropsWithChildren, ReactNode, useEffect, useRef, useState } from 'react';

export default function AuthenticatedLayout({
    header,
    children,
}: PropsWithChildren<{ header?: ReactNode }>) {
    const props = usePage().props;
    const user = props.auth.user;

    const [successMessages, setSuccessMessages] = useState<any[]>([]);
    const timeOutRefs = useRef<{[key:number]:ReturnType<typeof setTimeout>}>({});

    const [showingNavigationDropdown, setShowingNavigationDropdown] =
        useState(false);

    useEffect(() => {
        if(props.success.message){
            const newMessage = {
                ...props.success,
                id:props.success.time,
            };

            setSuccessMessages((prevMessages)=> [newMessage, ...prevMessages]);

            const timeoutId = setTimeout(() => {
                setSuccessMessages((prevMessages) => 
                prevMessages.filter((msg) =>msg.id !== newMessage.id)
            );
            delete timeOutRefs.current[newMessage.id];
            }, 5000);
            timeOutRefs.current[newMessage.id] = timeoutId;
        }
    }, [props.success]);

    return (
        <div className="min-h-screen bg-gray-100 dark:bg-gray-900">
           
            <Navbar />
            {
                props.error && (
                    <div className='container mx-auto px-8 mt-8'>
                        <div className="alert alert-error">
                            {props.error}
                        </div>
                        </div>
                )
            }
            
            {successMessages.length > 0 && (
                <div className="toast toast-top z-[1000] mt-16 toast-end">
                    {successMessages.map((msg) => (
                        <div className='alert alert-success' key={msg.id}>
                            <span>{msg.message}</span>
                        </div>
                    ))}
                </div>
            )}

            <main>{children}</main>
        </div>
    );
}
