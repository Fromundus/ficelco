import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { CreditCard, FileText, Newspaper, Users, Zap, Shield, Phone } from "lucide-react";
import heroImage from "@/assets/hero-electric.jpg";
import bghero from "@/assets/bghero.jfif";

const Index = () => {
  const quickLinks = [
    {
      title: "Billing Inquiry",
      description: "Check your electricity bill and payment status",
      icon: CreditCard,
      link: "/billing",
      color: "text-primary"
    },
    {
      title: "Latest News",
      description: "Stay updated with announcements and advisories",
      icon: Newspaper,
      link: "/news",
      color: "text-accent"
    },
    {
      title: "Member Services",
      description: "Access member-exclusive services and support",
      icon: Users,
      link: "/services",
      color: "text-primary"
    },
    {
      title: "Contact Us",
      description: "Get in touch with our customer service team",
      icon: Phone,
      link: "/contact",
      color: "text-accent"
    }
  ];

  const services = [
    {
      icon: Zap,
      title: "Reliable Power",
      description: "24/7 electricity supply to homes and businesses across Catanduanes"
    },
    {
      icon: Shield,
      title: "Safety First",
      description: "Committed to maintaining the highest safety standards in all operations"
    },
    {
      icon: Users,
      title: "Community Focus",
      description: "Serving our members with personalized, community-oriented service"
    }
  ];

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section 
        className="relative bg-cover bg-center h-screen flex items-center"
        style={{ backgroundImage: `url(${bghero})` }}
      >
        <div className="absolute inset-0 bg-black/50"></div>
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center text-white">
          <h1 className="text-5xl md:text-6xl font-extrabold mb-6">
            POWERING <span className="text-primary">CATANDUANES</span>
          </h1>
          <p className="text-xl md:text-2xl mb-8 max-w-3xl mx-auto">
            First Catanduanes Electric Cooperative, Inc. - Your trusted partner in reliable, 
            affordable electricity for homes and businesses.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button asChild className="font-semibold">
              <Link to="/billing">Check Your Bill</Link>
            </Button>
            <Button asChild className="bg-primary bg-blue-500 hover:bg-blue-600 text-white font-semibold">
              <Link to="/services">Apply for New Connection</Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Quick Links Section */}
      <section className="py-16 bg-subtle-gradient">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-foreground mb-4">Quick Access</h2>
            <p className="text-muted-foreground text-lg">
              Fast access to our most used services
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {quickLinks.map((item, index) => (
              <Card key={index} className="card-electric group cursor-pointer">
                <Link to={item.link}>
                  <CardHeader className="text-center pb-4">
                    <item.icon className={`w-12 h-12 mx-auto mb-4 ${item.color} group-hover:scale-110 transition-transform`} />
                    <CardTitle className="text-lg">{item.title}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-muted-foreground text-center">{item.description}</p>
                  </CardContent>
                </Link>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Services Overview */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-foreground mb-4">Our Commitment</h2>
            <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
              As a member-owned cooperative, we're dedicated to providing exceptional 
              electrical services to the communities we serve.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {services.map((service, index) => (
              <div key={index} className="text-center">
                <div className="w-16 h-16 bg-hero-gradient rounded-full flex items-center justify-center mx-auto mb-4">
                  <service.icon className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-xl font-semibold text-foreground mb-3">{service.title}</h3>
                <p className="text-muted-foreground">{service.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-16 bg-hero-gradient">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center text-white">
          <h2 className="text-3xl font-bold mb-4">Need Assistance?</h2>
          <p className="text-xl mb-8 opacity-90">
            Our customer service team is here to help with all your electrical needs.
          </p>
          <Button asChild variant="secondary" size="lg">
            <Link to="/contact">Contact Us Today</Link>
          </Button>
        </div>
      </section>
    </div>
  );
};

export default Index;
