import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { 
  UserPlus, 
  FileText, 
  Settings, 
  CreditCard, 
  Phone, 
  Clock,
  AlertCircle,
  CheckCircle
} from "lucide-react";
import GuestPage from "@/components/custom/GuestPage";

const MemberServices = () => {
  const services = [
    {
      title: "New Connection",
      description: "Apply for a new electrical connection to your property",
      icon: UserPlus,
      color: "text-primary",
      action: "Apply Now"
    },
    {
      title: "Service Transfer",
      description: "Transfer your electrical service to a new location",
      icon: Settings,
      color: "text-accent",
      action: "Request Transfer"
    },
    {
      title: "Bill Payment Assistance",
      description: "Get help with payment options and billing inquiries",
      icon: CreditCard,
      color: "text-primary",
      action: "Get Help"
    },
    {
      title: "Technical Support",
      description: "Report electrical issues and request maintenance",
      icon: Phone,
      color: "text-accent",
      action: "Contact Support"
    }
  ];

  const serviceHours = [
    { day: "Monday - Friday", hours: "8:00 AM - 5:00 PM" },
    { day: "Saturday", hours: "8:00 AM - 12:00 PM" },
    { day: "Sunday", hours: "Emergency Only" }
  ];

  const emergencyContacts = [
    {
      type: "Power Outage",
      number: "(052) 811-HELP (4357)",
      description: "Report power outages and electrical emergencies"
    },
    {
      type: "General Inquiries",
      number: "(052) 811-1234",
      description: "General questions and customer service"
    }
  ];

  return (
    <GuestPage>

        <div className="text-center mb-16">
          <h1 className="text-4xl font-bold text-foreground mb-4">Member Services</h1>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Comprehensive services for our valued members. We're here to assist you 
            with all your electrical service needs.
          </p>
        </div>

        <span className="flex w-full justify-center">Coming soon...</span>

        {/* <section className="mb-16">
          <h2 className="text-3xl font-bold text-foreground mb-8 text-center">Available Services</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {services.map((service, index) => (
              <Card key={index} className="card-electric group">
                <CardHeader>
                  <div className="flex items-center space-x-4">
                    <div className="w-12 h-12 bg-hero-gradient rounded-lg flex items-center justify-center">
                      <service.icon className="w-6 h-6 text-white" />
                    </div>
                    <div>
                      <CardTitle className="text-xl">{service.title}</CardTitle>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground mb-4">{service.description}</p>
                  <Button className="w-full" variant="outline">
                    {service.action}
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </section> */}

        {/* <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-16">
          <Card className="card-electric">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Clock className="w-5 h-5 text-primary" />
                Service Hours
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {serviceHours.map((schedule, index) => (
                  <div key={index} className="flex justify-between items-center">
                    <span className="font-medium">{schedule.day}</span>
                    <span className="text-muted-foreground">{schedule.hours}</span>
                  </div>
                ))}
              </div>
              <div className="mt-4 p-3 bg-secondary rounded-lg">
                <p className="text-sm text-muted-foreground flex items-center gap-2">
                  <AlertCircle className="w-4 h-4" />
                  Emergency services available 24/7
                </p>
              </div>
            </CardContent>
          </Card>

          <Card className="card-electric">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Phone className="w-5 h-5 text-accent" />
                Emergency Contacts
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {emergencyContacts.map((contact, index) => (
                  <div key={index} className="border-l-4 border-primary pl-4">
                    <h4 className="font-semibold text-foreground">{contact.type}</h4>
                    <p className="text-lg font-mono text-primary">{contact.number}</p>
                    <p className="text-sm text-muted-foreground">{contact.description}</p>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div> */}

        {/* <section className="mb-16">
          <Card className="card-electric">
            <CardHeader>
              <CardTitle className="text-center">Current Service Status</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="text-center">
                  <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-3">
                    <CheckCircle className="w-8 h-8 text-primary" />
                  </div>
                  <h3 className="font-semibold text-foreground mb-2">System Status</h3>
                  <p className="text-sm text-muted-foreground">All systems operational</p>
                </div>
                <div className="text-center">
                  <div className="w-16 h-16 bg-accent/10 rounded-full flex items-center justify-center mx-auto mb-3">
                    <Clock className="w-8 h-8 text-accent" />
                  </div>
                  <h3 className="font-semibold text-foreground mb-2">Response Time</h3>
                  <p className="text-sm text-muted-foreground">Average: 15 minutes</p>
                </div>
                <div className="text-center">
                  <div className="w-16 h-16 bg-secondary rounded-full flex items-center justify-center mx-auto mb-3">
                    <FileText className="w-8 h-8 text-secondary-foreground" />
                  </div>
                  <h3 className="font-semibold text-foreground mb-2">Active Requests</h3>
                  <p className="text-sm text-muted-foreground">23 pending</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </section> */}

        {/* <section className="text-center">
          <div className="bg-hero-gradient rounded-lg p-8 text-white">
            <h2 className="text-3xl font-bold mb-4">Need Personal Assistance?</h2>
            <p className="text-xl mb-6 opacity-90">
              Visit our office or call us for personalized service and support
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button variant="secondary" size="lg">
                Visit Our Office
              </Button>
              <Button variant="outline" size="lg" className="border-accent text-accent hover:bg-accent hover:text-accent-foreground">
                Call Customer Service
              </Button>
            </div>
          </div>
        </section> */}
    </GuestPage>
  );
};

export default MemberServices;