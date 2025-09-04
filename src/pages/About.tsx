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
      icon: Heart,
      title: "Your Safe Space",
      description: "Create a judgment-free zone where your authentic self can flourish and grow."
    },
    {
      icon: Brain,
      title: "Discover Yourself",
      description: "Uncover patterns in your thoughts and feelings that help you understand yourself better."
    },
    {
      icon: Shield,
      title: "Complete Privacy",
      description: "Your personal thoughts stay completely private - no sharing, no storing, no peeking."
    },
    {
      icon: Sparkles,
      title: "Daily Growth",
      description: "Turn everyday moments into opportunities for self-reflection and personal development."
    }
  ];

  const stories = [
    {
      icon: Users,
      title: "Sarah, Teacher",
      quote: "Finally found a place where I can process my thoughts without worrying about privacy.",
      benefit: "Better emotional awareness"
    },
    {
      icon: Heart,
      title: "Mike, Student", 
      quote: "Helped me understand my stress patterns and develop healthier coping mechanisms.",
      benefit: "Improved mental health"
    },
    {
      icon: Sparkles,
      title: "Ana, Parent",
      quote: "A few minutes of journaling each day has transformed how I handle daily challenges.",
      benefit: "Enhanced resilience"
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
            Hey there! 👋 We're so glad you're here. BloomWriter isn't just another app—it's your personal sanctuary 
            for growth, self-discovery, and those beautiful "aha!" moments that happen when you give your thoughts space to breathe.
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
              We believe everyone deserves a safe space to explore their thoughts, celebrate their wins, 
              and work through life's challenges. BloomWriter is here to be your companion on that journey—
              offering gentle insights while keeping your most personal moments completely private.
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

        {/* User Stories & Community */}
        <div className="animate-fade-in" style={{ animationDelay: '1.2s' }}>
          <h2 className="text-3xl font-bold text-foreground mb-8 text-center">
            <span className="shimmer-text">Real People, Real Growth</span>
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {stories.map((story, index) => (
              <Card key={index} className="shadow-float border-0 bg-card/90 backdrop-blur-sm hover-scale group animate-scale-in glass-effect text-center" style={{ animationDelay: `${1.4 + index * 0.1}s` }}>
                <CardContent className="pt-6">
                  <div className="flex flex-col items-center gap-4">
                    <div className="p-3 bg-gradient-calm rounded-full group-hover:animate-glow">
                      <story.icon className="h-6 w-6 text-primary-foreground" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-foreground mb-2">{story.title}</h3>
                      <blockquote className="text-sm text-muted-foreground italic mb-3">
                        "{story.quote}"
                      </blockquote>
                      <Badge variant="secondary" className="bg-primary/10 text-primary">
                        {story.benefit}
                      </Badge>
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

        {/* What Drives Us */}
        <Card className="shadow-gentle bg-gradient-subtle backdrop-blur-sm animate-fade-in" style={{ animationDelay: '1.4s' }}>
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-xl">
              <Heart className="h-6 w-6 text-primary" />
              What Drives Us
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-muted-foreground mb-6 leading-relaxed">
              Every feature we build comes from a place of genuine care for your well-being and personal growth:
            </p>
            <div className="grid md:grid-cols-2 gap-4">
              {[
                "Your thoughts deserve a safe home 🏡",
                "Growth happens in comfortable spaces 🌱", 
                "Everyone's journey is unique and valid ✨",
                "Small daily reflections create big changes 💫",
                "Privacy enables authentic self-expression 🔒"
              ].map((value, index) => (
                <div key={index} className="flex items-start gap-3 p-4 rounded-lg bg-card/50 hover-scale animate-fade-in" style={{ animationDelay: `${1.6 + index * 0.1}s` }}>
                  <div className="w-8 h-8 bg-gradient-calm rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                    <Heart className="h-4 w-4 text-primary-foreground" />
                  </div>
                  <span className="text-foreground font-medium">{value}</span>
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

        {/* Join Our Community */}
        <Card className="shadow-gentle bg-gradient-trust text-primary-foreground animate-fade-in" style={{ animationDelay: '2.2s' }}>
          <CardHeader>
            <CardTitle className="text-xl">Join Our Growing Community 💬</CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <p className="leading-relaxed">
              You're not alone on this journey! We've created a warm, supportive space where people share their 
              experiences and support each other's growth. Plus, your feedback helps us make BloomWriter even better 
              for everyone.
            </p>
            
            <div className="flex gap-4">
              <Button variant="secondary" className="flex items-center gap-2 hover-scale group bg-primary-foreground/10 border border-primary-foreground/20">
                <Github className="h-4 w-4 group-hover:animate-pulse" />
                Contribute
                <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
              </Button>
              <Button variant="secondary" className="flex items-center gap-2 hover-scale group bg-primary-foreground/10 border border-primary-foreground/20">
                <Mail className="h-4 w-4 group-hover:animate-pulse" />
                Say Hello
                <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
              </Button>
            </div>
            
            <p className="text-sm text-primary-foreground/80">
              💝 We read every message and genuinely care about your experience. Your privacy is always protected—
              we're just here to listen and help!
            </p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default About;