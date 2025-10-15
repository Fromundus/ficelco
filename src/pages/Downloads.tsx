import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { 
  Download, 
  FileText, 
  File, 
  Image, 
  Calendar,
  FileCheck,
  Folder
} from "lucide-react";
import GuestPage from "@/components/custom/GuestPage";

interface DownloadItem {
  id: number;
  title: string;
  description: string;
  category: string;
  fileType: string;
  fileSize: string;
  dateAdded: string;
  downloadCount: number;
}

const Downloads = () => {
  const downloadItems: DownloadItem[] = [
    {
      id: 1,
      title: "Member Application Form",
      description: "Application form for new FICELCO membership",
      category: "Forms",
      fileType: "PDF",
      fileSize: "2.5 MB",
      dateAdded: "March 15, 2024",
      downloadCount: 245
    },
    {
      id: 2,
      title: "Service Connection Requirements",
      description: "Complete list of requirements for new service connections",
      category: "Guidelines",
      fileType: "PDF",
      fileSize: "1.8 MB",
      dateAdded: "March 12, 2024",
      downloadCount: 189
    },
    {
      id: 3,
      title: "2023 Annual Report",
      description: "FICELCO's comprehensive annual report for 2023",
      category: "Reports",
      fileType: "PDF",
      fileSize: "15.2 MB",
      dateAdded: "March 10, 2024",
      downloadCount: 156
    },
    {
      id: 4,
      title: "Rate Schedule 2024",
      description: "Current electricity rate schedule effective 2024",
      category: "Rates",
      fileType: "PDF",
      fileSize: "1.2 MB",
      dateAdded: "March 8, 2024",
      downloadCount: 312
    },
    {
      id: 5,
      title: "Safety Guidelines Poster",
      description: "Electrical safety guidelines poster for download and printing",
      category: "Safety",
      fileType: "PNG",
      fileSize: "3.8 MB",
      dateAdded: "March 5, 2024",
      downloadCount: 89
    },
    {
      id: 6,
      title: "Billing Dispute Form",
      description: "Form for filing billing disputes and complaints",
      category: "Forms",
      fileType: "PDF",
      fileSize: "1.5 MB",
      dateAdded: "March 1, 2024",
      downloadCount: 67
    },
    {
      id: 7,
      title: "Cooperative Bylaws",
      description: "FICELCO's official cooperative bylaws and regulations",
      category: "Legal",
      fileType: "PDF",
      fileSize: "4.2 MB",
      dateAdded: "February 28, 2024",
      downloadCount: 134
    },
    {
      id: 8,
      title: "Energy Efficiency Tips Brochure",
      description: "Practical tips for reducing electricity consumption",
      category: "Guidelines",
      fileType: "PDF",
      fileSize: "2.1 MB",
      dateAdded: "February 25, 2024",
      downloadCount: 203
    }
  ];

  const categories = [
    { name: "All", count: downloadItems.length },
    { name: "Forms", count: downloadItems.filter(item => item.category === "Forms").length },
    { name: "Guidelines", count: downloadItems.filter(item => item.category === "Guidelines").length },
    { name: "Reports", count: downloadItems.filter(item => item.category === "Reports").length },
    { name: "Legal", count: downloadItems.filter(item => item.category === "Legal").length },
    { name: "Safety", count: downloadItems.filter(item => item.category === "Safety").length }
  ];

  const getFileIcon = (fileType: string) => {
    switch (fileType.toLowerCase()) {
      case "pdf":
        return <FileText className="w-5 h-5 text-red-600" />;
      case "png":
      case "jpg":
      case "jpeg":
        return <Image className="w-5 h-5 text-blue-600" />;
      default:
        return <File className="w-5 h-5 text-gray-600" />;
    }
  };

  const getCategoryIcon = (category: string) => {
    switch (category.toLowerCase()) {
      case "forms":
        return <FileCheck className="w-5 h-5 text-green-600" />;
      case "reports":
        return <FileText className="w-5 h-5 text-blue-600" />;
      case "legal":
        return <File className="w-5 h-5 text-purple-600" />;
      default:
        return <Folder className="w-5 h-5 text-orange-600" />;
    }
  };

  return (
    <GuestPage>
        {/* Header */}
        <div className="text-center mb-16">
          <h1 className="text-4xl font-bold text-foreground mb-4">Downloads</h1>
          {/* <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Access important documents, forms, and resources from FICELCO. 
            Download what you need for membership, services, and compliance.
          </p> */}
        </div>

        <span className="flex w-full justify-center">Coming soon...</span>

        {/* Categories Filter */}
        {/* <section className="mb-12">
          <Card className="card-electric">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Folder className="w-5 h-5 text-primary" />
                Document Categories
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
                {categories.map((category, index) => (
                  <Button
                    key={index}
                    variant={category.name === "All" ? "default" : "outline"}
                    className="flex items-center justify-between h-auto p-4"
                  >
                    <div className="text-left">
                      <div className="font-medium">{category.name}</div>
                      <div className="text-xs opacity-70">{category.count} files</div>
                    </div>
                  </Button>
                ))}
              </div>
            </CardContent>
          </Card>
        </section> */}

        {/* Downloads List */}
        {/* <section>
          <h2 className="text-3xl font-bold text-foreground mb-8">Available Downloads</h2>
          <div className="grid grid-cols-1 gap-6">
            {downloadItems.map((item) => (
              <Card key={item.id} className="card-electric">
                <CardHeader>
                  <div className="flex items-start justify-between">
                    <div className="flex items-start space-x-3">
                      <div className="mt-1">
                        {getFileIcon(item.fileType)}
                      </div>
                      <div className="flex-1">
                        <CardTitle className="text-lg line-clamp-2">{item.title}</CardTitle>
                        <p className="text-sm text-muted-foreground mt-1">{item.description}</p>
                      </div>
                    </div>
                    <Badge variant="outline" className="ml-2">
                      {item.category}
                    </Badge>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="flex items-center justify-between text-sm text-muted-foreground mb-4">
                    <div className="flex items-center space-x-4">
                      <span className="flex items-center gap-1">
                        <FileText className="w-3 h-3" />
                        {item.fileType}
                      </span>
                      <span>{item.fileSize}</span>
                    </div>
                    <div className="flex items-center space-x-4">
                      <span className="flex items-center gap-1">
                        <Calendar className="w-3 h-3" />
                        {item.dateAdded}
                      </span>
                      <span>{item.downloadCount} downloads</span>
                    </div>
                  </div>
                  <Button className="w-full" variant="outline">
                    <Download className="w-4 h-4 mr-2" />
                    Download
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </section> */}

        {/* Help Section */}
        {/* <section className="mt-16">
          <Card className="card-electric bg-hero-gradient">
            <CardHeader className="text-center">
              <CardTitle className="text-2xl">Need Help with Downloads?</CardTitle>
              <p className="opacity-90">
                Can't find what you're looking for or having trouble with downloads?
              </p>
            </CardHeader>
            <CardContent className="text-center">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
                <div>
                  <FileText className="w-8 h-8 mx-auto mb-2 opacity-90" />
                  <h3 className="font-semibold mb-1">Document Request</h3>
                  <p className="text-sm opacity-75">Request specific documents not available online</p>
                </div>
                <div>
                  <Download className="w-8 h-8 mx-auto mb-2 opacity-90" />
                  <h3 className="font-semibold mb-1">Technical Support</h3>
                  <p className="text-sm opacity-75">Get help with download issues</p>
                </div>
                <div>
                  <Calendar className="w-8 h-8 mx-auto mb-2 opacity-90" />
                  <h3 className="font-semibold mb-1">Update Notifications</h3>
                  <p className="text-sm opacity-75">Get notified when new documents are available</p>
                </div>
              </div>
              <Button variant="secondary" size="lg">
                Contact Document Support
              </Button>
            </CardContent>
          </Card>
        </section> */}
    </GuestPage>
  );
};

export default Downloads;