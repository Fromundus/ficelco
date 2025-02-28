import Lottie from 'lottie-react'
import React from 'react'
import { Link } from 'react-router-dom'
import lightningAnimation from "../assets/animations/lightning.json";
import bg from "../assets/ficelco-hero.jpg"
import { motion } from 'framer-motion';
import PowerRateCard from '../components/PowerRateCard';
import InfoCard from '../components/InfoCard';
import NewsCard from '../components/NewsCard';

function Landing() {
    const [hover, setHover] = React.useState(false);

    React.useEffect( () => {
        window.scrollTo(0, 0);
    }, []);

    return (
        
        <>
            {/* <section
                className="relative bg-[url(https://scontent-mnl1-1.xx.fbcdn.net/v/t39.30808-6/481116263_1097721308824594_8307114459386546464_n.jpg?_nc_cat=111&ccb=1-7&_nc_sid=833d8c&_nc_eui2=AeHwxaC6OmJtXkpDPZmg75pRbayr8AW7JWBtrKvwBbslYD4PfZMTmFYYc3J89-h3qx4rkqy00xMemJQuH-GxbaP8&_nc_ohc=YTrXIA5JU-EQ7kNvgFsr0Fc&_nc_oc=Adgej6BkDIa7uMwzGlCyAK3qryv5FDdiuuOfJNMWQMivLBWOia_jg2rtdX1lq1Vcf4o&_nc_zt=23&_nc_ht=scontent-mnl1-1.xx&_nc_gid=AcFZHTYGPZ1FMimGNLIvGXq&oh=00_AYCY7awLXpG_o96rm3rOczJwYatzI8zqtLL7rJRjL4ehLw&oe=67C5EC33)] bg-cover bg-center bg-no-repeat"
            > */}
            <section
                className="relative bg-cover bg-center bg-no-repeat flex flex-wrap items-center justify-center w-full lg:h-[80svh] gap-2 md:gap-0 lg:gap-0 bg-black"
                // style={{ backgroundImage: `url(${bg})` }}
            >
                {/* <div
                    className="absolute inset-0 bg-neutral-900/60 md:from-neutral-900/60 md:to-neutral-900/0 md:bg-gradient-to-r lg:from-neutral-900/md:from-neutral-900/60 lg:to-neutral-900/0 lg:bg-gradient-to-r"
                > */}
                <div
                    className="absolute inset-0"
                >
                </div>

                <div
                    className="relative w-full md:w-1/2 lg:w-1/2 h-full px-4 lg:px-8 flex items-center justify-center sm:justify-start md:justify-start lg:justify-start"
                >
                        
                    <div className="text-center md:text-start lg:text-start p-4 mt-5 md:mt-0 lg:mt-0">
                        <h1 className="font-extrabold text-white text-5xl md:text-4xl lg:text-5xl">
                            Powering Your Future 
                        </h1>
                            <strong className="block font-extrabold text-primary text-3xl md:text-4xl lg:text-5xl"> with Reliable Energy Solutions. </strong>

                        <p className="mt-4 w-full text-white md:text-lg lg:text-xl">
                            We provide sustainable, efficient, and affordable electricity for homes and businesses.
                        </p>

                        <div className="mt-8 flex flex-wrap gap-4 text-center justify-center md:justify-start lg:justify-start">
                            <Link
                            to={'/'}
                            className="block w-full rounded-lg bg-secondary px-12 py-3 text-sm font-medium text-white shadow-sm hover:bg-secondary-darker focus:ring-3 focus:outline-hidden sm:w-auto"
                            onMouseEnter={() => setHover(true)}
                            onMouseLeave={() => setHover(false)}
                            >
                            Apply for New Connection!
                            </Link>

                            <Link
                            to={'/consumer-services'}
                            className="block w-full rounded-lg border border-primary hover:bg-primary hover:text-white px-12 py-3 text-sm font-medium text-primary shadow-sm focus:ring-3 focus:outline-hidden sm:w-auto"
                            >
                            Learn More
                            </Link>
                        </div>
                    </div>
                </div>
                <div className='w-full md:w-1/2 lg:w-1/2 h-full flex items-center justify-center relative'>
                    <img className='flex h-full' src={bg} alt="" />
                    <motion.div 
                            className="absolute top-32 md:top-48 lg:top-48 w-[200px] h-[200px] sm:w-[300px] sm:h-[300px] md:w-[300px] md:h-[300px] lg:w-[300px] lg:h-[300px] bg-yellow-400 rounded-full pointer-events-none"
                            initial={{ opacity: 0.2, filter: 'blur(20px)' }}
                            animate={{ 
                            opacity: [0.2, 0.5, 0.2], 
                            filter: ['blur(20px)', 'blur(40px)', 'blur(20px)']
                            }}
                            transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
                        ></motion.div>
                    <div className='absolute top-52 md:top-56 lg:top-64'>
                        <Lottie animationData={lightningAnimation} style={{ width: 80, height: 80 }} />
                    </div>
                </div>
            </section>
            
            <section className='flex flex-col items-center justify-center'>
                <div className='flex flex-col items-center justify-center p-8'>
                    <span className='text-xl font-bold'>Power Rates</span>
                    <span>As of February 2025</span>
                </div>
                <div className='flex flex-wrap w-full px-2'>
                    <PowerRateCard price={12.8854} label={"Residential"} />
                    <PowerRateCard price={9.2525} label={"Commercial"} />
                    <PowerRateCard price={9.2171} label={"Public Building"} />
                    <PowerRateCard price={10.2374} label={"Street Light"} />
                </div>
            </section>

            <section className='flex flex-col items-center justify-center dark:bg-dark-accent pb-2'>
                <div className='flex flex-col items-center justify-center p-8'>
                    <span className='text-xl font-bold'>News and Updates</span>
                </div>
                <div className='flex flex-wrap px-2'>
                    <NewsCard
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
                </div>
                <div className='w-full flex justify-center p-4'>
                    <Link to={'news-and-updates'} className='h-[44px] rounded-lg px-4 font-semibold flex justify-center items-center bg-primary hover:bg-primary-darker text-white'>Show All News and Updates</Link>
                </div>
            </section>
        </>
    )
}

export default Landing