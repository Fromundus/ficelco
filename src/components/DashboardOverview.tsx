import { 
  Users, 
  CreditCard, 
  AlertTriangle, 
  Gavel,
  TrendingUp,
  TrendingDown,
  Zap,
  DollarSign,
  Newspaper
} from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

const stats = [
  {
    title: "Total Members",
    value: "61,293",
    change: "+12%",
    trending: "up",
    icon: Users,
    description: "Active electric consumers"
  },
  {
    title: "Unpaid Bills",
    value: "₱324,500",
    change: "-8%",
    trending: "down", 
    icon: CreditCard,
    description: "Outstanding balance"
  },
  {
    title: "Current Outages",
    value: "3",
    change: "+2",
    trending: "up",
    icon: AlertTriangle,
    description: "Areas affected"
  },
  {
    title: "Active Biddings",
    value: "7",
    change: "+1",
    trending: "up",
    icon: Gavel,
    description: "Open procurement"
  },
];

const recentActivities = [
  {
    type: "payment",
    message: "Payment received from Juan Dela Cruz",
    amount: "₱2,340",
    time: "2 minutes ago"
  },
  {
    type: "outage",
    message: "Power outage reported in Barangay San Miguel",
    time: "15 minutes ago"
  },
  {
    type: "member",
    message: "New member registration: Maria Santos",
    time: "1 hour ago"
  },
  {
    type: "billing",
    message: "Monthly billing cycle completed",
    time: "2 hours ago"
  },
];

const upcomingTasks = [
  {
    title: "Monthly billing generation",
    dueDate: "Tomorrow",
    priority: "high"
  },
  {
    title: "Equipment maintenance inspection",
    dueDate: "Dec 15, 2024",
    priority: "medium"
  },
  {
    title: "Board meeting preparation",
    dueDate: "Dec 20, 2024",
    priority: "low"
  },
];

export function DashboardOverview() {
  return (
    <div className="space-y-6 animate-fade-in">
      {/* Header */}
      <div className="space-y-2">
        <h1 className="text-3xl font-bold text-foreground">Dashboard Overview</h1>
        <p className="text-muted-foreground">
          Welcome back! Here's what's happening at FICELCO today.
        </p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, index) => (
          <Card key={stat.title} className="animate-fade-in shadow-soft hover:shadow-electric transition-all duration-300" style={{ animationDelay: `${index * 100}ms` }}>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">
                {stat.title}
              </CardTitle>
              <div className="p-2 electric-gradient rounded-lg">
                <stat.icon className="h-4 w-4 text-white" />
              </div>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-foreground">{stat.value}</div>
              <div className="flex items-center gap-2 mt-2">
                <div className={`flex items-center gap-1 text-sm ${
                  stat.trending === 'up' ? 'text-success' : 'text-accent'
                }`}>
                  {stat.trending === 'up' ? (
                    <TrendingUp className="h-3 w-3" />
                  ) : (
                    <TrendingDown className="h-3 w-3" />
                  )}
                  {stat.change}
                </div>
                <span className="text-xs text-muted-foreground">from last month</span>
              </div>
              <p className="text-xs text-muted-foreground mt-1">{stat.description}</p>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Main Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Recent Activities */}
        <Card className="lg:col-span-2 shadow-soft">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Zap className="h-5 w-5 text-primary" />
              Recent Activities
            </CardTitle>
            <CardDescription>Latest updates and system activities</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {recentActivities.map((activity, index) => (
              <div key={index} className="flex items-start gap-3 p-3 rounded-lg bg-secondary/50 hover:bg-secondary transition-colors">
                <div className={`p-1.5 rounded-full ${
                  activity.type === 'payment' ? 'bg-success/20 text-success' :
                  activity.type === 'outage' ? 'bg-accent/20 text-accent' :
                  activity.type === 'member' ? 'bg-primary/20 text-primary' :
                  'bg-warning/20 text-warning'
                }`}>
                  {activity.type === 'payment' && <DollarSign className="h-3 w-3" />}
                  {activity.type === 'outage' && <AlertTriangle className="h-3 w-3" />}
                  {activity.type === 'member' && <Users className="h-3 w-3" />}
                  {activity.type === 'billing' && <CreditCard className="h-3 w-3" />}
                </div>
                <div className="flex-1">
                  <p className="text-sm font-medium text-foreground">{activity.message}</p>
                  {activity.amount && (
                    <p className="text-sm font-semibold text-success">{activity.amount}</p>
                  )}
                  <p className="text-xs text-muted-foreground">{activity.time}</p>
                </div>
              </div>
            ))}
            <Button variant="outline" className="w-full mt-4">
              View All Activities
            </Button>
          </CardContent>
        </Card>

        {/* Upcoming Tasks */}
        <Card className="shadow-soft">
          <CardHeader>
            <CardTitle>Upcoming Tasks</CardTitle>
            <CardDescription>Important deadlines and reminders</CardDescription>
          </CardHeader>
          <CardContent className="space-y-3">
            {upcomingTasks.map((task, index) => (
              <div key={index} className="p-3 rounded-lg border border-border hover:bg-secondary/50 transition-colors">
                <div className="flex items-start justify-between gap-2">
                  <h4 className="text-sm font-medium text-foreground">{task.title}</h4>
                  <Badge variant={
                    task.priority === 'high' ? 'destructive' :
                    task.priority === 'medium' ? 'default' : 'secondary'
                  } className="text-xs">
                    {task.priority}
                  </Badge>
                </div>
                <p className="text-xs text-muted-foreground mt-1">{task.dueDate}</p>
              </div>
            ))}
            <Button className="w-full electric-gradient hover:opacity-90 transition-opacity">
              View All Tasks
            </Button>
          </CardContent>
        </Card>
      </div>

      {/* Quick Actions */}
      <Card className="shadow-soft">
        <CardHeader>
          <CardTitle>Quick Actions</CardTitle>
          <CardDescription>Frequently used administrative functions</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <Button variant="outline" className="h-auto p-4 flex flex-col gap-2 hover:shadow-soft transition-all">
              <Users className="h-6 w-6 text-primary" />
              <span className="text-sm font-medium">Add Member</span>
            </Button>
            <Button variant="outline" className="h-auto p-4 flex flex-col gap-2 hover:shadow-soft transition-all">
              <CreditCard className="h-6 w-6 text-primary" />
              <span className="text-sm font-medium">Generate Bill</span>
            </Button>
            <Button variant="outline" className="h-auto p-4 flex flex-col gap-2 hover:shadow-soft transition-all">
              <Newspaper className="h-6 w-6 text-primary" />
              <span className="text-sm font-medium">Post News</span>
            </Button>
            <Button variant="outline" className="h-auto p-4 flex flex-col gap-2 hover:shadow-soft transition-all">
              <AlertTriangle className="h-6 w-6 text-primary" />
              <span className="text-sm font-medium">Report Outage</span>
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}