import AdminPage from '@/components/custom/AdminPage';
import React from 'react'
import { useParams } from 'react-router-dom'

const Post = () => {
    const { id } = useParams();

    return (
        <AdminPage title='Post' withBackButton={true}>

        </AdminPage>
    )
}

export default Post
