import React from 'react'
import PageHeader from '../components/PageHeader'
import BreadCrumbs from '../components/BreadCrumbs';
import NewsCard from '../components/NewsCard';
import axiosClient from '../axios-client';

function Updates() {
    const [posts, setPosts] = React.useState();

    React.useEffect( () => {
        window.scrollTo(0, 0);
    }, []);

    const links = [
        {
            title: "News and Updates",
            href: "/news-and-updates"
        },
    ];

    React.useEffect( () => {
        const fetchUpdates = async () => {
            try {
                const res = await axiosClient.get('/api/posts');
                console.log(res);
                setPosts(res.data.data);
            } catch (err) {
                console.log(err);
            }
        }

        fetchUpdates();
    }, []);

    const renderPosts = posts?.map( (item) => {
        return (
            <NewsCard
                key={item.id}
                link={`/news-and-updates/${item.id}`}
                date={item.created_at}
                title={item.title}
                header={item.header}
                image={`http://localhost:8000/storage/${item.images[0]?.path}`}
                description={item.description}
            />
        )
    });

    return (
        <>
            <BreadCrumbs links={links} />
            <div className='px-4'>
                <PageHeader title={"News and Updates"} />
            </div>
            <div className='flex flex-wrap p-2'>
                {/* <NewsCard
                    link={`/news-and-updates/${1}`}
                    date={"Feb 27, 2025"}
                    title={"POWER INTERUPTION"}
                    image={"https://scontent-mnl1-1.xx.fbcdn.net/v/t39.30808-6/481116263_1097721308824594_8307114459386546464_n.jpg?_nc_cat=111&ccb=1-7&_nc_sid=833d8c&_nc_eui2=AeHwxaC6OmJtXkpDPZmg75pRbayr8AW7JWBtrKvwBbslYD4PfZMTmFYYc3J89-h3qx4rkqy00xMemJQuH-GxbaP8&_nc_ohc=YTrXIA5JU-EQ7kNvgFsr0Fc&_nc_oc=Adgej6BkDIa7uMwzGlCyAK3qryv5FDdiuuOfJNMWQMivLBWOia_jg2rtdX1lq1Vcf4o&_nc_zt=23&_nc_ht=scontent-mnl1-1.xx&_nc_gid=AJS0c52PV4sdJxvsd435MrP&oh=00_AYAhOvCASnImwdlghQAtw1SJsuYunrlWxemnIbtqU8iMAA&oe=67C5EC33"}
                    header={"SCHEDULED POWER INTERRUPTION (Feb 28, 2025)"}
                    description={"Lorem ipsum dolor, sit amet consectetur adipisicing elit. Omnis perferendis hic asperiores quibusdam quidem voluptates doloremque reiciendis nostrum harum. Repudiandae?"} 
                />
                <NewsCard
                    link={`/news-and-updates/${2}`}
                    date={"Feb 1, 2025"}
                    title={"POWER RATES"}
                    image={"https://scontent-mnl1-2.xx.fbcdn.net/v/t39.30808-6/474960355_1077804037482988_8229139178947931146_n.jpg?_nc_cat=101&ccb=1-7&_nc_sid=833d8c&_nc_eui2=AeEel8dsiHF-152CW1k9vQETih4xKcSd8-2KHjEpxJ3z7QvH9ND4KOqFNLqTmrcqFt6Qiu0cKVIHvzhmze_tRZXF&_nc_ohc=flqbjvxcmq8Q7kNvgHkXhvG&_nc_oc=AdjMntNLSyWHgDFqdDBsV2j0VOr968s2fjrDj4-y8rG9a4AVlSB4RyZISEl1917SXg4&_nc_zt=23&_nc_ht=scontent-mnl1-2.xx&_nc_gid=AIddIe87BhfyZ_To-StcJAS&oh=00_AYAsaa5JKm2z0_DHkvi0hJXOKtEVaJmrK1EDFaxHVnLIqA&oe=67C5F8C1"}
                    header={"FEB 2025 EFFECTIVE RATES"}
                    description={"Lorem ipsum dolor, sit amet consectetur adipisicing elit. Omnis perferendis hic asperiores quibusdam quidem voluptates doloremque reiciendis nostrum harum. Repudiandae?"} 
                />
                <NewsCard
                    link={`/news-and-updates/${3}`}
                    date={"Jan 15, 2025"}
                    title={"POWER INTERUPTION"}
                    image={"https://scontent-mnl1-1.xx.fbcdn.net/v/t39.30808-6/480101380_1093282019268523_4495900244837756230_n.jpg?_nc_cat=106&ccb=1-7&_nc_sid=833d8c&_nc_eui2=AeHBIOqCtpT41qT7Pnk_6G6iz7HC8u6vIuXPscLy7q8i5SSP1PCcYvMZvTFHzXJojHuHDkJcz3r5ReSBu0TlvLMu&_nc_ohc=YbA23vdoQ6oQ7kNvgEsPUy9&_nc_oc=AdjXBzS47kY2PQmP4DEphbkt8WfEGHI5ge04jduLeD-qg7wnzZUP5shke_Rw0BkDlTA&_nc_zt=23&_nc_ht=scontent-mnl1-1.xx&_nc_gid=ASm-kGWM83N2Dtw4TvKkPEf&oh=00_AYAgh2EoaPj9Ce8FPaEn3ILWAvS6NH2oGELD1LdRqCd1SA&oe=67C5D3B0"}
                    header={"SCHEDULED POWER INTERRUPTION (Jan 16, 2025)"}
                    description={"Lorem ipsum dolor, sit amet consectetur adipisicing elit. Omnis perferendis hic asperiores quibusdam quidem voluptates doloremque reiciendis nostrum harum. Repudiandae?"} 
                />
                <NewsCard
                    link={`/news-and-updates/${4}`}
                    date={"Jan 1, 2025"}
                    title={"News"}
                    image={"https://scontent-mnl3-1.xx.fbcdn.net/v/t39.30808-6/472670937_1066668538596538_6963175007320233855_n.jpg?stp=cp6_dst-jpg_tt6&_nc_cat=104&ccb=1-7&_nc_sid=833d8c&_nc_eui2=AeE7Ba2Nhs_VVMNS5iGGBs7Hd_BYDQjcb_938FgNCNxv_wODNMqLVX43ii757U9FEgwEtWkR9wT8BexXB83vbdn7&_nc_ohc=KKi9BAPssZUQ7kNvgGbgfJs&_nc_oc=AdiwElseYbmiMvHqbE15kNJ9WeEi-zY4LORtd43tfSQyZK40LGxOA6BD_hUmr4y_H08&_nc_zt=23&_nc_ht=scontent-mnl3-1.xx&_nc_gid=A2Zp1zQmgxI56sIy74259mn&oh=00_AYCAweywI_QdNsOJ_0xuD4r5TGZOpGeVHXxndLJfaZndSA&oe=67C5E7A5"}
                    header={"Reading Date, Due Date, & Disconnection Date (JAN 7 - 21, 2025)"}
                    description={"Lorem ipsum dolor, sit amet consectetur adipisicing elit. Omnis perferendis hic asperiores quibusdam quidem voluptates doloremque reiciendis nostrum harum. Repudiandae?"} 
                />
                <NewsCard
                    link={`/news-and-updates/${5}`}
                    date={"Dec 27, 2024"}
                    title={"POWER INTERUPTION"}
                    image={"https://scontent-mnl1-1.xx.fbcdn.net/v/t39.30808-6/481116263_1097721308824594_8307114459386546464_n.jpg?_nc_cat=111&ccb=1-7&_nc_sid=833d8c&_nc_eui2=AeHwxaC6OmJtXkpDPZmg75pRbayr8AW7JWBtrKvwBbslYD4PfZMTmFYYc3J89-h3qx4rkqy00xMemJQuH-GxbaP8&_nc_ohc=YTrXIA5JU-EQ7kNvgFsr0Fc&_nc_oc=Adgej6BkDIa7uMwzGlCyAK3qryv5FDdiuuOfJNMWQMivLBWOia_jg2rtdX1lq1Vcf4o&_nc_zt=23&_nc_ht=scontent-mnl1-1.xx&_nc_gid=AJS0c52PV4sdJxvsd435MrP&oh=00_AYAhOvCASnImwdlghQAtw1SJsuYunrlWxemnIbtqU8iMAA&oe=67C5EC33"}
                    header={"SCHEDULED POWER INTERRUPTION (Dec 28, 2024)"}
                    description={"Lorem ipsum dolor, sit amet consectetur adipisicing elit. Omnis perferendis hic asperiores quibusdam quidem voluptates doloremque reiciendis nostrum harum. Repudiandae?"} 
                />
                <NewsCard
                    link={`/news-and-updates/${6}`}
                    date={"Dec 1, 2024"}
                    title={"POWER RATES"}
                    image={"https://scontent-mnl1-2.xx.fbcdn.net/v/t39.30808-6/474960355_1077804037482988_8229139178947931146_n.jpg?_nc_cat=101&ccb=1-7&_nc_sid=833d8c&_nc_eui2=AeEel8dsiHF-152CW1k9vQETih4xKcSd8-2KHjEpxJ3z7QvH9ND4KOqFNLqTmrcqFt6Qiu0cKVIHvzhmze_tRZXF&_nc_ohc=flqbjvxcmq8Q7kNvgHkXhvG&_nc_oc=AdjMntNLSyWHgDFqdDBsV2j0VOr968s2fjrDj4-y8rG9a4AVlSB4RyZISEl1917SXg4&_nc_zt=23&_nc_ht=scontent-mnl1-2.xx&_nc_gid=AIddIe87BhfyZ_To-StcJAS&oh=00_AYAsaa5JKm2z0_DHkvi0hJXOKtEVaJmrK1EDFaxHVnLIqA&oe=67C5F8C1"}
                    header={"Dec 2024 EFFECTIVE RATES"}
                    description={"Lorem ipsum dolor, sit amet consectetur adipisicing elit. Omnis perferendis hic asperiores quibusdam quidem voluptates doloremque reiciendis nostrum harum. Repudiandae?"} 
                />
                <NewsCard
                    link={`/news-and-updates/${7}`}
                    date={"Nov 15, 2024"}
                    title={"POWER INTERUPTION"}
                    image={"https://scontent-mnl1-1.xx.fbcdn.net/v/t39.30808-6/480101380_1093282019268523_4495900244837756230_n.jpg?_nc_cat=106&ccb=1-7&_nc_sid=833d8c&_nc_eui2=AeHBIOqCtpT41qT7Pnk_6G6iz7HC8u6vIuXPscLy7q8i5SSP1PCcYvMZvTFHzXJojHuHDkJcz3r5ReSBu0TlvLMu&_nc_ohc=YbA23vdoQ6oQ7kNvgEsPUy9&_nc_oc=AdjXBzS47kY2PQmP4DEphbkt8WfEGHI5ge04jduLeD-qg7wnzZUP5shke_Rw0BkDlTA&_nc_zt=23&_nc_ht=scontent-mnl1-1.xx&_nc_gid=ASm-kGWM83N2Dtw4TvKkPEf&oh=00_AYAgh2EoaPj9Ce8FPaEn3ILWAvS6NH2oGELD1LdRqCd1SA&oe=67C5D3B0"}
                    header={"SCHEDULED POWER INTERRUPTION (Nov 16, 2024)"}
                    description={"Lorem ipsum dolor, sit amet consectetur adipisicing elit. Omnis perferendis hic asperiores quibusdam quidem voluptates doloremque reiciendis nostrum harum. Repudiandae?"} 
                />
                <NewsCard
                    link={`/news-and-updates/${8}`}
                    date={"Nov 1, 2024"}
                    title={"News"}
                    image={"https://scontent-mnl3-1.xx.fbcdn.net/v/t39.30808-6/472670937_1066668538596538_6963175007320233855_n.jpg?stp=cp6_dst-jpg_tt6&_nc_cat=104&ccb=1-7&_nc_sid=833d8c&_nc_eui2=AeE7Ba2Nhs_VVMNS5iGGBs7Hd_BYDQjcb_938FgNCNxv_wODNMqLVX43ii757U9FEgwEtWkR9wT8BexXB83vbdn7&_nc_ohc=KKi9BAPssZUQ7kNvgGbgfJs&_nc_oc=AdiwElseYbmiMvHqbE15kNJ9WeEi-zY4LORtd43tfSQyZK40LGxOA6BD_hUmr4y_H08&_nc_zt=23&_nc_ht=scontent-mnl3-1.xx&_nc_gid=A2Zp1zQmgxI56sIy74259mn&oh=00_AYCAweywI_QdNsOJ_0xuD4r5TGZOpGeVHXxndLJfaZndSA&oe=67C5E7A5"}
                    header={"Reading Date, Due Date, & Disconnection Date (Nov 7 - 21, 2024)"}
                    description={"Lorem ipsum dolor, sit amet consectetur adipisicing elit. Omnis perferendis hic asperiores quibusdam quidem voluptates doloremque reiciendis nostrum harum. Repudiandae?"} 
                /> */}
                {renderPosts}
            </div>
        </>
    )
}

export default Updates