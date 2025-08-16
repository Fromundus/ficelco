import { formatDistanceToNow } from 'date-fns'
import { KeyRound, User } from 'lucide-react'
import React from 'react'

const LogComponent = ({ log }) => {
    // console.log(log);

    const data = JSON.parse(log.data);

    return (
        <>
            {log.type === "auth" && 
                <div className='flex items-start p-2 bg-secondary/20 hover:bg-secondary/50 border rounded-lg'>
                    <div className='p-2'>
                        <KeyRound className={`w-4 h-4`} />
                    </div>
                    <div className='flex-1'>
                        <p className='text-sm font-medium'>
                            {log.user?.name} ({log.user?.role}) {log.action === "login" ? "Logged In" : "Logged Out"} from {log.ip_address}
                        </p>
                        <span className="text-xs text-muted-foreground">
                            {formatDistanceToNow(new Date(log.created_at), { addSuffix: true })}
                        </span>
                    </div>
                </div>
            }

            {log.type === "account" && 
                <div className='flex items-start p-2 bg-secondary/20 hover:bg-secondary/50 border rounded-lg'>
                    <div className='p-2'>
                        <User className={`w-4 h-4`} />
                    </div>
                    <div className='flex-1'>
                        {log.action === "create" &&
                        <>
                            {!log.user_id ? 
                            <p className='text-sm font-medium'>
                                New member registration: {data?.name}
                            </p>
                            :
                            <p className='text-sm font-medium'>
                                {log.user?.name} ({log.user?.role}) created a new account: {data?.name}
                            </p>}
                        </>
                        }

                        {log.action === "update" &&
                        <>
                            <p className='text-sm font-medium'>
                                {log.user?.name} ({log.user?.role}) updated account: {data?.name}
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
