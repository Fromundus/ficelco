import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Calendar, Clock, AlertTriangle, Info, Megaphone } from "lucide-react";
import GuestPage from "@/components/custom/GuestPage";

interface NewsItem {
  id: number;
  title: string;
  summary: string;
  date: string;
  type: "announcement" | "advisory" | "alert";
  urgent?: boolean;
}

const News = () => {
  const newsItems: NewsItem[] = [
    {
      id: 1,
      title: "Scheduled Maintenance - Virac Area",
      summary: "Power interruption scheduled for March 20, 2024, from 8:00 AM to 12:00 PM for routine maintenance in Virac area.",
      date: "March 15, 2024",
      type: "advisory",
      urgent: true
    },
    {
      id: 2,
      title: "New Payment Center Opening",
      summary: "FICELCO announces the opening of a new payment center in Bato municipality for member convenience.",
      date: "March 12, 2024",
      type: "announcement"
    },
    {
      id: 3,
      title: "Energy Conservation Tips",
      summary: "Learn practical ways to reduce your electricity consumption and save on your monthly bills.",
      date: "March 10, 2024",
      type: "advisory"
    },
    {
      id: 4,
      title: "Safety Reminder: Electrical Hazards",
      summary: "Important safety guidelines to prevent electrical accidents during the rainy season.",
      date: "March 8, 2024",
      type: "alert",
      urgent: true
    },
    {
      id: 5,
      title: "Board Meeting Minutes Available",
      summary: "February 2024 board meeting minutes are now available for member review in our office.",
      date: "March 5, 2024",
      type: "announcement"
    },
    {
      id: 6,
      title: "Rate Adjustment Notice",
      summary: "Notice of upcoming rate adjustment effective April 1, 2024, following regulatory approval.",
      date: "March 1, 2024",
      type: "announcement"
    }
  ];

  const getTypeIcon = (type: string) => {
    switch (type) {
      case "announcement":
        return <Megaphone className="w-5 h-5" />;
      case "advisory":
        return <Info className="w-5 h-5" />;
      case "alert":
        return <AlertTriangle className="w-5 h-5" />;
      default:
        return <Info className="w-5 h-5" />;
    }
  };

  const getTypeBadge = (type: string, urgent?: boolean) => {
    const baseClasses = "capitalize";
    
    if (urgent) {
      return <Badge variant="destructive" className={baseClasses}>Urgent {type}</Badge>;
    }
    
    switch (type) {
      case "announcement":
        return <Badge variant="default" className={baseClasses}>{type}</Badge>;
      case "advisory":
        return <Badge variant="secondary" className={baseClasses}>{type}</Badge>;
      case "alert":
        return <Badge variant="destructive" className={baseClasses}>{type}</Badge>;
      default:
        return <Badge variant="outline" className={baseClasses}>{type}</Badge>;
    }
  };

  return (
    <GuestPage>
        {/* Header */}
        <div className="text-center mb-16">
          <h1 className="text-4xl font-bold text-foreground mb-4">News & Advisories</h1>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Stay informed with the latest announcements, advisories, and important 
            updates from FICELCO.
          </p>
        </div>

        {/* Urgent Notices */}
        {/* <section className="mb-12">
          <div className="bg-destructive/10 border border-destructive/20 rounded-lg p-6">
            <h2 className="text-2xl font-bold text-destructive mb-4 flex items-center gap-2">
              <AlertTriangle className="w-6 h-6" />
              Urgent Notices
            </h2>
            <div className="space-y-4">
              {newsItems
                .filter(item => item.urgent)
                .map((item) => (
                  <div key={item.id} className="bg-card rounded-lg p-4 border border-destructive/20">
                    <div className="flex items-start justify-between mb-2">
                      <h3 className="font-semibold text-foreground">{item.title}</h3>
                      {getTypeBadge(item.type, item.urgent)}
                    </div>
                    <p className="text-muted-foreground text-sm mb-2">{item.summary}</p>
                    <div className="flex items-center text-xs text-muted-foreground">
                      <Calendar className="w-3 h-3 mr-1" />
                      {item.date}
                    </div>
                  </div>
                ))}
            </div>
          </div>
        </section> */}

        {/* All News */}
        <section>
          <h2 className="text-3xl font-bold text-foreground mb-8">Latest Updates</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {newsItems.map((item) => (
              <Card key={item.id} className="card-electric">
                <CardHeader>
                  <div className="flex items-start justify-between mb-2">
                    <div className="flex items-center gap-2">
                      {getTypeIcon(item.type)}
                    </div>
                    {getTypeBadge(item.type, item.urgent)}
                  </div>
                  <CardTitle className="text-lg line-clamp-2">{item.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground text-sm mb-4 line-clamp-3">
                    {item.summary}
                  </p>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center text-xs text-muted-foreground">
                      <Calendar className="w-3 h-3 mr-1" />
                      {item.date}
                    </div>
                    <Button variant="outline" size="sm">
                      Read More
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>

        {/* Newsletter Signup */}
        {/* <section className="mt-16">
          <Card className="card-electric">
            <CardHeader className="text-center">
              <CardTitle className="text-2xl">Stay Updated</CardTitle>
              <p className="text-muted-foreground">
                Get the latest news and important announcements delivered to you
              </p>
            </CardHeader>
            <CardContent className="text-center">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div>
                  <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mx-auto mb-3">
                    <Megaphone className="w-6 h-6" />
                  </div>
                  <h3 className="font-semibold mb-2">Text Alerts</h3>
                  <p className="text-sm text-muted-foreground">
                    Receive urgent notifications via SMS
                  </p>
                </div>
                <div>
                  <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mx-auto mb-3">
                    <Clock className="w-6 h-6" />
                  </div>
                  <h3 className="font-semibold mb-2">Email Updates</h3>
                  <p className="text-sm text-muted-foreground">
                    Weekly digest of news and announcements
                  </p>
                </div>
                <div>
                  <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mx-auto mb-3">
                    <Info className="w-6 h-6" />
                  </div>
                  <h3 className="font-semibold mb-2">Website</h3>
                  <p className="text-sm text-muted-foreground">
                    Check our website for the latest updates
                  </p>
                </div>
              </div>
              <Button className="mt-6" size="lg">
                Subscribe to Updates
              </Button>
            </CardContent>
          </Card>
        </section> */}
    </GuestPage>
  );
};

export default News;