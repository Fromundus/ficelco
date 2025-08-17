import { useAuth } from '@/store/auth'
import { formatDistanceToNow } from 'date-fns'
import { KeyRound, User, UserCircle } from 'lucide-react'
import React from 'react'

const LogComponent = ({ log }) => {
    const { user } = useAuth();

    let u = "";

    if(log.user_id === user.id){
        u = "You";
    } else {
        u = `#${log.user_id} ${log.user?.name} (${log.user?.role})`
    }
    // console.log(log);
    return (
        <>
            {log.type === "auth" && 
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
            }
        </>
    )
}

export default LogComponent
