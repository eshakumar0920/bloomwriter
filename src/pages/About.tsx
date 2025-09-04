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
  Zap
} from "lucide-react";

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
    <div className="max-w-4xl mx-auto p-6 space-y-8">
      {/* Header */}
      <div className="text-center space-y-4">
        <div className="flex items-center justify-center gap-2 text-primary">
          <Heart className="h-8 w-8" />
        </div>
        <h1 className="text-3xl font-bold text-foreground">About BloomWriter</h1>
        <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
          A privacy-first journaling companion designed to help you understand your thoughts 
          and feelings without compromising your personal data.
        </p>
      </div>

      {/* Mission Statement */}
      <Card className="bg-gradient-trust text-primary-foreground shadow-privacy border-0">
        <CardContent className="pt-8 pb-8 text-center">
          <h2 className="text-2xl font-bold mb-4">Our Mission</h2>
          <p className="text-lg leading-relaxed">
            To provide a safe, private space for personal reflection and growth, 
            where your most intimate thoughts remain completely under your control.
          </p>
        </CardContent>
      </Card>

      {/* Key Features */}
      <div>
        <h2 className="text-2xl font-bold text-foreground mb-6 text-center">
          Why Choose BloomWriter?
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {features.map((feature, index) => (
            <Card key={index} className="shadow-float border-0 bg-card/80 backdrop-blur-sm">
              <CardContent className="pt-6">
                <div className="flex items-start gap-4">
                  <div className="p-2 bg-primary/10 rounded-lg">
                    <feature.icon className="h-6 w-6 text-primary" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-foreground mb-2">{feature.title}</h3>
                    <p className="text-sm text-muted-foreground">{feature.description}</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>

      {/* Privacy Commitment */}
      <Card className="shadow-privacy border-privacy-safe/20">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-privacy-safe">
            <Shield className="h-6 w-6" />
            Privacy Commitment
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <p className="text-foreground">
            We believe that journaling is deeply personal. That's why BloomWriter was built 
            from the ground up with privacy as the core principle, not an afterthought.
          </p>
          
          <div className="bg-privacy-safe/10 rounded-lg p-4 space-y-3">
            <h4 className="font-semibold text-privacy-safe">What We Do:</h4>
            <ul className="space-y-2 text-sm">
              <li className="flex items-center gap-2">
                <CheckCircle className="h-4 w-4 text-privacy-safe" />
                Process all data locally on your device
              </li>
              <li className="flex items-center gap-2">
                <CheckCircle className="h-4 w-4 text-privacy-safe" />
                Use Web Workers for sentiment analysis
              </li>
              <li className="flex items-center gap-2">
                <CheckCircle className="h-4 w-4 text-privacy-safe" />
                Store entries only in your browser's local storage
              </li>
              <li className="flex items-center gap-2">
                <CheckCircle className="h-4 w-4 text-privacy-safe" />
                Provide full data export and deletion controls
              </li>
            </ul>
          </div>

          <div className="bg-destructive/10 rounded-lg p-4 space-y-3">
            <h4 className="font-semibold text-destructive">What We Don't Do:</h4>
            <ul className="space-y-2 text-sm">
              <li className="flex items-center gap-2">
                <span className="w-4 h-4 text-destructive">✗</span>
                Send your data to any servers
              </li>
              <li className="flex items-center gap-2">
                <span className="w-4 h-4 text-destructive">✗</span>
                Use tracking or analytics cookies
              </li>
              <li className="flex items-center gap-2">
                <span className="w-4 h-4 text-destructive">✗</span>
                Share data with third parties
              </li>
              <li className="flex items-center gap-2">
                <span className="w-4 h-4 text-destructive">✗</span>
                Store personal information in the cloud
              </li>
            </ul>
          </div>
        </CardContent>
      </Card>

      {/* Our Principles */}
      <Card className="shadow-gentle bg-muted/50">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Users className="h-6 w-6 text-primary" />
            Our Principles
          </CardTitle>
        </CardHeader>
        <CardContent>
          <ul className="space-y-3">
            {principles.map((principle, index) => (
              <li key={index} className="flex items-start gap-3">
                <div className="w-6 h-6 bg-primary/10 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                  <span className="text-primary text-sm font-bold">{index + 1}</span>
                </div>
                <span className="text-foreground">{principle}</span>
              </li>
            ))}
          </ul>
        </CardContent>
      </Card>

      {/* Technology Stack */}
      <Card className="shadow-float border-0 bg-card/80 backdrop-blur-sm">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Zap className="h-6 w-6 text-primary" />
            Built With Privacy in Mind
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <p className="text-muted-foreground">
            BloomWriter is built using modern web technologies that prioritize client-side processing:
          </p>
          <div className="flex flex-wrap gap-2">
            <Badge variant="secondary">React 18</Badge>
            <Badge variant="secondary">TypeScript</Badge>
            <Badge variant="secondary">Web Workers</Badge>
            <Badge variant="secondary">Local Storage API</Badge>
            <Badge variant="secondary">Client-Side Encryption</Badge>
            <Badge variant="secondary">Progressive Web App</Badge>
          </div>
        </CardContent>
      </Card>

      {/* Contact & Support */}
      <Card className="shadow-gentle">
        <CardHeader>
          <CardTitle>Questions or Feedback?</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <p className="text-muted-foreground">
            We're committed to building the most trustworthy journaling experience possible. 
            If you have questions about our privacy practices or suggestions for improvement, 
            we'd love to hear from you.
          </p>
          
          <div className="flex gap-4">
            <Button variant="outline" className="flex items-center gap-2">
              <Github className="h-4 w-4" />
              Open Source
            </Button>
            <Button variant="outline" className="flex items-center gap-2">
              <Mail className="h-4 w-4" />
              Contact Us
            </Button>
          </div>
          
          <p className="text-sm text-muted-foreground">
            Remember: We can only help you if you reach out. Your journal entries always stay private.
          </p>
        </CardContent>
      </Card>
    </div>
  );
};

export default About;