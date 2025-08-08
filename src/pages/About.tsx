import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Users, Target, Eye, Award } from "lucide-react";

const About = () => {
  const managementTeam = [
    {
      name: "Juan Dela Cruz",
      position: "General Manager",
      description: "Leading FICELCO with over 20 years of experience in cooperative management."
    },
    {
      name: "Maria Santos",
      position: "Operations Manager",
      description: "Overseeing daily operations and ensuring reliable power delivery."
    },
    {
      name: "Roberto Villanueva",
      position: "Finance Manager",
      description: "Managing financial operations and member billing systems."
    }
  ];

  return (
    <div className="min-h-screen py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-16">
          <h1 className="text-4xl font-bold text-foreground mb-4">About FICELCO</h1>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            First Catanduanes Electric Cooperative, Inc. has been serving the communities 
            of Catanduanes with reliable electrical services since our establishment.
          </p>
        </div>

        {/* History Section */}
        <section className="mb-16">
          <div className="bg-subtle-gradient rounded-lg p-8">
            <h2 className="text-3xl font-bold text-foreground mb-6 text-center">Our History</h2>
            <div className="prose prose-lg max-w-none">
              <p className="text-muted-foreground mb-4">
                First Catanduanes Electric Cooperative, Inc. (FICELCO) was established to bring 
                reliable electricity to the island province of Catanduanes. As a member-owned 
                cooperative, we have been committed to serving our community with affordable 
                and dependable electrical services.
              </p>
              <p className="text-muted-foreground mb-4">
                Since our inception, FICELCO has grown to serve thousands of households and 
                businesses across Catanduanes, contributing to the economic development and 
                improved quality of life for our members and the broader community.
              </p>
              <p className="text-muted-foreground">
                Today, we continue to modernize our infrastructure and expand our services 
                while maintaining our commitment to cooperative principles and community service.
              </p>
            </div>
          </div>
        </section>

        {/* Mission, Vision, Values */}
        <section className="mb-16">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <Card className="card-electric">
              <CardHeader className="text-center">
                <Target className="w-12 h-12 text-primary mx-auto mb-4" />
                <CardTitle className="text-2xl">Our Mission</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground text-center">
                  To provide reliable, affordable, and quality electrical services to our 
                  member-consumers while promoting sustainable development and community welfare.
                </p>
              </CardContent>
            </Card>

            <Card className="card-electric">
              <CardHeader className="text-center">
                <Eye className="w-12 h-12 text-accent mx-auto mb-4" />
                <CardTitle className="text-2xl">Our Vision</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground text-center">
                  To be the leading electric cooperative in the region, recognized for 
                  excellence in service delivery and commitment to community development.
                </p>
              </CardContent>
            </Card>

            <Card className="card-electric">
              <CardHeader className="text-center">
                <Award className="w-12 h-12 text-primary mx-auto mb-4" />
                <CardTitle className="text-2xl">Our Values</CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="text-muted-foreground space-y-2">
                  <li>• Integrity and Transparency</li>
                  <li>• Community Service</li>
                  <li>• Reliability and Quality</li>
                  <li>• Cooperative Principles</li>
                  <li>• Environmental Responsibility</li>
                </ul>
              </CardContent>
            </Card>
          </div>
        </section>

        {/* Management Team */}
        <section>
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-foreground mb-4">Management Team</h2>
            <p className="text-muted-foreground text-lg">
              Meet the dedicated professionals leading FICELCO forward
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {managementTeam.map((member, index) => (
              <Card key={index} className="card-electric">
                <CardHeader className="text-center">
                  <div className="w-20 h-20 bg-hero-gradient rounded-full flex items-center justify-center mx-auto mb-4">
                    <Users className="w-10 h-10 text-white" />
                  </div>
                  <CardTitle className="text-xl">{member.name}</CardTitle>
                  <p className="text-primary font-medium">{member.position}</p>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground text-center">{member.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
};

export default About;