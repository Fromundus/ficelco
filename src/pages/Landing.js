import Lottie from 'lottie-react'
import React from 'react'
import { Link } from 'react-router-dom'
import lightningAnimation from "../assets/animations/lightning.json";

function Landing() {
    const [hover, setHover] = React.useState(false);

    React.useEffect( () => {
        window.scrollTo(0, 0);
    }, []);

    return (
        <section
            className="relative bg-[url(https://scontent-mnl1-1.xx.fbcdn.net/v/t39.30808-6/481116263_1097721308824594_8307114459386546464_n.jpg?_nc_cat=111&ccb=1-7&_nc_sid=833d8c&_nc_eui2=AeHwxaC6OmJtXkpDPZmg75pRbayr8AW7JWBtrKvwBbslYD4PfZMTmFYYc3J89-h3qx4rkqy00xMemJQuH-GxbaP8&_nc_ohc=YTrXIA5JU-EQ7kNvgFsr0Fc&_nc_oc=Adgej6BkDIa7uMwzGlCyAK3qryv5FDdiuuOfJNMWQMivLBWOia_jg2rtdX1lq1Vcf4o&_nc_zt=23&_nc_ht=scontent-mnl1-1.xx&_nc_gid=AcFZHTYGPZ1FMimGNLIvGXq&oh=00_AYCY7awLXpG_o96rm3rOczJwYatzI8zqtLL7rJRjL4ehLw&oe=67C5EC33)] bg-cover bg-center bg-no-repeat"
        >
            <div
                className="absolute inset-0 bg-neutral-900/60 md:from-neutral-900/60 md:to-neutral-900/0 md:bg-gradient-to-r lg:from-neutral-900/md:from-neutral-900/60 lg:to-neutral-900/0 lg:bg-gradient-to-r"
            >
            </div>

            <div
                className="relative mx-auto w-full px-4 lg:px-8 h-[80svh] flex items-center justify-center lg:justify-start"
            >
                {/* {<div className='absolute left-10 top-[360px]'>
                    <Lottie animationData={lightningAnimation} style={{ width: 50, height: 50 }} />
                </div>} */}
                <div className="max-w-xl text-center lg:text-start">
                    <h1 className="text-5xl font-extrabold text-white sm:text-5xl">
                        Powering Your Future 
                    </h1>
                        <strong className="block font-extrabold text-primary text-3xl sm:text-5xl"> with Reliable Energy Solutions. </strong>

                    <p className="mt-4 w-full text-white sm:text-xl/relaxed">
                        We provide sustainable, efficient, and affordable electricity for homes and businesses.
                    </p>

                    <div className="mt-8 flex flex-wrap gap-4 text-center justify-center lg:justify-start">
                        <Link
                        to={'/'}
                        className="block w-full rounded-lg bg-secondary px-12 py-3 text-sm font-medium text-white shadow-sm hover:bg-secondary-darker focus:ring-3 focus:outline-hidden sm:w-auto"
                        onMouseEnter={() => setHover(true)}
                        onMouseLeave={() => setHover(false)}
                        >
                        Apply Now — Get Powered
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
        </section>
    )
}

export default Landing