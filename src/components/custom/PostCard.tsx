import { Post } from '@/types/Post'
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import React from 'react'
import { Briefcase, Calendar, Info, Megaphone, Zap } from 'lucide-react';
import { format } from 'date-fns';
import { Button } from '../ui/button';
import StatusBadge from './StatusBadge';
import { Link } from 'react-router-dom';

const PostCard = ({ post }: { post: Post }) => {
    const getTypeIcon = (type: string) => {
        switch (type) {
        case "announcement":
            return <Megaphone className="w-5 h-5" />;
        case "advisory":
            return <Info className="w-5 h-5" />;
        case "job-post":
            return <Briefcase className="w-5 h-5" />;
        case "power-rate":
            return <Zap className="w-5 h-5" />;
        default:
            return <Info className="w-5 h-5" />;
        }
    };

    return (
        <Card key={post?.id} className="card-electric">
            <CardHeader>
                <div className="flex items-start justify-between mb-2">
                    <div className="flex items-center gap-2">
                    {getTypeIcon(post?.type)}
                    </div>
                    <StatusBadge title={post?.type} />
                </div>
                <CardTitle className="text-lg line-clamp-2">{post?.title}</CardTitle>
                </CardHeader>
                <CardContent>
                <p className="text-muted-foreground text-sm mb-4 line-clamp-3">
                    {post?.caption}
                </p>
                <div className="flex items-center justify-between">
                    <div className="flex items-center text-xs text-muted-foreground">
                    <Calendar className="w-3 h-3 mr-1" />
                    {format(new Date(post?.created_at), "PP")}
                    </div>
                    <Link to={`${post?.id}`}>
                        <Button variant="outline" size="sm">
                            Read More
                        </Button>
                    </Link>
                </div>
            </CardContent>
        </Card>
    )
}

export default PostCard
