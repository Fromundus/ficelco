import React from 'react'
import AdminPage from '../../components/Admin/AdminPage'
import { useParams } from 'react-router-dom'
import axiosClient from '../../axios-client';
import LineSkeleton from '../../components/LineSkeleton';

function AdminUpdate() {
    const { id } = useParams();
    const [post, setPost] = React.useState();
    const [loading, setLoading] = React.useState(false);

    React.useEffect( () => {
        const fetchUpdate = async () => {
            setLoading(true);
            try {
                const res = await axiosClient.get(`/api/posts/${id}`);
                console.log(res);
                setPost(res.data.data);
                setLoading(false);
            } catch (err) {
                console.log(err);
                setLoading(false);
            }
        }

        fetchUpdate();
    }, []);

    return (
        <AdminPage title={!loading ? post?.title : "Loading..."}>
            
        </AdminPage>
    )
}

export default AdminUpdate