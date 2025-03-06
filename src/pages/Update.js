import React from 'react'
import { useParams } from 'react-router-dom';
import BreadCrumbs from '../components/BreadCrumbs';
import PageHeader from '../components/PageHeader';
import axiosClient from '../axios-client';
import UpdateDetails from '../components/UpdateDetails';

function Update() {
    React.useEffect( () => {
        window.scrollTo(0, 0);
    }, []);

    const { id } = useParams();
    const [post, setPost] = React.useState();
    const [loading, setLoading] = React.useState(false);

    React.useEffect( () => {
        const fetchUpdate = async () => {
            setLoading(true);
            try {
                const res = await axiosClient.get(`/api/posts-public/${id}`);
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

    const links = [
        {
            title: "News and Updates",
            href: "/news-and-updates"
        },
        {
            title: `${id}`,
            href: `/news-and-updates/${id}`
        },
    ];

    return (
        <>
            <BreadCrumbs links={links} />
            <div className='px-4 flex'>
                {/* <PageHeader title={!loading ? post?.header : "Loading..."} /> */}
                <UpdateDetails post={post} />
            </div>  
        </>
    )
}

export default Update