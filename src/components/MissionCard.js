import React from 'react'

function MissionCard({ image, title, description }) {
    return (
        <div className='w-full md:w-1/2 lg:w-1/2 p-4'>
            <div className='flex flex-col gap-2'>
                <img className='w-[50px]' src={image} alt="" />
                <span className='text-lg font-semibold'>{title}</span>
                <span>{description}</span>
               {title === "Goal" &&
                <span>
                    <ul className="list-disc list-inside">
                        <li>To provide electricity in all “sitios” of Catanduanes.</li>
                        <li>To improve system reliability, power quality and reduce system loss by upgrading and rehabilitation of existing distribution system.</li>
                        <li>To enhance Employee Competence Programs for professional and personal growth.</li>
                        <li>To improve Consumer-Relation programs by spearheading Corporate Social Responsibility (CSR) projects.</li>
                        <li>To improve working facilities and upgrade Information Technology (IT) for service efficiency.</li>
                    </ul>
                </span>
                }
                {title === "Core Values" && <span>
                    <ul className='"list-disc list-inside'>
                        <li><strong>C</strong>ommitment to</li>
                        <li><strong>A</strong>ctive</li>
                        <li><strong>R</strong>eliable and</li>
                        <li><strong>E</strong>fficient</li>
                        <li><strong>S</strong>ervice</li>
                    </ul>
                </span>}
            </div>
        </div>
    )
}

export default MissionCard