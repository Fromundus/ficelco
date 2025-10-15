import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { 
  MapPin, 
  Phone, 
  Mail, 
  Clock, 
  MessageSquare,
  User,
  Send,
  Building
} from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import GuestPage from "@/components/custom/GuestPage";

const Contact = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    subject: "",
    category: "",
    message: ""
  });
  const [loading, setLoading] = useState(false);
  const { toast } = useToast();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.message) {
      toast({
        title: "Required Fields Missing",
        description: "Please fill in all required fields.",
        variant: "destructive",
      });
      return;
    }

    setLoading(true);
    
    // Simulate form submission
    setTimeout(() => {
      setLoading(false);
      toast({
        title: "Message Sent Successfully",
        description: "Thank you for contacting us. We'll get back to you within 24 hours.",
      });
      setFormData({
        name: "",
        email: "",
        phone: "",
        subject: "",
        category: "",
        message: ""
      });
    }, 2000);
  };

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const serviceCenters = [
    {
      name: "SAN ANDRES",
      address: "DIVINO ROSTRO (POB.), SAN ANDRES, CATANDUANES",
      contact_number: "0929-550-1517",
    },
    {
      name: "VIGA",
      address: "SAN ISIDRO, VIGA, CATANDUANES",
      contact_number: "0939-492-5015",
    },
    {
      name: "DATAG",
      address: "DATAG WEST, CARAMORAN, CATANDUANES",
      contact_number: "0929-175-7156",
    },
    {
      name: "PANDAN",
      address: "SAN IGNACIO ST. PANDAN DEL NORTE, PANDAN, CATANDUANES",
      contact_number: "0929-550-1529",
    },
    {
      name: "GIGMOTO",
      address: "POBLACIO DISTRICT II, GIGMOTO, CATANDUANES",
      contact_number: "0929-550-1546",
    },
  ]

  return (
    <GuestPage>
        <div className="text-center mb-16">
          <h1 className="text-4xl font-bold text-foreground mb-4">Contact Us</h1>
          {/* <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Get in touch with FICELCO. We're here to help with your electrical 
            service needs, questions, and concerns.
          </p> */}
        </div>

        {/* <section className="mb-16">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {contactInfo.map((info, index) => (
              <Card key={index} className="card-electric text-center">
                <CardHeader>
                  <div className="w-12 h-12 bg-hero-gradient rounded-lg flex items-center justify-center mx-auto mb-3">
                    <info.icon className="w-6 h-6 text-white" />
                  </div>
                  <CardTitle className="text-lg">{info.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  {info.details.map((detail, idx) => (
                    <p key={idx} className="text-muted-foreground text-sm">
                      {detail}
                    </p>
                  ))}
                </CardContent>
              </Card>
            ))}
          </div>
        </section> */}

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Office Information */}
          <div className="space-y-6">
            {/* Main Office */}
            <Card className="card-electric">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <MapPin className="w-5 h-5" />
                  Main Office
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div>
                    <h4 className="font-semibold text-foreground mb-2">FICELCO Headquarters</h4>
                    <p className="text-muted-foreground">
                      Located at Marinawa, Bato, Catanduanes, our main office serves as the 
                      central hub for all FICELCO operations and customer services.
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Emergency Services */}
            <Card className="card-electric">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Phone className="w-5 h-5" />
                  Our Contacts
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div>
                    <h4 className="font-semibold text-foreground">FICELCO Consumer Complaints and Request Hotline</h4>
                    <p className="text-lg font-mono">09506791798</p>
                  </div>
                  <div>
                    <h4 className="font-semibold text-foreground">Meter Reading & Billing</h4>
                    <p className="text-lg font-mono">09494282140</p>
                  </div>
                  <div>
                    <h4 className="font-semibold text-foreground">Email us</h4>
                    <p className="text-lg font-mono">ficelco01@gmail.com</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="card-electric">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Building className="w-5 h-5" />
                  Service Centers
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  {serviceCenters.map((item) => {
                    return (
                      <div className="space-y-1" key={item.name}>
                        <h4 className="text-foreground font-semibold">{item.name}</h4>
                        <p className="font-mono pt-2 flex items-center gap-2"><MapPin className="w-5 h-5" /> {item.address}</p>
                        <p className="text-lg font-mono flex items-center gap-2"><Phone className="w-5 h-5" /> {item.contact_number}</p>
                      </div>
                    )
                  })}
                </div>
              </CardContent>
            </Card>

            {/* Quick Tips */}
            {/* <Card className="card-electric">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <User className="w-5 h-5 text-accent" />
                  Before You Visit
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <h4 className="font-semibold text-foreground">Please bring:</h4>
                  <ul className="text-sm text-muted-foreground space-y-1">
                    <li>• Valid government-issued ID</li>
                    <li>• Account number (for billing inquiries)</li>
                    <li>• Previous bills or receipts</li>
                    <li>• Required documents for services</li>
                  </ul>
                  <div className="mt-4 p-3 bg-secondary rounded-lg">
                    <p className="text-sm text-muted-foreground">
                      💡 Tip: Call ahead to verify document requirements for your specific needs.
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card> */}
          </div>
          {/* Contact Form */}
          <div>
            <Card className="card-electric">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <MessageSquare className="w-5 h-5" />
                  Send us a Message
                </CardTitle>
                <p className="text-muted-foreground">
                  Fill out the form below and we'll get back to you as soon as possible.
                </p>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="name">Full Name *</Label>
                      <Input
                        id="name"
                        type="text"
                        placeholder="Your full name"
                        value={formData.name}
                        onChange={(e) => handleInputChange("name", e.target.value)}
                        className="mt-1"
                        required
                      />
                    </div>
                    <div>
                      <Label htmlFor="email">Email Address *</Label>
                      <Input
                        id="email"
                        type="email"
                        placeholder="your.email@example.com"
                        value={formData.email}
                        onChange={(e) => handleInputChange("email", e.target.value)}
                        className="mt-1"
                        required
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="phone">Phone Number</Label>
                      <Input
                        id="phone"
                        type="tel"
                        placeholder="(052) 123-4567"
                        value={formData.phone}
                        onChange={(e) => handleInputChange("phone", e.target.value)}
                        className="mt-1"
                      />
                    </div>
                    <div>
                      <Label htmlFor="category">Category</Label>
                      <Select value={formData.category} onValueChange={(value) => handleInputChange("category", value)}>
                        <SelectTrigger className="mt-1">
                          <SelectValue placeholder="Select category" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="billing">Billing Inquiry</SelectItem>
                          <SelectItem value="technical">Technical Support</SelectItem>
                          <SelectItem value="connection">New Connection</SelectItem>
                          <SelectItem value="complaint">Complaint</SelectItem>
                          <SelectItem value="general">General Inquiry</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>

                  <div>
                    <Label htmlFor="subject">Subject</Label>
                    <Input
                      id="subject"
                      type="text"
                      placeholder="Brief description of your inquiry"
                      value={formData.subject}
                      onChange={(e) => handleInputChange("subject", e.target.value)}
                      className="mt-1"
                    />
                  </div>

                  <div>
                    <Label htmlFor="message">Message *</Label>
                    <Textarea
                      id="message"
                      placeholder="Please provide details about your inquiry or concern..."
                      value={formData.message}
                      onChange={(e) => handleInputChange("message", e.target.value)}
                      className="mt-1 min-h-[120px]"
                      required
                    />
                  </div>

                  <Button type="submit" disabled={loading} className="w-full">
                    {loading ? (
                      "Sending..."
                    ) : (
                      <>
                        <Send className="w-4 h-4 mr-2" />
                        Send Message
                      </>
                    )}
                  </Button>
                </form>
              </CardContent>
            </Card>
          </div>

        </div>
    </GuestPage>
  );
};

export default Contact;