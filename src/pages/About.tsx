import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { 
  Shield, 
  Lock, 
  Cpu, 
  Heart, 
  Github, 
  Mail,
  CheckCircle,
  Users,
  Brain,
  Zap,
  Sparkles,
  ArrowRight,
  Star
} from "lucide-react";
import privacyImage from "@/assets/privacy-shield.jpg";

const About = () => {
  const features = [
    {
      icon: Shield,
      title: "Privacy-First Design",
      description: "Your thoughts never leave your device. Zero tracking, zero data collection."
    },
    {
      icon: Cpu,
      title: "On-Device AI",
      description: "Sentiment analysis and insights powered by local processing in Web Workers."
    },
    {
      icon: Lock,
      title: "Local-Only Storage",
      description: "All entries stored securely in your browser's local storage."
    },
    {
      icon: Brain,
      title: "Intelligent Insights",
      description: "Discover patterns in your mood and thoughts with privacy-preserving analytics."
    }
  ];

  const principles = [
    "Your data belongs to you, always",
    "Privacy is not optional, it's fundamental",
    "Transparency builds trust",
    "Simple tools, powerful insights",
    "Mental health support should be accessible"
  ];

  return (
    <div className="relative overflow-hidden">
      {/* Animated Background */}
      <div className="absolute inset-0 z-0">
        <div className="absolute top-20 left-10 w-32 h-32 bg-primary/5 rounded-full blur-2xl animate-float" />
        <div className="absolute top-40 right-20 w-40 h-40 bg-accent/5 rounded-full blur-2xl animate-float" style={{ animationDelay: '2s' }} />
        <div className="absolute bottom-40 left-1/4 w-24 h-24 bg-primary-glow/5 rounded-full blur-xl animate-float" style={{ animationDelay: '4s' }} />
        <div className="absolute bottom-20 right-1/3 w-36 h-36 bg-privacy-safe/5 rounded-full blur-2xl animate-float" style={{ animationDelay: '6s' }} />
      </div>

      <div className="relative z-10 max-w-4xl mx-auto p-6 space-y-12">
        {/* Enhanced Header */}
        <div className="text-center space-y-6 animate-fade-in">
          <div className="flex items-center justify-center gap-3 text-primary animate-glow">
            <div className="p-4 bg-gradient-trust rounded-full animate-float shadow-privacy">
              <Heart className="h-10 w-10 text-primary-foreground" />
            </div>
          </div>
          
          <div className="space-y-4">
            <h1 className="text-4xl md:text-5xl font-bold">
              <span className="shimmer-text">About BloomWriter</span>
            </h1>
            <div className="flex items-center justify-center gap-2">
              <Star className="h-5 w-5 text-yellow-500" fill="currentColor" />
              <Star className="h-5 w-5 text-yellow-500" fill="currentColor" />
              <Star className="h-5 w-5 text-yellow-500" fill="currentColor" />
              <Star className="h-5 w-5 text-yellow-500" fill="currentColor" />
              <Star className="h-5 w-5 text-yellow-500" fill="currentColor" />
              <span className="text-sm text-muted-foreground ml-2">Built with a privacy-first mindset</span>
            </div>
          </div>
          
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto leading-relaxed animate-fade-in" style={{ animationDelay: '0.2s' }}>
            A privacy-first journaling companion designed to help you understand your thoughts 
            and feelings without compromising your personal data.
          </p>
        </div>

        {/* Enhanced Mission Statement */}
        <Card className="relative overflow-hidden bg-gradient-trust text-primary-foreground shadow-privacy border-0 animate-scale-in" style={{ animationDelay: '0.4s' }}>
          <div className="absolute inset-0 opacity-20">
            <div 
              className="absolute inset-0 bg-cover bg-center bg-no-repeat"
              style={{ backgroundImage: `url(${privacyImage})` }}
            />
          </div>
          <CardContent className="relative z-10 pt-8 pb-8 text-center">
            <div className="flex items-center justify-center gap-2 mb-4">
              <Sparkles className="h-6 w-6 animate-pulse" />
              <h2 className="text-2xl font-bold">Our Mission</h2>
              <Sparkles className="h-6 w-6 animate-pulse" />
            </div>
            <p className="text-lg leading-relaxed">
              To provide a safe, private space for personal reflection and growth, 
              where your most intimate thoughts remain completely under your control.
            </p>
          </CardContent>
        </Card>

        {/* Enhanced Key Features */}
        <div className="animate-fade-in" style={{ animationDelay: '0.6s' }}>
          <h2 className="text-3xl font-bold text-foreground mb-8 text-center">
            <span className="shimmer-text">Why Choose BloomWriter?</span>
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {features.map((feature, index) => (
              <Card key={index} className="shadow-float border-0 bg-card/90 backdrop-blur-sm hover-scale group animate-scale-in glass-effect" style={{ animationDelay: `${0.8 + index * 0.1}s` }}>
                <CardContent className="pt-6">
                  <div className="flex items-start gap-4">
                    <div className="p-3 bg-gradient-calm rounded-lg group-hover:animate-glow">
                      <feature.icon className="h-6 w-6 text-primary-foreground transition-transform group-hover:scale-110" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-foreground mb-2 group-hover:text-primary transition-colors">{feature.title}</h3>
                      <p className="text-sm text-muted-foreground">{feature.description}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Enhanced Privacy Commitment */}
        <Card className="shadow-privacy border-privacy-safe/30 bg-privacy-safe/5 backdrop-blur-sm animate-fade-in" style={{ animationDelay: '1.2s' }}>
          <CardHeader>
            <CardTitle className="flex items-center gap-3 text-privacy-safe text-xl">
              <Shield className="h-7 w-7 animate-pulse" />
              Privacy Commitment
              <Badge className="bg-privacy-safe text-privacy-safe-foreground animate-glow">Verified</Badge>
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <p className="text-foreground text-lg leading-relaxed">
              We believe that journaling is deeply personal. That's why BloomWriter was built 
              from the ground up with privacy as the core principle, not an afterthought.
              <span className="text-muted-foreground"> Optional encrypted sync coming soon.</span>
            </p>
            
            <div className="grid md:grid-cols-2 gap-6">
              <div className="bg-privacy-safe/10 rounded-xl p-6 space-y-4 hover-scale">
                <h4 className="font-semibold text-privacy-safe flex items-center gap-2">
                  <CheckCircle className="h-5 w-5" />
                  What We Do:
                </h4>
                <ul className="space-y-3 text-sm">
                  <li className="flex items-start gap-3">
                    <CheckCircle className="h-4 w-4 text-privacy-safe mt-0.5 flex-shrink-0" />
                    <span>Process all data locally on your device</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <CheckCircle className="h-4 w-4 text-privacy-safe mt-0.5 flex-shrink-0" />
                    <span>Use Web Workers for sentiment analysis</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <CheckCircle className="h-4 w-4 text-privacy-safe mt-0.5 flex-shrink-0" />
                    <span>Store entries only in your browser's local storage</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <CheckCircle className="h-4 w-4 text-privacy-safe mt-0.5 flex-shrink-0" />
                    <span>Provide full data export and deletion controls</span>
                  </li>
                </ul>
              </div>

              <div className="bg-destructive/5 border border-destructive/20 rounded-xl p-6 space-y-4 hover-scale">
                <h4 className="font-semibold text-destructive flex items-center gap-2">
                  <div className="w-5 h-5 rounded-full bg-destructive/20 flex items-center justify-center">
                    <span className="text-destructive text-xs font-bold">✗</span>
                  </div>
                  What We Don't Do:
                </h4>
                <ul className="space-y-3 text-sm">
                  <li className="flex items-start gap-3">
                    <div className="w-4 h-4 rounded-full bg-destructive/20 flex items-center justify-center mt-0.5 flex-shrink-0">
                      <span className="text-destructive text-xs">✗</span>
                    </div>
                    <span>Send your data to any servers</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <div className="w-4 h-4 rounded-full bg-destructive/20 flex items-center justify-center mt-0.5 flex-shrink-0">
                      <span className="text-destructive text-xs">✗</span>
                    </div>
                    <span>Use tracking or analytics cookies</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <div className="w-4 h-4 rounded-full bg-destructive/20 flex items-center justify-center mt-0.5 flex-shrink-0">
                      <span className="text-destructive text-xs">✗</span>
                    </div>
                    <span>Share data with third parties</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <div className="w-4 h-4 rounded-full bg-destructive/20 flex items-center justify-center mt-0.5 flex-shrink-0">
                      <span className="text-destructive text-xs">✗</span>
                    </div>
                    <span>Store personal information in the cloud</span>
                  </li>
                </ul>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Enhanced Our Principles */}
        <Card className="shadow-gentle bg-gradient-subtle backdrop-blur-sm animate-fade-in" style={{ animationDelay: '1.4s' }}>
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-xl">
              <Users className="h-6 w-6 text-primary" />
              Our Principles
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid md:grid-cols-2 gap-4">
              {principles.map((principle, index) => (
                <div key={index} className="flex items-start gap-3 p-3 rounded-lg bg-card/50 hover-scale animate-fade-in" style={{ animationDelay: `${1.6 + index * 0.1}s` }}>
                  <div className="w-8 h-8 bg-gradient-calm rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                    <span className="text-primary-foreground text-sm font-bold">{index + 1}</span>
                  </div>
                  <span className="text-foreground font-medium">{principle}</span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Enhanced Technology Stack */}
        <Card className="shadow-float border-0 bg-card/90 backdrop-blur-sm animate-fade-in glass-effect" style={{ animationDelay: '1.8s' }}>
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-xl">
              <Zap className="h-6 w-6 text-primary animate-pulse" />
              Built With Privacy in Mind
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <p className="text-muted-foreground leading-relaxed">
              BloomWriter is built using modern web technologies that prioritize client-side processing:
            </p>
            <div className="flex flex-wrap gap-3">
              {[
                "React 18", "TypeScript", "Web Workers", "Local Storage API", 
                "Client-Side Encryption", "Progressive Web App"
              ].map((tech, index) => (
                <Badge 
                  key={tech} 
                  variant="secondary" 
                  className="hover-scale animate-fade-in shadow-gentle" 
                  style={{ animationDelay: `${2 + index * 0.1}s` }}
                >
                  {tech}
                </Badge>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Enhanced Contact & Support */}
        <Card className="shadow-gentle bg-gradient-trust text-primary-foreground animate-fade-in" style={{ animationDelay: '2.2s' }}>
          <CardHeader>
            <CardTitle className="text-xl">Questions or Feedback?</CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <p className="leading-relaxed">
              We're committed to building the most trustworthy journaling experience possible. 
              If you have questions about our privacy practices or suggestions for improvement, 
              we'd love to hear from you.
            </p>
            
            <div className="flex gap-4">
              <Button variant="secondary" className="flex items-center gap-2 hover-scale group bg-primary-foreground/10 border border-primary-foreground/20">
                <Github className="h-4 w-4 group-hover:animate-pulse" />
                Open Source
                <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
              </Button>
              <Button variant="secondary" className="flex items-center gap-2 hover-scale group bg-primary-foreground/10 border border-primary-foreground/20">
                <Mail className="h-4 w-4 group-hover:animate-pulse" />
                Contact Us
                <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
              </Button>
            </div>
            
            <p className="text-sm text-primary-foreground/80">
              Remember: We can only help you if you reach out. Your journal entries always stay private.
            </p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default About;