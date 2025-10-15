import GuestPage from '@/components/custom/GuestPage'
import React from 'react'
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Award, Eye, Target } from 'lucide-react';

const VisionMisionGoal = () => {
    return (
        <GuestPage>
            <div className="text-center mb-16">
                <h1 className="text-4xl font-bold text-foreground mb-4">Vision, Mission, and Goal</h1>
                {/* <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
                    Discover the guiding principles that define FICELCO’s purpose, direction, and commitment to delivering reliable and sustainable electric service.
                </p> */}
            </div>

            <section className="mb-16">
                <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
                    <Card className="card-electric h-fit">
                    <CardHeader className="text-center">
                        <Eye className="w-12 h-12 mx-auto mb-4" />
                        <CardTitle className="text-2xl">Our Vision</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <p className="text-muted-foreground text-center">
                        A unified FICELCO that is committed to service excellence.
                        </p>
                    </CardContent>
                    </Card>

                    <Card className="card-electric h-fit">
                    <CardHeader className="text-center">
                        <Target className="w-12 h-12 mx-auto mb-4" />
                        <CardTitle className="text-2xl">Our Mission</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <p className="text-muted-foreground text-center">
                        To deliver quality and sustainable service to the province of Catanduanes.
                        </p>
                    </CardContent>
                    </Card>

                    <Card className="card-electric h-fit">
                    <CardHeader className="text-center">
                        <Award className="w-12 h-12 mx-auto mb-4" />
                        <CardTitle className="text-2xl">Our Values</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <ul className="text-muted-foreground space-y-2">
                        <li>• <strong>C</strong>OMMITMENT TO</li>
                        <li>• <strong>A</strong>CTIVE</li>
                        <li>• <strong>R</strong>ELIABLE AND</li>
                        <li>• <strong>E</strong>FFICIENT</li>
                        <li>• <strong>S</strong>ERVICE</li>
                        </ul>
                    </CardContent>
                    </Card>

                    <Card className="card-electric h-fit">
                    <CardHeader className="text-center">
                        <Award className="w-12 h-12 mx-auto mb-4" />
                        <CardTitle className="text-2xl">Our Goals</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <p className="text-muted-foreground mb-4">
                        <strong>1. </strong>To provide electricity in all “sitios” of Catanduanes.
                        </p>
                        <p className="text-muted-foreground mb-4">
                            <strong>2. </strong>To improve system reliability, power quality and reduce system loss by upgrading and rehabilitation of existing distribution system;
                        </p>
                        <p className="text-muted-foreground mb-4">
                            <strong>3. </strong>To enhance Employee Competence Programs for professional and personal growth;
                        </p>
                        <p className="text-muted-foreground mb-4">
                            <strong>4. </strong>To improve Consumer-Relation programs by spearheading Corporate Social Responsibility (CSR) projects; and
                        </p>
                        <p className="text-muted-foreground mb-4">
                            <strong>5. </strong>To improve working facilities and upgrade Information Technology (IT) for service efficiency.
                        </p>
                    </CardContent>
                    </Card>
                </div>
            </section>
        </GuestPage>
    )
}

export default VisionMisionGoal
