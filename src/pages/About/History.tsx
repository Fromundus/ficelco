import GuestPage from '@/components/custom/GuestPage'
import { Circle } from 'lucide-react';
import React from 'react'
import first from "../../assets/history/ficelco-history1-1.png";
import second from "../../assets/history/ficelco-history-1975-300x225.png";
import third from "../../assets/history/ficelco-history-construction-300x225.png";
import fourth from "../../assets/history/ficelco-history-plant-300x225.png";
import fifth from "../../assets/history/ficelco-history-contract-signing-300x225.png";

// const timeline = [
//   {
//     year: "1971",
//     title: "FICELCO Founded",
//     image: first,
//     body:
//       "First Electric Cooperative, Inc. (FICELCO) was established under PD 6. It was organized by provincial officers to bring power to Catanduanes.",
//   },
//   {
//     year: "1972",
//     title: "USAID Equipment & First Operations",
//     body:
//       "FICELCO received its first USAID power equipment and began operations in Virac and Bato through a lease with the provincial government.",
//   },
//   {
//     year: "1973",
//     title: "Fuel Crisis and Strategy Shift",
//     body:
//       "Fuel price hikes forced FICELCO to pause expansion, restructure priorities, and explore alternative local energy sources.",
//   },
//   {
//     year: "1975 – 1979",
//     title: "Infrastructure Expansion",
//     body:
//       "Power plant and headquarters completed (1975); new lines energized across Virac, Bato, San Andres, San Miguel (1976); Gigmoto (1978) and Viga (1979).",
//   },
//   {
//     year: "1982 – 1984",
//     title: "Hydro & Dendro Projects",
//     image: second,
//     body:
//       "Construction of the Balongbong Mini-Hydro Plant and a 600-hectare ipil-ipil plantation for the Dendro Thermal Project began.",
//   },
//   {
//     year: "1983",
//     title: "Typhoon ‘Warling’ and Recovery",
//     image: third,
//     body:
//       "The Balongbong Project was damaged by Typhoon Warling, but rehabilitation was completed in 1984 through local contractor partnerships.",
//   },
//   {
//     year: "1986 – 1989",
//     title: "Recovery & Growth",
//     body:
//       "FICELCO expanded to Pandan and Caramoran, improved operations with NEA support, and achieved 97% collection efficiency by 1989.",
//   },
//   {
//     year: "1998",
//     title: "Typhoon ‘Loleng’ Restoration",
//     body:
//       "Massive system damage was repaired with help from CEBECO and ‘Task Force Catanduanes’ led by GM Fr. Francisco G. Silva.",
//   },
//   {
//     year: "2002 – 2004",
//     title: "Temporary Gensets & EPIRA Reforms",
//     body:
//       "Monark gensets were commissioned to solve power shortages; later, EPIRA reforms introduced unbundled rates and consumer rights seminars.",
//   },
//   {
//     year: "2006",
//     title: "Typhoon ‘Reming’ Recovery",
//     body:
//       "Severe storm damage restored within three months through combined efforts of management, employees, and member-consumers.",
//   },
//   {
//     year: "Today",
//     title: "100% Energization & Service Excellence",
//     body:
//       "FICELCO now serves 38,000+ members across 11 municipalities, continuing its mission of affordable, dependable, and efficient service.",
//   },
// ];

export const timeline = [
    {
        year: 1971,
        title: "FICELCO Founded",
        image: first,
        body: "On October 28, 1971, the First Catanduanes Electric Cooperative, Inc. (FICELCO) was established under Presidential Decree No. 6, spearheaded by provincial officers from various sectors of Catanduanes.",
    },
    {
        year: 1972,
        title: "USAID Power Equipment and Lease Agreement",
        body: "FICELCO received its first shipment of power generating equipment from USAID and entered a lease agreement with the Provincial Government to operate the Magsaysay Electric Distribution System in Virac and Bato.",
    },
    {
        year: 1973,
        title: "Fuel Price Hike and Strategic Reorientation",
        body: "A global fuel price hike disrupted operations, forcing FICELCO to slow expansion plans, restructure priorities, and begin exploring alternative energy sources.",
    },
    {
        year: 1975,
        title: "Construction of Power Plant and Headquarters",
        body: "FICELCO completed the construction of its power plant and headquarters in May 1975, preparing to meet the growing power demands of its members.",
    },
    {
        year: 1976,
        title: "Expansion to More Municipalities",
        body: "New line extensions in Virac, Bato, San Andres, and San Miguel were inaugurated in August 1976, expanding FICELCO’s service coverage.",
    },
    {
        year: 1978,
        title: "Service Expansion to Gigmoto",
        body: "FICELCO inaugurated its service in the municipality of Gigmoto in May 1978, continuing its province-wide electrification push.",
    },
    {
        year: 1979,
        title: "Viga Interim Power Plant",
        body: "An interim power plant was installed in Viga in June 1979, further improving electricity access across Catanduanes.",
    },
    {
        year: 1982,
        title: "Development of Indigenous Power Sources",
        image: second,
        body: "Construction of the 1.8 MW Balongbong Mini-Hydro Plant began in June 1982, alongside the establishment of a 600-hectare ipil-ipil plantation to fuel the planned Buyo Dendro Thermal Plant.",
    },
    {
        year: 1983,
        title: "Power Shortage and Balongbong Hydro Inauguration",
        body: "Despite limited generating capacity and high costs, the Balongbong Mini-Hydro Plant was inaugurated on June 27, 1983. Typhoon 'Warling' later that year severely damaged the facility, reducing power service and consumer confidence.",
    },
    {
        year: 1984,
        title: "Balongbong Rehabilitation and Recovery",
        image: third,
        body: "FICELCO partnered with local contractors to rehabilitate the Balongbong Mini-Hydro Plant. By November 1984, operations had stabilized and revenues began to recover.",
    },
    {
        year: 1986,
        title: "Provincial Government Support for Line Extensions",
        body: "The Provincial Government led efforts to extend power lines to Pandan and Caramoran, linking them to the Balongbong hydro source.",
    },
    {
        year: 1987,
        title: "Management Assistance from NEA",
        body: "The National Electrification Administration (NEA) sent a two-man Management Assistance Team to directly support FICELCO’s operations under PD 1645.",
    },
    {
        year: 1988,
        title: "NAPOCOR Power Integration and Collection Breakthrough",
        image: fourth,
        body: "Power generation duties were transferred to NAPOCOR, reducing FICELCO’s operating costs. The co-op achieved over 95% collection efficiency for the first time, marking a major milestone in performance.",
    },
    {
        year: 1989,
        title: "Recognition as a Viable Electric Cooperative",
        body: "NEA reclassified FICELCO among the country’s most viable cooperatives. Electrification projects expanded, supported by a proposed total electrification agenda and a DANIDA-assisted development grant.",
    },
    {
        year: 1990,
        title: "Continued Electrification and Growth",
        body: "Despite material shortages, FICELCO sustained electrification growth through community-based programs like Barangay Power Associations and Electricians Courses.",
    },
    {
        year: 1998,
        title: "Typhoon Loleng and Restoration Efforts",
        body: "Typhoon 'Loleng' devastated the distribution system. Restoration was led by FICELCO with aid from CEBECO I–III and 'Task Force Catanduanes,' under GM Fr. Francisco G. Silva.",
    },
    {
        year: 2002,
        title: "Power Supply Crisis and Temporary Gensets",
        image: fifth,
        body: "Two rented gensets from Monark were commissioned, alleviating the island’s power shortage. FICELCO and the provincial government petitioned President Gloria Macapagal-Arroyo to retain them until NAPOCOR’s capacity improved.",
    },
    {
        year: 2004,
        title: "Unbundling of Rates and Consumer Orientation",
        body: "In compliance with ERC regulations, FICELCO implemented unbundled rates and launched weekly consumer orientation seminars as part of the Magna Carta for Residential Consumers.",
    },
    {
        year: 2006,
        title: "Typhoon Reming Restoration",
        body: "After Typhoon 'Reming' caused severe damage, FICELCO restored full power to the province within three months through coordinated efforts of its management, employees, and member-consumers.",
    },
    {
        year: "Today",
        title: "Sustained Growth and Full Electrification",
        body: "After 36 years of service, FICELCO achieved 100% barangay energization, serving over 38,000 member-consumers across 11 municipalities, reaffirming its commitment to reliable and affordable electric service.",
    },
];

const History = () => {
    return (
        <GuestPage title='Our History'>
            <div className='flex flex-col gap-12'>
                {timeline.map((item, index) => {
                    return (
                        <div className='grid md:grid-cols-9 items-center'>
                            <span className='text-nowrap col-span-1 text-lg font-bold text-end'>
                                {item.year}
                            </span>
                            <div className='col-span-1 hidden md:flex bg-foreground h-5 w-5 ms-14 rounded-full relative'>
                                {/* {index !== 19 && <div className={`absolute ${item.image ? "h-96" : "h-40"} left-[9px] border-[1px] border-foreground`}></div>} */}
                                {index !== 0 && <div className={`absolute left-[9px] h-[520px] bottom-0 border-[1px] border-foreground`}></div>}
                            </div>
                            <div className='col-span-7 space-y-4'>
                                <h1 className='text-xl font-semibold'>{item.title}</h1>
                                <img className='w-full' src={item.image} alt="" />
                                <p className='text-muted-foreground'>{item.body}</p>
                            </div>
                        </div>
                    )
                })}
            </div>
        </GuestPage>
    )
}

export default History
