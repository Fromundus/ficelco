import { useAuth } from '@/store/auth'
import { format, formatDistanceToNow } from 'date-fns'
import { KeyRound, User, UserCircle } from 'lucide-react'
import React from 'react'
import { Badge } from '../ui/badge'

const LogComponent = ({ log }) => {
    const { user } = useAuth();

    let u = "";

    if(log.user_id === user.id){
        u = "You";
    } else {
        u = `#${log.user_id} ${log.user?.name} (${log.user?.role})`
    }
    let badgeStyle: string | null = null;
    let variant: "outline" | "default" | "secondary" | "destructive" = "outline";

    if(log.type === "auth"){
        if(log.action === "verify"){
            badgeStyle = "bg-green-500 text-white";
        } else if (log.action === "reset"){
            variant = "default";
        } else if (log.action === "logout"){
            variant = "destructive";
        }
    } else {
        if(log.action === "update"){
            badgeStyle = "bg-blue-500 text-white";
        } else if(log.action === "delete"){
            variant = "destructive";
        }
    }

    return (
        <>
            {/* {log.type === "auth" && 
                <div className='flex items-start p-2 bg-secondary/20 hover:bg-secondary/50 border rounded-lg'>
                    <div className='p-2'>
                        <KeyRound className={`w-4 h-4
                            ${log.action === "verify" && "text-green-500"}    
                            ${log.action === "reset" && "text-primary"}    
                            ${log.action === "logout" && "text-destructive"}    
                        `} />
                    </div>
                    <div className='flex-1'>
                        {(log.action === "login" || log.action === "logout") &&
                            <p className='text-sm font-medium'>
                                {u} {log.description} from {log.ip_address}
                            </p>
                        }

                        {log.action === "verify" &&
                            <p className='text-sm font-medium'>
                                {u} {log.description}
                            </p>
                        }

                        {log.action === "reset" &&
                            <p className='text-sm font-medium'>
                                {u} {log.description}
                            </p>
                        }

                        <span className="text-xs text-muted-foreground">
                            {formatDistanceToNow(new Date(log.created_at), { addSuffix: true })}
                        </span>
                    </div>
                </div>
            }

            {log.type === "account" && 
                <div className='flex items-start p-2 bg-secondary/20 hover:bg-secondary/50 border rounded-lg'>
                    <div className='p-2'>
                        <UserCircle className={`w-4 h-4
                            ${log.action === "update" && "text-blue-500"}    
                            ${log.action === "delete" && "text-destructive"}    
                        `} />
                    </div>
                    <div className='flex-1'>
                        {log.action === "create" &&
                        <>
                            {!log.user_id ? 
                            <p className='text-sm font-medium'>
                                {log.description}
                            </p>
                            :
                            <p className='text-sm font-medium'>
                                {u} {log.description}
                            </p>}
                        </>
                        }

                        {log.action === "update" &&
                        <>
                            <p className='text-sm font-medium'>
                                {u} {log.description}
                            </p>
                        </>
                        }

                        {log.action === "delete" &&
                        <>
                            <p className='text-sm font-medium'>
                                {u} {log.description}
                            </p>
                        </>
                        }

                        <span className="text-xs text-muted-foreground">
                            {formatDistanceToNow(new Date(log.created_at), { addSuffix: true })}
                        </span>
                    </div>
                </div>
            }

            {log.type === "member" && 
                <div className='flex items-start p-2 bg-secondary/20 hover:bg-secondary/50 border rounded-lg'>
                    <div className='p-2'>
                        <User className={`w-4 h-4
                            ${log.action === "update" && "text-blue-500"}    
                            ${log.action === "delete" && "text-destructive"}    
                        `} />
                    </div>
                    <div className='flex-1'>
                        {log.action === "create" &&
                        <>
                            {!log.user_id ? 
                            <p className='text-sm font-medium'>
                                {log.description}
                            </p>
                            :
                            <p className='text-sm font-medium'>
                                {u} {log.description}
                            </p>}
                        </>
                        }

                        {log.action === "update" &&
                        <>
                            <p className='text-sm font-medium'>
                                {u} {log.description}
                            </p>
                        </>
                        }

                        {log.action === "delete" &&
                        <>
                            <p className='text-sm font-medium'>
                                {u} {log.description}
                            </p>
                        </>
                        }

                        <span className="text-xs text-muted-foreground">
                            {formatDistanceToNow(new Date(log.created_at), { addSuffix: true })}
                        </span>
                    </div>
                </div>
            } */}

            <div className='bg-secondary/20 hover:bg-secondary/50 border rounded-lg p-4 flex flex-col gap-2'>
                <div className='flex items-center gap-2'>
                    <span className='capitalize font-semibold'>{log?.type}</span> <Badge className={`${badgeStyle}`} variant={variant}>{log?.action}</Badge>
                </div>
                <div className='text-sm text-muted-foreground'>
                    {log?.description && <p>{log?.description}</p>}
                </div>
                <div className='text-xs text-muted-foreground flex gap-2 flex-wrap'>
                    {log?.user?.name && <p>User name: {log?.user?.name}</p>}
                    {log?.user?.email && <p>User email: {log?.user?.email}</p>}
                    {log?.ip_address && <p>IP: {log?.ip_address}</p>}
                    <p>Date: {format(new Date(log?.created_at), "PP - p")}</p>
                </div>
            </div>
        </>
    )
}

export default LogComponent
