import GuestPage from '@/components/custom/GuestPage'
import React from 'react'
import emma from "../../assets/bods/R5_FICELCO - Emma T. Bueno.jpg";
import robert from "../../assets/bods/R5_FICELCO - Robert C. Aquino.jpg";
import myrna from "../../assets/bods/R5_FICELCO - Myrna SJ. Carilimdiliman.jpg";
import romeo from "../../assets/bods/R5_FICELCO - Romeo D. Santos.jpg";
import rodulfo from "../../assets/bods/R5_FICELCO - Rodulfo B. Vargas.jpg";
import arsenia from "../../assets/bods/R5_FICELCO - Arsenia G. Bernacer.jpg";
import alicia from "../../assets/bods/R5_FICELCO - ALICIA F. Arcilla.jpg";
import Bod from '@/types/Bod';
import BodCard from '@/components/custom/BodCard';

const bods: Bod[] = [
    {
        name: "Dir. EMMA T. BUENO",
        position: "Board President",
        district: "District IV",
        areas: "San Miguel",
        image: emma,
    },
    {
        name: "Dir. ROBERT C. AQUINO",
        position: "Vice President",
        district: "District IV",
        areas: "Viga, Panganiban, Bagamanoc",
        image: robert,
    },
    {
        name: "Dir. MYRNA SJ. CARILIMDILIMAN",
        position: "Secretary",
        district: "District V",
        areas: "Virac",
        image: myrna,
    },
    {
        name: "Dir. ROMEO D. SANTOS",
        position: "Treasurer",
        district: "District I",
        areas: "Baras, Gigmoto",
        image: romeo,
    },
    {
        name: "Dir. RODULFO B. VARGAS",
        position: "Auditor",
        district: "District II",
        areas: "Bato",
        image: rodulfo,
    },
    {
        name: "Dir. ARSENIA G. BERNACER",
        position: "Business Manager",
        district: "District VI",
        areas: "Pandan, Caramoran",
        image: arsenia,
    },
    {
        name: "Dir. ALICIA F. ARCILLA",
        position: "Public Relations Officer",
        district: "District III",
        areas: "San Andres",
        image: alicia,
    },
]

const BOD = () => {
    return (
        <GuestPage title='Board of Directors'>
            <div className='grid md:grid-cols-3 gap-6'>
                {bods.map((item) => {
                    return (
                        <BodCard key={item.name} bod={item} />
                    )
                })}
            </div>
        </GuestPage>
    )
}

export default BOD
