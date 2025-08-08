import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Calendar, FileText, Clock, DollarSign, Eye } from "lucide-react";

interface BiddingItem {
  id: number;
  title: string;
  description: string;
  category: string;
  budget: string;
  deadline: string;
  publishDate: string;
  status: "open" | "closing-soon" | "closed";
}

const Biddings = () => {
  const biddingItems: BiddingItem[] = [
    {
      id: 1,
      title: "Procurement of Distribution Transformers",
      description: "Supply and delivery of 25kVA and 50kVA distribution transformers for network expansion in Gigmoto municipality.",
      category: "Equipment",
      budget: "₱2,500,000 - ₱3,000,000",
      deadline: "March 25, 2024",
      publishDate: "March 1, 2024",
      status: "open"
    },
    {
      id: 2,
      title: "Maintenance Services for Substation",
      description: "Annual preventive maintenance services for the main substation including cleaning, testing, and minor repairs.",
      category: "Services",
      budget: "₱800,000 - ₱1,200,000",
      deadline: "March 20, 2024",
      publishDate: "February 28, 2024",
      status: "closing-soon"
    },
    {
      id: 3,
      title: "Construction of New Office Building",
      description: "Construction of a two-story administrative building including architectural, structural, and electrical works.",
      category: "Construction",
      budget: "₱15,000,000 - ₱20,000,000",
      deadline: "April 15, 2024",
      publishDate: "March 5, 2024",
      status: "open"
    },
    {
      id: 4,
      title: "Supply of Electrical Cables",
      description: "Procurement of various electrical cables for distribution line rehabilitation project.",
      category: "Materials",
      budget: "₱1,500,000 - ₱2,000,000",
      deadline: "March 10, 2024",
      publishDate: "February 20, 2024",
      status: "closed"
    },
    {
      id: 5,
      title: "Vehicle Fleet Maintenance Contract",
      description: "Annual maintenance contract for FICELCO's vehicle fleet including regular servicing and emergency repairs.",
      category: "Services",
      budget: "₱600,000 - ₱900,000",
      deadline: "March 30, 2024",
      publishDate: "March 8, 2024",
      status: "open"
    }
  ];

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "open":
        return <Badge variant="default" className="bg-primary/10 text-primary">Open</Badge>;
      case "closing-soon":
        return <Badge variant="destructive">Closing Soon</Badge>;
      case "closed":
        return <Badge variant="secondary">Closed</Badge>;
      default:
        return <Badge variant="outline">{status}</Badge>;
    }
  };

  const getCategoryColor = (category: string) => {
    switch (category.toLowerCase()) {
      case "equipment":
        return "text-primary bg-primary/10";
      case "services":
        return "text-accent bg-accent/10";
      case "construction":
        return "text-secondary-foreground bg-secondary";
      case "materials":
        return "text-muted-foreground bg-muted";
      default:
        return "text-muted-foreground bg-muted";
    }
  };

  const isClosingSoon = (deadline: string) => {
    const deadlineDate = new Date(deadline);
    const today = new Date();
    const daysUntilDeadline = Math.ceil((deadlineDate.getTime() - today.getTime()) / (1000 * 60 * 60 * 24));
    return daysUntilDeadline <= 5 && daysUntilDeadline > 0;
  };

  return (
    <div className="min-h-screen py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-16">
          <h1 className="text-4xl font-bold text-foreground mb-4">Biddings & Procurement</h1>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Current bidding opportunities and procurement notices from FICELCO. 
            Qualified suppliers and contractors are invited to participate.
          </p>
        </div>

        {/* Quick Stats */}
        <section className="mb-12">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            <Card className="card-electric">
              <CardContent className="p-6 text-center">
                <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mx-auto mb-3">
                  <FileText className="w-6 h-6 text-primary" />
                </div>
                <h3 className="text-2xl font-bold text-foreground">
                  {biddingItems.filter(item => item.status === "open").length}
                </h3>
                <p className="text-sm text-muted-foreground">Open Biddings</p>
              </CardContent>
            </Card>
            
            <Card className="card-electric">
              <CardContent className="p-6 text-center">
                <div className="w-12 h-12 bg-accent/10 rounded-lg flex items-center justify-center mx-auto mb-3">
                  <Clock className="w-6 h-6 text-accent" />
                </div>
                <h3 className="text-2xl font-bold text-foreground">
                  {biddingItems.filter(item => item.status === "closing-soon").length}
                </h3>
                <p className="text-sm text-muted-foreground">Closing Soon</p>
              </CardContent>
            </Card>
            
            <Card className="card-electric">
              <CardContent className="p-6 text-center">
                <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mx-auto mb-3">
                  <DollarSign className="w-6 h-6 text-primary" />
                </div>
                <h3 className="text-lg font-bold text-foreground">₱45M+</h3>
                <p className="text-sm text-muted-foreground">Total Value</p>
              </CardContent>
            </Card>
            
            <Card className="card-electric">
              <CardContent className="p-6 text-center">
                <div className="w-12 h-12 bg-secondary rounded-lg flex items-center justify-center mx-auto mb-3">
                  <FileText className="w-6 h-6 text-secondary-foreground" />
                </div>
                <h3 className="text-2xl font-bold text-foreground">4</h3>
                <p className="text-sm text-muted-foreground">Categories</p>
              </CardContent>
            </Card>
          </div>
        </section>

        {/* Current Biddings */}
        <section className="mb-12">
          <h2 className="text-3xl font-bold text-foreground mb-8">Current Opportunities</h2>
          <div className="space-y-6">
            {biddingItems
              .filter(item => item.status !== "closed")
              .map((item) => (
                <Card key={item.id} className="card-electric">
                  <CardHeader>
                    <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4">
                      <div className="flex-1">
                        <div className="flex items-center gap-3 mb-2">
                          <CardTitle className="text-xl">{item.title}</CardTitle>
                          {getStatusBadge(item.status)}
                        </div>
                        <Badge variant="outline" className={`${getCategoryColor(item.category)} border-0 mb-3`}>
                          {item.category}
                        </Badge>
                      </div>
                      <Button variant="outline" className="sm:ml-4">
                        <Eye className="w-4 h-4 mr-2" />
                        View Details
                      </Button>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <p className="text-muted-foreground mb-6">{item.description}</p>
                    
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                      <div className="flex items-center gap-2">
                        <DollarSign className="w-4 h-4 text-muted-foreground" />
                        <div>
                          <p className="text-sm text-muted-foreground">Estimated Budget</p>
                          <p className="font-medium">{item.budget}</p>
                        </div>
                      </div>
                      
                      <div className="flex items-center gap-2">
                        <Calendar className="w-4 h-4 text-muted-foreground" />
                        <div>
                          <p className="text-sm text-muted-foreground">Deadline</p>
                          <p className={`font-medium ${isClosingSoon(item.deadline) ? 'text-destructive' : ''}`}>
                            {item.deadline}
                          </p>
                        </div>
                      </div>
                      
                      <div className="flex items-center gap-2">
                        <FileText className="w-4 h-4 text-muted-foreground" />
                        <div>
                          <p className="text-sm text-muted-foreground">Published</p>
                          <p className="font-medium">{item.publishDate}</p>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
          </div>
        </section>

        {/* Guidelines */}
        <section className="mb-12">
          <Card className="card-electric">
            <CardHeader>
              <CardTitle className="text-2xl">Bidding Guidelines</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <h3 className="font-semibold text-foreground mb-3">Requirements</h3>
                  <ul className="space-y-2 text-muted-foreground">
                    <li>• Valid business permits and licenses</li>
                    <li>• Financial capability documents</li>
                    <li>• Technical specifications compliance</li>
                    <li>• Previous project references</li>
                  </ul>
                </div>
                <div>
                  <h3 className="font-semibold text-foreground mb-3">Process</h3>
                  <ul className="space-y-2 text-muted-foreground">
                    <li>• Submit bid documents before deadline</li>
                    <li>• Attend pre-bid conference if required</li>
                    <li>• Bid opening and evaluation</li>
                    <li>• Award notification and contract signing</li>
                  </ul>
                </div>
              </div>
            </CardContent>
          </Card>
        </section>

        {/* Contact Information */}
        <section>
          <Card className="card-electric bg-hero-gradient text-white">
            <CardHeader className="text-center">
              <CardTitle className="text-2xl">Need More Information?</CardTitle>
              <p className="opacity-90">
                Contact our Procurement Office for questions about bidding opportunities
              </p>
            </CardHeader>
            <CardContent className="text-center">
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button variant="secondary" size="lg">
                  Download Bid Documents
                </Button>
                <Button variant="outline" size="lg" className="border-accent text-accent hover:bg-accent hover:text-accent-foreground">
                  Contact Procurement Office
                </Button>
              </div>
            </CardContent>
          </Card>
        </section>
      </div>
    </div>
  );
};

export default Biddings;