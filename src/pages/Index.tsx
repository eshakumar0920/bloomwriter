import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Link } from "react-router-dom";
import { PenTool, BarChart3, Sparkles, Shield, Heart, ArrowRight } from "lucide-react";
import heroImage from "@/assets/hero-journaling.jpg";

const Index = () => {
  return (
    <div className="relative overflow-hidden min-h-screen">
      {/* Hero Background */}
      <div className="absolute inset-0 z-0">
        <div 
          className="absolute inset-0 bg-cover bg-center bg-no-repeat opacity-15"
          style={{ backgroundImage: `url(${heroImage})` }}
        />
        <div className="absolute inset-0 bg-gradient-to-br from-primary/10 via-transparent to-accent/10" />
      </div>

      {/* Floating Elements */}
      <div className="absolute top-32 left-8 w-24 h-24 bg-primary/5 rounded-full blur-2xl animate-float pointer-events-none" />
      <div className="absolute top-48 right-12 w-32 h-32 bg-accent/5 rounded-full blur-2xl animate-float pointer-events-none" style={{ animationDelay: '2s' }} />
      <div className="absolute bottom-32 left-1/3 w-28 h-28 bg-primary/5 rounded-full blur-2xl animate-float pointer-events-none" style={{ animationDelay: '4s' }} />

      <div className="relative z-10 min-h-screen flex items-center justify-center p-6">
        <div className="max-w-4xl mx-auto text-center space-y-12">
          {/* Hero Section */}
          <div className="space-y-8 animate-fade-in">
            <div className="flex items-center justify-center gap-3 text-primary animate-glow">
              <div className="p-4 bg-gradient-trust rounded-full animate-float shadow-privacy">
                <Heart className="h-12 w-12 text-primary-foreground" />
              </div>
            </div>
            
            <div className="space-y-4">
              <h1 className="text-5xl md:text-6xl font-bold">
                <span className="shimmer-text">BloomWriter</span>
              </h1>
              <div className="w-32 h-1 bg-gradient-calm mx-auto rounded-full" />
            </div>
            
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed animate-fade-in" style={{ animationDelay: '0.2s' }}>
              Your privacy-first journaling companion. Write, reflect, and discover patterns in your thoughts—all while keeping your data completely secure on your device.
            </p>
            
            {/* Privacy Badge */}
            <div className="flex items-center justify-center gap-3 text-privacy-safe text-sm font-medium bg-privacy-safe/5 backdrop-blur-sm border border-privacy-safe/20 rounded-full px-8 py-4 animate-fade-in hover-scale" style={{ animationDelay: '0.4s' }}>
              <Shield className="h-5 w-5 animate-pulse" />
              <span>Local-only processing • Your data never leaves this device</span>
            </div>
          </div>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-6 justify-center items-center animate-scale-in" style={{ animationDelay: '0.6s' }}>
            <Link to="/journal">
              <Button 
                size="lg" 
                className="bg-gradient-calm hover:bg-gradient-trust text-primary-foreground font-semibold px-10 py-6 text-lg shadow-privacy hover-scale group relative overflow-hidden min-w-[200px]"
              >
                <div className="flex items-center gap-3">
                  <PenTool className="h-6 w-6 transition-transform group-hover:scale-110" />
                  <span>New Entry</span>
                  <ArrowRight className="h-5 w-5 transition-transform group-hover:translate-x-1" />
                </div>
              </Button>
            </Link>
            
            <Link to="/dashboard">
              <Button 
                variant="outline" 
                size="lg" 
                className="border-2 border-primary/30 bg-card/50 backdrop-blur-sm hover:bg-primary/10 font-semibold px-10 py-6 text-lg shadow-gentle hover-scale group min-w-[200px]"
              >
                <div className="flex items-center gap-3">
                  <BarChart3 className="h-6 w-6 transition-transform group-hover:scale-110" />
                  <span>View Insights</span>
                  <ArrowRight className="h-5 w-5 transition-transform group-hover:translate-x-1" />
                </div>
              </Button>
            </Link>
          </div>

          {/* Feature Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl mx-auto animate-fade-in" style={{ animationDelay: '0.8s' }}>
            <Card className="shadow-float border-0 bg-card/80 backdrop-blur-sm hover-scale group">
              <CardHeader className="text-center">
                <div className="w-16 h-16 bg-gradient-calm rounded-full flex items-center justify-center mx-auto mb-4 group-hover:animate-glow">
                  <Shield className="h-8 w-8 text-primary-foreground" />
                </div>
                <CardTitle className="text-lg">Complete Privacy</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground text-center">
                  Your journal entries are processed locally and never leave your device. No servers, no tracking.
                </p>
              </CardContent>
            </Card>

            <Card className="shadow-float border-0 bg-card/80 backdrop-blur-sm hover-scale group">
              <CardHeader className="text-center">
                <div className="w-16 h-16 bg-gradient-calm rounded-full flex items-center justify-center mx-auto mb-4 group-hover:animate-glow">
                  <Sparkles className="h-8 w-8 text-primary-foreground" />
                </div>
                <CardTitle className="text-lg">AI-Powered Insights</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground text-center">
                  Discover patterns in your mood and thoughts with intelligent analysis that respects your privacy.
                </p>
              </CardContent>
            </Card>

            <Card className="shadow-float border-0 bg-card/80 backdrop-blur-sm hover-scale group">
              <CardHeader className="text-center">
                <div className="w-16 h-16 bg-gradient-calm rounded-full flex items-center justify-center mx-auto mb-4 group-hover:animate-glow">
                  <PenTool className="h-8 w-8 text-primary-foreground" />
                </div>
                <CardTitle className="text-lg">Smart Prompts</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground text-center">
                  Get personalized writing prompts based on your mood and previous entries to inspire deeper reflection.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Index;