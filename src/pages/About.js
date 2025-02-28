import React from 'react'
import PageHeader from '../components/PageHeader';
import InfoCard from '../components/InfoCard';
import BreadCrumbs from '../components/BreadCrumbs';

function About() {
    React.useEffect( () => {
        window.scrollTo(0, 0);
    }, []);

    const links = [
        {
            title: "About",
            href: "/about"
        }
    ];

    return (
        <>
            <BreadCrumbs links={links} />
            <div className='px-4'>
                <PageHeader title={"About Us"} />
            </div>
            <div className='flex flex-wrap p-2'>
                <InfoCard
                    link={"/about/cooperative-profile"}
                    title={"FICELCO"}
                    image={"https://scontent-mnl1-1.xx.fbcdn.net/v/t39.30808-6/481116263_1097721308824594_8307114459386546464_n.jpg?_nc_cat=111&ccb=1-7&_nc_sid=833d8c&_nc_eui2=AeHwxaC6OmJtXkpDPZmg75pRbayr8AW7JWBtrKvwBbslYD4PfZMTmFYYc3J89-h3qx4rkqy00xMemJQuH-GxbaP8&_nc_ohc=YTrXIA5JU-EQ7kNvgFsr0Fc&_nc_oc=Adgej6BkDIa7uMwzGlCyAK3qryv5FDdiuuOfJNMWQMivLBWOia_jg2rtdX1lq1Vcf4o&_nc_zt=23&_nc_ht=scontent-mnl1-1.xx&_nc_gid=AJS0c52PV4sdJxvsd435MrP&oh=00_AYAhOvCASnImwdlghQAtw1SJsuYunrlWxemnIbtqU8iMAA&oe=67C5EC33"}
                    header={"Cooperative Profile"}
                    description={"Lorem ipsum dolor, sit amet consectetur adipisicing elit. Omnis perferendis hic asperiores quibusdam quidem voluptates doloremque reiciendis nostrum harum. Repudiandae?"} 
                />
                <InfoCard
                    link={"/about/history"}
                    title={"FICELCO"}
                    image={"https://scontent-mnl1-2.xx.fbcdn.net/v/t39.30808-6/474960355_1077804037482988_8229139178947931146_n.jpg?_nc_cat=101&ccb=1-7&_nc_sid=833d8c&_nc_eui2=AeEel8dsiHF-152CW1k9vQETih4xKcSd8-2KHjEpxJ3z7QvH9ND4KOqFNLqTmrcqFt6Qiu0cKVIHvzhmze_tRZXF&_nc_ohc=flqbjvxcmq8Q7kNvgHkXhvG&_nc_oc=AdjMntNLSyWHgDFqdDBsV2j0VOr968s2fjrDj4-y8rG9a4AVlSB4RyZISEl1917SXg4&_nc_zt=23&_nc_ht=scontent-mnl1-2.xx&_nc_gid=AIddIe87BhfyZ_To-StcJAS&oh=00_AYAsaa5JKm2z0_DHkvi0hJXOKtEVaJmrK1EDFaxHVnLIqA&oe=67C5F8C1"}
                    header={"History"}
                    description={"Lorem ipsum dolor, sit amet consectetur adipisicing elit. Omnis perferendis hic asperiores quibusdam quidem voluptates doloremque reiciendis nostrum harum. Repudiandae?"} 
                />
                <InfoCard
                    link={"/about/vision-mission-goal"}
                    title={"FICELCO"}
                    image={"https://scontent-mnl1-1.xx.fbcdn.net/v/t39.30808-6/480101380_1093282019268523_4495900244837756230_n.jpg?_nc_cat=106&ccb=1-7&_nc_sid=833d8c&_nc_eui2=AeHBIOqCtpT41qT7Pnk_6G6iz7HC8u6vIuXPscLy7q8i5SSP1PCcYvMZvTFHzXJojHuHDkJcz3r5ReSBu0TlvLMu&_nc_ohc=YbA23vdoQ6oQ7kNvgEsPUy9&_nc_oc=AdjXBzS47kY2PQmP4DEphbkt8WfEGHI5ge04jduLeD-qg7wnzZUP5shke_Rw0BkDlTA&_nc_zt=23&_nc_ht=scontent-mnl1-1.xx&_nc_gid=ASm-kGWM83N2Dtw4TvKkPEf&oh=00_AYAgh2EoaPj9Ce8FPaEn3ILWAvS6NH2oGELD1LdRqCd1SA&oe=67C5D3B0"}
                    header={"Vision, Mission, Goal"}
                    description={"Lorem ipsum dolor, sit amet consectetur adipisicing elit. Omnis perferendis hic asperiores quibusdam quidem voluptates doloremque reiciendis nostrum harum. Repudiandae?"} 
                />
                <InfoCard
                    link={"/about/board-of-directors"}
                    title={"FICELCO"}
                    image={"https://scontent-mnl3-1.xx.fbcdn.net/v/t39.30808-6/472670937_1066668538596538_6963175007320233855_n.jpg?stp=cp6_dst-jpg_tt6&_nc_cat=104&ccb=1-7&_nc_sid=833d8c&_nc_eui2=AeE7Ba2Nhs_VVMNS5iGGBs7Hd_BYDQjcb_938FgNCNxv_wODNMqLVX43ii757U9FEgwEtWkR9wT8BexXB83vbdn7&_nc_ohc=KKi9BAPssZUQ7kNvgGbgfJs&_nc_oc=AdiwElseYbmiMvHqbE15kNJ9WeEi-zY4LORtd43tfSQyZK40LGxOA6BD_hUmr4y_H08&_nc_zt=23&_nc_ht=scontent-mnl3-1.xx&_nc_gid=A2Zp1zQmgxI56sIy74259mn&oh=00_AYCAweywI_QdNsOJ_0xuD4r5TGZOpGeVHXxndLJfaZndSA&oe=67C5E7A5"}
                    header={"Board of Directors"}
                    description={"Lorem ipsum dolor, sit amet consectetur adipisicing elit. Omnis perferendis hic asperiores quibusdam quidem voluptates doloremque reiciendis nostrum harum. Repudiandae?"} 
                />
                <InfoCard
                    link={"/about/management-team"}
                    title={"FICELCO"}
                    image={"https://scontent-mnl1-2.xx.fbcdn.net/v/t39.30808-6/475094905_1078556047407787_5556244223272618613_n.jpg?_nc_cat=104&ccb=1-7&_nc_sid=127cfc&_nc_eui2=AeFM2k-tDjQc-4kfm52KKfCle8tSlMbLKsd7y1KUxssqxwfFNEMjgrtKqIcxCJDLPJUJE1lpfEif_XGTwEe-388B&_nc_ohc=EQ-Q69yutqsQ7kNvgEq1wjq&_nc_oc=AdiUtzMR8IZK0hp9L_vdLjrdhS3-ZTaPKa2m4gz34fO0MTVsKdD18ROldaduhUF8grg&_nc_zt=23&_nc_ht=scontent-mnl1-2.xx&_nc_gid=AvtOHCnJD_uu9jmY0n6o_Mc&oh=00_AYBKUc8dybcu_GhyZ9llji9l47xHWzPReXOhtTo2BLZ1Bg&oe=67C5F2EB"}
                    header={"Management Team"}
                    description={"Lorem ipsum dolor, sit amet consectetur adipisicing elit. Omnis perferendis hic asperiores quibusdam quidem voluptates doloremque reiciendis nostrum harum. Repudiandae?"} 
                />
                <InfoCard
                    link={"/about/feuc"}
                    title={"FICELCO"}
                    image={"https://scontent-mnl1-2.xx.fbcdn.net/v/t39.30808-6/480607007_1094625202467538_2594723332753973170_n.jpg?_nc_cat=105&ccb=1-7&_nc_sid=127cfc&_nc_eui2=AeEpfp2GSmhXqqTZymv6Xaq6RkrE71uqkHJGSsTvW6qQcpV0zYJjpYICHeUe9MUx4t4THzNn8e6JWOopavoBCjYv&_nc_ohc=ddq8w-78p3MQ7kNvgHiw0lV&_nc_oc=Adgtt-glFbZlZiEbz4HnJu5UrHpUZlllKW4_-zfF6hXb4IFPDX8HMMksyYGIvU_4p1g&_nc_zt=23&_nc_ht=scontent-mnl1-2.xx&_nc_gid=AdSwHUTUCu5ybIJgcYn2KaX&oh=00_AYDUzzyc-qZfo5kdVcPdeUJR1QkBClBrBiXwQBWB_KS4Ig&oe=67C5D771"}
                    header={"FEUC"}
                    description={"Lorem ipsum dolor, sit amet consectetur adipisicing elit. Omnis perferendis hic asperiores quibusdam quidem voluptates doloremque reiciendis nostrum harum. Repudiandae?"} 
                />
                <InfoCard
                    link={"/about/awards"}
                    title={"FICELCO"}
                    image={"https://scontent-mnl1-2.xx.fbcdn.net/v/t39.30808-6/480607007_1094625202467538_2594723332753973170_n.jpg?_nc_cat=105&ccb=1-7&_nc_sid=127cfc&_nc_eui2=AeEpfp2GSmhXqqTZymv6Xaq6RkrE71uqkHJGSsTvW6qQcpV0zYJjpYICHeUe9MUx4t4THzNn8e6JWOopavoBCjYv&_nc_ohc=ddq8w-78p3MQ7kNvgHiw0lV&_nc_oc=Adgtt-glFbZlZiEbz4HnJu5UrHpUZlllKW4_-zfF6hXb4IFPDX8HMMksyYGIvU_4p1g&_nc_zt=23&_nc_ht=scontent-mnl1-2.xx&_nc_gid=AdSwHUTUCu5ybIJgcYn2KaX&oh=00_AYDUzzyc-qZfo5kdVcPdeUJR1QkBClBrBiXwQBWB_KS4Ig&oe=67C5D771"}
                    header={"Awards"}
                    description={"Lorem ipsum dolor, sit amet consectetur adipisicing elit. Omnis perferendis hic asperiores quibusdam quidem voluptates doloremque reiciendis nostrum harum. Repudiandae?"} 
                />
            </div>
        </>
    )
}

export default About