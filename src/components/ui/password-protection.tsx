import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Shield, Lock, Eye, EyeOff } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface PasswordProtectionProps {
  onAuthenticated: () => void;
}

const PasswordProtection = ({ onAuthenticated }: PasswordProtectionProps) => {
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();

  // Demo password - in real app this would be properly secured
  const DEMO_PASSWORD = "journal123";

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    // Simulate authentication delay
    await new Promise(resolve => setTimeout(resolve, 800));

    if (password === DEMO_PASSWORD) {
      localStorage.setItem("bloomwriter-authenticated", "true");
      toast({
        title: "Access Granted",
        description: "Welcome to your secure dashboard!",
      });
      onAuthenticated();
    } else {
      toast({
        title: "Access Denied",
        description: "Incorrect password. Please try again.",
        variant: "destructive",
      });
    }
    
    setIsLoading(false);
    setPassword("");
  };

  return (
    <div className="min-h-screen bg-gradient-subtle flex items-center justify-center p-6">
      <div className="w-full max-w-md">
        <Card className="shadow-float border-0 bg-card/90 backdrop-blur-lg glass-effect">
          <CardHeader className="text-center space-y-4">
            <div className="flex justify-center">
              <div className="p-4 bg-primary/10 rounded-full animate-pulse">
                <Shield className="h-8 w-8 text-primary" />
              </div>
            </div>
            <CardTitle className="text-2xl font-bold">
              Secure Dashboard Access
            </CardTitle>
            <p className="text-muted-foreground">
              Enter your password to access your personal insights
            </p>
          </CardHeader>
          
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="space-y-2">
                <label htmlFor="password" className="text-sm font-medium flex items-center gap-2">
                  <Lock className="h-4 w-4 text-primary" />
                  Password
                </label>
                <div className="relative">
                  <Input
                    id="password"
                    type={showPassword ? "text" : "password"}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="Enter your password"
                    className="pr-10 border-2 focus:border-primary"
                    required
                  />
                  <Button
                    type="button"
                    variant="ghost"
                    size="sm"
                    className="absolute right-0 top-0 h-full px-3 hover:bg-transparent"
                    onClick={() => setShowPassword(!showPassword)}
                  >
                    {showPassword ? (
                      <EyeOff className="h-4 w-4 text-muted-foreground" />
                    ) : (
                      <Eye className="h-4 w-4 text-muted-foreground" />
                    )}
                  </Button>
                </div>
              </div>

              <Button
                type="submit"
                disabled={isLoading || !password}
                className="w-full bg-gradient-calm hover:bg-gradient-trust text-primary-foreground font-semibold py-3 shadow-privacy hover-scale"
              >
                {isLoading ? (
                  <>
                    <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-primary-foreground mr-2" />
                    Verifying...
                  </>
                ) : (
                  <>
                    <Shield className="h-4 w-4 mr-2" />
                    Access Dashboard
                  </>
                )}
              </Button>
            </form>

            {/* Demo hint */}
            <div className="mt-6 p-4 bg-accent/20 border border-accent/30 rounded-lg">
              <p className="text-xs text-muted-foreground text-center">
                <strong>Demo Password:</strong> journal123
              </p>
              <p className="text-xs text-muted-foreground text-center mt-1">
                This is a mockup - in production, use proper authentication
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default PasswordProtection;