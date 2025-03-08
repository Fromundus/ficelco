import React from 'react'
import PageHeader from '../components/PageHeader';
import InfoCard from '../components/InfoCard';
import BreadCrumbs from '../components/BreadCrumbs';
import logo from "../assets/ficelco-logo.png";

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
                    image={"https://scontent-mnl1-1.xx.fbcdn.net/v/t39.30808-6/481116263_1097721308824594_8307114459386546464_n.jpg?_nc_cat=111&ccb=1-7&_nc_sid=833d8c&_nc_eui2=AeHwxaC6OmJtXkpDPZmg75pRbayr8AW7JWBtrKvwBbslYD4PfZMTmFYYc3J89-h3qx4rkqy00xMemJQuH-GxbaP8&_nc_ohc=iWcuCrWd-kEQ7kNvgEjRj6R&_nc_oc=Adiijyygz01D_FI5H4MrxKjnQBUAXzlg6Ph3fySMw5yCK61gNjM1IdWJyKslL6Iq82U&_nc_zt=23&_nc_ht=scontent-mnl1-1.xx&_nc_gid=AkkdSoNqS33bEKS323jSkWj&oh=00_AYHbXtf9vIqxIwSpUN2_Ctfe4gSXzpctD0e8XiGpH2BNrQ&oe=67D15933"}
                    header={"Cooperative Profile"}
                    description={"Lorem ipsum dolor, sit amet consectetur adipisicing elit. Omnis perferendis hic asperiores quibusdam quidem voluptates doloremque reiciendis nostrum harum. Repudiandae?"} 
                />
                <InfoCard
                    link={"/about/history"}
                    title={"FICELCO"}
                    image={"https://scontent-mnl1-1.xx.fbcdn.net/v/t39.30808-6/480101380_1093282019268523_4495900244837756230_n.jpg?_nc_cat=106&ccb=1-7&_nc_sid=833d8c&_nc_eui2=AeHBIOqCtpT41qT7Pnk_6G6iz7HC8u6vIuXPscLy7q8i5SSP1PCcYvMZvTFHzXJojHuHDkJcz3r5ReSBu0TlvLMu&_nc_ohc=Kd6-3L21LckQ7kNvgHKgKAh&_nc_oc=AdgiaFmtDMuJASUQ8qrVJHUZuwxSh6xe6ps--J9WO8HtQvqhRWwGrSx1e9AQ-WXn9E4&_nc_zt=23&_nc_ht=scontent-mnl1-1.xx&_nc_gid=AcmjuVhrOWzcD58ajTlNKcU&oh=00_AYEmVvFGUrIA3w4XW4SRSfT5PoXB23eYNqWzIwIn8VARSQ&oe=67D178F0"}
                    header={"History"}
                    description={"Lorem ipsum dolor, sit amet consectetur adipisicing elit. Omnis perferendis hic asperiores quibusdam quidem voluptates doloremque reiciendis nostrum harum. Repudiandae?"} 
                />
                <InfoCard
                    link={"/about/vision-mission-goal"}
                    title={"FICELCO"}
                    image={"https://scontent-mnl1-1.xx.fbcdn.net/v/t39.30808-6/480477374_1093488645914527_8716547792221860845_n.jpg?_nc_cat=109&ccb=1-7&_nc_sid=833d8c&_nc_eui2=AeGNzQs9xlJ3lLc-puLH7uKrVEz5HTFdY2pUTPkdMV1jagir6H51hYQFB20v5HqYSdmCYKANC470EKPf1oH9QaZc&_nc_ohc=FcK4t_EZUjAQ7kNvgESU1tJ&_nc_oc=AditjWOTIBcTQMx5Bf1NXjYJF6ie3BUR4doaL6BkO10-q0cUmc7QGKHNy8ujq0gMhK8&_nc_zt=23&_nc_ht=scontent-mnl1-1.xx&_nc_gid=AGhwiuSay2eFdk4_F1EzUcF&oh=00_AYGnNVASRARzFPYHppjTY6MxjG8LEYcx27bBMG_RnTXKiw&oe=67D16BED"}
                    header={"Vision, Mission, Goal"}
                    description={"Lorem ipsum dolor, sit amet consectetur adipisicing elit. Omnis perferendis hic asperiores quibusdam quidem voluptates doloremque reiciendis nostrum harum. Repudiandae?"} 
                />
                <InfoCard
                    link={"/about/board-of-directors"}
                    title={"FICELCO"}
                    image={"https://scontent-mnl3-2.xx.fbcdn.net/v/t39.30808-6/475571153_1090312836232108_9138174131860251742_n.jpg?stp=cp6_dst-jpg_tt6&_nc_cat=107&ccb=1-7&_nc_sid=833d8c&_nc_eui2=AeFiiMjpQuxieB6R5RCNKeqMfnTnwXkdfEl-dOfBeR18Se_sQkjV81dWv3Qcg-0l90daZYdbRfdnlLaKPER5bVlx&_nc_ohc=_G-cEZmkUlkQ7kNvgFtzq2T&_nc_oc=AdgsSYNcI03AN8smbLGS27JtzXBOPMOKq2JHH3OcxO7NWhXVzBdcJN4FguHz47OIeoQ&_nc_zt=23&_nc_ht=scontent-mnl3-2.xx&_nc_gid=A0B_gMgXylDQgUH9qcj9g93&oh=00_AYFAjL5Je0eJ_q7bLyrEMgIKiA4ygSgQwJLiTNL_7xu1Qw&oe=67D16165"}
                    header={"Board of Directors"}
                    description={"Lorem ipsum dolor, sit amet consectetur adipisicing elit. Omnis perferendis hic asperiores quibusdam quidem voluptates doloremque reiciendis nostrum harum. Repudiandae?"} 
                />
                <InfoCard
                    link={"/about/management-team"}
                    title={"FICELCO"}
                    image={"https://scontent-mnl3-1.xx.fbcdn.net/v/t39.30808-6/475094905_1078556047407787_5556244223272618613_n.jpg?_nc_cat=104&ccb=1-7&_nc_sid=127cfc&_nc_eui2=AeFM2k-tDjQc-4kfm52KKfCle8tSlMbLKsd7y1KUxssqxwfFNEMjgrtKqIcxCJDLPJUJE1lpfEif_XGTwEe-388B&_nc_ohc=Lmnqc1jZVhkQ7kNvgFr0-Tq&_nc_oc=AdjHj4tI8dD-4GYHusgQQnRFNex9pAUzZEM63HJdohKSiBPbi-WuLl9JiaKOpVat4nk&_nc_zt=23&_nc_ht=scontent-mnl3-1.xx&_nc_gid=AGRLMWoYgH_l4zEbRXb3pFG&oh=00_AYGz4iDrrcJWbRi7haJ_qC_PUA6QJusxJGAMEUMMG-f2Xg&oe=67D15FEB"}
                    header={"Management Team"}
                    description={"Lorem ipsum dolor, sit amet consectetur adipisicing elit. Omnis perferendis hic asperiores quibusdam quidem voluptates doloremque reiciendis nostrum harum. Repudiandae?"} 
                />
                
                <InfoCard
                    link={"/about/feuc"}
                    title={"FICELCO"}
                    image={"https://scontent-mnl1-2.xx.fbcdn.net/v/t39.30808-6/480607007_1094625202467538_2594723332753973170_n.jpg?_nc_cat=105&ccb=1-7&_nc_sid=127cfc&_nc_eui2=AeEpfp2GSmhXqqTZymv6Xaq6RkrE71uqkHJGSsTvW6qQcpV0zYJjpYICHeUe9MUx4t4THzNn8e6JWOopavoBCjYv&_nc_ohc=fDSSA9fYF1kQ7kNvgG0fGy6&_nc_oc=Adj3DEiEF_etwDSBVFiOOJLpmmK2sCmGkoxWIklu4QLi7zWBlJ77GS_eg9w4_KQDg9Q&_nc_zt=23&_nc_ht=scontent-mnl1-2.xx&_nc_gid=AA0RFWrlSZfpCNe8GQPfqCo&oh=00_AYH4dik8lTvUbilovWCg6kp12h3s9Ka5lmCiy6WSGQOCpw&oe=67D17CB1"}
                    header={"FEUC"}
                    description={"Lorem ipsum dolor, sit amet consectetur adipisicing elit. Omnis perferendis hic asperiores quibusdam quidem voluptates doloremque reiciendis nostrum harum. Repudiandae?"} 
                />
                <InfoCard
                    link={"/about/awards"}
                    title={"FICELCO"}
                    image={logo}
                    header={"Awards"}
                    description={"Lorem ipsum dolor, sit amet consectetur adipisicing elit. Omnis perferendis hic asperiores quibusdam quidem voluptates doloremque reiciendis nostrum harum. Repudiandae?"} 
                />
            </div>
        </>
    )
}

export default About