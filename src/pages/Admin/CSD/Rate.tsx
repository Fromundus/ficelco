import api from '@/api/axios';
import AdminPage from '@/components/custom/AdminPage';
import RateCard from '@/components/RateCard';
import { Button } from '@/components/ui/button';
import QueryLoadingPage from '@/pages/StatusPages/QueryLoadingPage';
import QueryNotFound from '@/pages/StatusPages/QueryNotFound';
import { PowerRate } from '@/types/PowerRate';
import { PenBox, SquarePen } from 'lucide-react';
import React, { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom'

const Rate = () => {
    const { id } = useParams();
    const [loading, setLoading] = React.useState(false);
    const [rate, setRate] = useState<PowerRate>(null);

    const fetchRate = async () => {
        setLoading(true);
        try {
            const res = await api.get(`/api/monthly-rates/${id}`);
            console.log(res);
            setRate(res.data);

            setLoading(false);
        } catch (err) {
            console.log(err);
            setLoading(false);
        }
    }

    useEffect(() => {
        fetchRate();
    }, [id]);

    if (loading) return <QueryLoadingPage />

    if (!loading && !rate) {
        return (
            <QueryNotFound message="Rate Not Found" />   
        );
    }

    return (
        <AdminPage withBackButton={true} title={`Monthly Power Rates for ${rate.month}, ${rate.year}`} description={"View consumer monthly rates."} titleAction={
            <Button>
                <Link className='flex items-center gap-2' to={'edit'}>
                    <PenBox /> Update 
                </Link>
            </Button>
        }>
            <RateCard item={rate} noActionButton={true} />
        </AdminPage>
    )
}

export default Rate
