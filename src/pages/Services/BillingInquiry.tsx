import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Search, CreditCard, Calendar, DollarSign } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import InputWithLabel from "@/components/custom/InputWithLabel";
import GuestPage from "@/components/custom/GuestPage";

const BillingInquiry = () => {
  const [accountNumber, setAccountNumber] = useState("");

  const [data, setData] = useState({
    account_number: "",
    sequence: "",
  });

  const [loading, setLoading] = useState(false);
  const { toast } = useToast();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;

    setData((prev) => {
      return {
        ...prev,
        [name]: value
      }
    });
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!accountNumber.trim()) {
      toast({
        title: "Account Number Required",
        description: "Please enter your account number to search for billing information.",
        variant: "destructive",
      });
      return;
    }

    setLoading(true);
    
    // Simulate API call
    setTimeout(() => {
      setLoading(false);
      toast({
        title: "Search Complete",
        description: "Billing information retrieved successfully.",
      });
    }, 2000);
  };

  return (
    <GuestPage childrenMaxWidth="max-w-4xl" title="Billing Inquiry">
        <span className="flex w-full justify-center">Coming soon...</span>

        {/* <Card className="card-electric mb-8">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Search className="w-5 h-5 text-primary" />
              Account Search
            </CardTitle>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-4">
              <InputWithLabel
                  id="account_number"
                  name="account_number"
                  type="text"
                  placeholder="Enter your account number"
                  value={accountNumber}
                  onChange={handleChange}
                  label="Account Number"
              />
              <InputWithLabel
                  id="sequence"
                  name="sequence"
                  type="text"
                  placeholder="Enter your sequence"
                  value={accountNumber}
                  onChange={handleChange}
                  label="Sequence (First 4 characters)"
              />
              <Button type="submit" disabled={loading} className="w-full">
                {loading ? "Searching..." : "Search Billing Information"}
              </Button>
            </form>
          </CardContent>
        </Card> */}

        {/* <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
          <Card className="card-electric">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <CreditCard className="w-5 h-5 text-primary" />
                Current Bill
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Amount Due:</span>
                  <span className="font-semibold">₱2,450.00</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Due Date:</span>
                  <span className="font-medium">March 15, 2024</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">kWh Used:</span>
                  <span className="font-medium">245 kWh</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Status:</span>
                  <span className="text-primary font-medium">Paid</span>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="card-electric">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Calendar className="w-5 h-5" />
                Billing Period
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Period:</span>
                  <span className="font-medium">Feb 15 - Mar 14, 2024</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Reading Date:</span>
                  <span className="font-medium">March 14, 2024</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Previous Reading:</span>
                  <span className="font-medium">15,230 kWh</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Current Reading:</span>
                  <span className="font-medium">15,475 kWh</span>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        <Card className="card-electric">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <DollarSign className="w-5 h-5 text-primary" />
              Payment Options
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="text-center p-4 border rounded-lg hover:bg-secondary transition-colors">
                <h3 className="font-semibold mb-2">Online Banking</h3>
                <p className="text-sm text-muted-foreground">
                  Pay through your bank's online platform
                </p>
              </div>
              <div className="text-center p-4 border rounded-lg hover:bg-secondary transition-colors">
                <h3 className="font-semibold mb-2">Payment Centers</h3>
                <p className="text-sm text-muted-foreground">
                  Visit authorized payment centers
                </p>
              </div>
              <div className="text-center p-4 border rounded-lg hover:bg-secondary transition-colors">
                <h3 className="font-semibold mb-2">FICELCO Office</h3>
                <p className="text-sm text-muted-foreground">
                  Pay directly at our main office
                </p>
              </div>
            </div>
          </CardContent>
        </Card> */}
    </GuestPage>
  );
};

export default BillingInquiry;