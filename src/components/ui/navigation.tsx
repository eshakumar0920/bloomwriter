import { Link, useLocation } from "react-router-dom";
import { BookOpen, BarChart3, Settings, Info, Shield, LogOut } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";

const navigation = [
  { name: "Journal", href: "/journal", icon: BookOpen },
  { name: "Dashboard", href: "/dashboard", icon: BarChart3 },
  { name: "Settings", href: "/settings", icon: Settings },
  { name: "About", href: "/about", icon: Info },
];

const Navigation = () => {
  const location = useLocation();
  const { toast } = useToast();

  const handleLogout = () => {
    localStorage.removeItem("bloomwriter-authenticated");
    toast({
      title: "Logged Out",
      description: "You have been securely logged out.",
    });
    // Force reload to reset authentication state
    window.location.reload();
  };

  return (
    <nav className="bg-card border-b border-border shadow-gentle">
      <div className="max-w-6xl mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link to="/journal" className="flex items-center gap-2 text-primary font-semibold">
            <Shield className="h-6 w-6" />
            <span className="text-lg">BloomWriter</span>
          </Link>

          {/* Privacy Badge */}
          <div className="hidden md:flex items-center gap-2 px-3 py-1 bg-accent rounded-full text-accent-foreground text-sm font-medium">
            <div className="w-2 h-2 bg-privacy-safe rounded-full animate-pulse" />
            Local-only
          </div>

          {/* Navigation Links */}
          <div className="flex items-center gap-1">
            {navigation.map((item) => {
              const isActive = location.pathname === item.href || 
                             (item.href === '/journal' && location.pathname === '/');
              
              return (
                <Link
                  key={item.name}
                  to={item.href}
                  className={cn(
                    "flex items-center gap-2 px-3 py-2 rounded-lg text-sm font-medium transition-all duration-200",
                    isActive
                      ? "bg-primary text-primary-foreground shadow-gentle"
                      : "text-muted-foreground hover:text-foreground hover:bg-secondary"
                  )}
                >
                  <item.icon className="h-4 w-4" />
                  <span className="hidden sm:block">{item.name}</span>
                </Link>
              );
            })}
            
            {/* Logout Button */}
            <Button
              variant="ghost"
              size="sm"
              onClick={handleLogout}
              className="ml-2 text-muted-foreground hover:text-foreground"
              title="Logout"
            >
              <LogOut className="h-4 w-4" />
              <span className="hidden sm:block ml-2">Logout</span>
            </Button>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navigation;