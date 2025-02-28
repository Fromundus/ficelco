import Lottie from 'lottie-react'
import React from 'react'
import { Link } from 'react-router-dom'
import lightningAnimation from "../assets/animations/lightning.json";
import bg from "../assets/ficelco-hero.jpg"
import { motion } from 'framer-motion';

function Landing() {
    const [hover, setHover] = React.useState(false);

    React.useEffect( () => {
        window.scrollTo(0, 0);
    }, []);

    return (
        // <section
        //     className="relative bg-[url(https://scontent-mnl1-1.xx.fbcdn.net/v/t39.30808-6/481116263_1097721308824594_8307114459386546464_n.jpg?_nc_cat=111&ccb=1-7&_nc_sid=833d8c&_nc_eui2=AeHwxaC6OmJtXkpDPZmg75pRbayr8AW7JWBtrKvwBbslYD4PfZMTmFYYc3J89-h3qx4rkqy00xMemJQuH-GxbaP8&_nc_ohc=YTrXIA5JU-EQ7kNvgFsr0Fc&_nc_oc=Adgej6BkDIa7uMwzGlCyAK3qryv5FDdiuuOfJNMWQMivLBWOia_jg2rtdX1lq1Vcf4o&_nc_zt=23&_nc_ht=scontent-mnl1-1.xx&_nc_gid=AcFZHTYGPZ1FMimGNLIvGXq&oh=00_AYCY7awLXpG_o96rm3rOczJwYatzI8zqtLL7rJRjL4ehLw&oe=67C5EC33)] bg-cover bg-center bg-no-repeat"
        // >
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
                className="relative mx-auto w-full md:w-1/2 lg:w-1/2 h-full px-4 lg:px-8 flex items-center justify-center sm:justify-start md:justify-start lg:justify-start"
            >
                      
                <div className="max-w-xl text-center sm:text-start md:text-start lg:text-start p-4 mt-5 md:mt-0 lg:mt-0 md:p-0 lg:p-0">
                    <h1 className="text-5xl font-extrabold text-white md:text-4xl lg:text-5xl">
                        Powering Your Future 
                    </h1>
                        <strong className="block font-extrabold text-primary text-3xl md:text-4xl lg:text-5xl"> with Reliable Energy Solutions. </strong>

                    <p className="mt-4 w-full text-white sm:text-xl/relaxed md:text-xl/relaxed lg:text-xl/relaxed">
                        We provide sustainable, efficient, and affordable electricity for homes and businesses.
                    </p>

                    <div className="mt-8 flex flex-wrap gap-4 text-center justify-center sm:justify-start md:justify-start lg:justify-start">
                        <Link
                        to={'/'}
                        className="block w-full rounded-lg bg-secondary px-12 py-3 text-sm font-medium text-white shadow-sm hover:bg-secondary-darker focus:ring-3 focus:outline-hidden sm:w-auto"
                        onMouseEnter={() => setHover(true)}
                        onMouseLeave={() => setHover(false)}
                        >
                        Apply Now!
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
                        className="absolute top-32 w-[300px] h-[300px] bg-yellow-400 rounded-full pointer-events-none"
                        initial={{ opacity: 0.2, filter: 'blur(20px)' }}
                        animate={{ 
                        opacity: [0.2, 0.5, 0.2], 
                        filter: ['blur(20px)', 'blur(40px)', 'blur(20px)']
                        }}
                        transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
                    ></motion.div>
                <div className='absolute md:top-56 lg:top-56'>
                    <Lottie animationData={lightningAnimation} style={{ width: 80, height: 80 }} />
                </div>
            </div>
        </section>
    )
}

export default Landing