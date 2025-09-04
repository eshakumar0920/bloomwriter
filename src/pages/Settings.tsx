import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Badge } from "@/components/ui/badge";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { 
  Shield, 
  Download, 
  Trash2, 
  Lock, 
  Bell, 
  Database,
  AlertTriangle,
  CheckCircle,
  Key
} from "lucide-react";
import { LocalStorage } from "@/lib/storage";
import { AppSettings } from "@/types/journal";
import { useToast } from "@/hooks/use-toast";

const Settings = () => {
  const [settings, setSettings] = useState<AppSettings>(LocalStorage.getSettings());
  const [isLoading, setIsLoading] = useState(false);
  const [showPasscodeModal, setShowPasscodeModal] = useState(false);
  const [passcode, setPasscode] = useState("");
  const [confirmPasscode, setConfirmPasscode] = useState("");
  const { toast } = useToast();

  useEffect(() => {
    setSettings(LocalStorage.getSettings());
  }, []);

  const handleSettingChange = (key: keyof AppSettings, value: any) => {
    const newSettings = { ...settings, [key]: value };
    setSettings(newSettings);
    LocalStorage.saveSettings(newSettings);
    
    toast({
      title: "Settings Updated",
      description: "Your privacy preferences have been saved.",
    });
  };

  const handleExportData = () => {
    try {
      const data = LocalStorage.exportData();
      const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
      const url = URL.createObjectURL(blob);
      
      const a = document.createElement('a');
      a.href = url;
      a.download = `bloomwriter-backup-${new Date().toISOString().split('T')[0]}.json`;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      URL.revokeObjectURL(url);
      
      toast({
        title: "Data Exported",
        description: "Your journal data has been downloaded securely.",
      });
    } catch (error) {
      toast({
        title: "Export Failed",
        description: "Unable to export data. Please try again.",
        variant: "destructive",
      });
    }
  };

  const handleClearData = () => {
    const confirmed = window.confirm(
      "Are you sure you want to delete all your journal entries? This action cannot be undone."
    );
    
    if (confirmed) {
      LocalStorage.clearAllData();
      setSettings(LocalStorage.getSettings());
      
      toast({
        title: "Data Cleared",
        description: "All journal entries have been permanently deleted.",
      });
    }
  };

  const handleSetPasscode = () => {
    if (!passcode || passcode.length < 4) {
      toast({
        title: "Invalid Passcode",
        description: "Passcode must be at least 4 characters long.",
        variant: "destructive",
      });
      return;
    }

    if (passcode !== confirmPasscode) {
      toast({
        title: "Passcode Mismatch",
        description: "Passcodes do not match. Please try again.",
        variant: "destructive",
      });
      return;
    }

    // Set the authentication flag and store the passcode hash
    localStorage.setItem("bloomwriter-authenticated", "true");
    localStorage.setItem("bloomwriter-passcode", btoa(passcode)); // Simple encoding, not secure but fine for demo
    
    setShowPasscodeModal(false);
    setPasscode("");
    setConfirmPasscode("");
    
    toast({
      title: "Passcode Set",
      description: "Your app passcode has been set successfully. You can now access the Dashboard.",
    });
  };

  const isPasscodeSet = localStorage.getItem("bloomwriter-passcode") !== null;

  return (
    <div className="max-w-4xl mx-auto p-6 space-y-8">
      {/* Header */}
      <div className="text-center space-y-4">
        <div className="flex items-center justify-center gap-2 text-primary">
          <Shield className="h-8 w-8" />
        </div>
        <h1 className="text-3xl font-bold text-foreground">Privacy & Settings</h1>
        <p className="text-muted-foreground max-w-2xl mx-auto">
          Manage your privacy preferences and data. Your control, your data, your peace of mind.
        </p>
      </div>

      {/* Privacy Status */}
      <Card className="bg-privacy-safe/10 border-privacy-safe/20 shadow-privacy">
        <CardContent className="pt-6">
          <div className="flex items-center gap-3">
            <CheckCircle className="h-6 w-6 text-privacy-safe" />
            <div>
              <h3 className="font-semibold text-foreground">Privacy-First Mode Active</h3>
              <p className="text-sm text-muted-foreground">
                All data stays on your device. No cloud storage, no tracking, no external access.
              </p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Privacy Settings */}
      <Card className="shadow-float border-0 bg-card/80 backdrop-blur-sm">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Lock className="h-5 w-5 text-primary" />
            Privacy Controls
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="flex items-center justify-between">
            <div className="space-y-1">
              <Label htmlFor="local-only" className="text-base font-medium">
                Local-Only Mode
              </Label>
              <p className="text-sm text-muted-foreground">
                Keep all data on this device only
              </p>
            </div>
            <div className="flex items-center gap-2">
              <Switch
                id="local-only"
                checked={settings.localOnly}
                onCheckedChange={(checked) => handleSettingChange('localOnly', checked)}
              />
              <Badge variant="secondary" className="text-privacy-safe border-privacy-safe/20">
                Recommended
              </Badge>
            </div>
          </div>

          <div className="flex items-center justify-between opacity-50">
            <div className="space-y-1">
              <Label htmlFor="e2ee" className="text-base font-medium flex items-center gap-2">
                End-to-End Encryption
                <Badge variant="outline" className="text-xs">Beta</Badge>
              </Label>
              <p className="text-sm text-muted-foreground">
                Encrypt data for optional secure sync
              </p>
            </div>
            <Switch
              id="e2ee"
              checked={settings.e2eeEnabled}
              onCheckedChange={(checked) => handleSettingChange('e2eeEnabled', checked)}
              disabled
            />
          </div>

          <div className="flex items-center justify-between">
            <div className="space-y-1">
              <Label htmlFor="app-passcode" className="text-base font-medium">
                App Passcode
              </Label>
              <p className="text-sm text-muted-foreground">
                {isPasscodeSet ? "Passcode is set for Dashboard access" : "Set a passcode to secure Dashboard access"}
              </p>
            </div>
            <Dialog open={showPasscodeModal} onOpenChange={setShowPasscodeModal}>
              <DialogTrigger asChild>
                <Button variant="outline" size="sm">
                  <Key className="h-4 w-4 mr-2" />
                  {isPasscodeSet ? "Change Passcode" : "Set Passcode"}
                </Button>
              </DialogTrigger>
              <DialogContent className="sm:max-w-md">
                <DialogHeader>
                  <DialogTitle>Set App Passcode</DialogTitle>
                </DialogHeader>
                <div className="space-y-4 py-4">
                  <div className="space-y-2">
                    <Label htmlFor="passcode">Enter Passcode</Label>
                    <Input
                      id="passcode"
                      type="password"
                      placeholder="Enter at least 4 characters"
                      value={passcode}
                      onChange={(e) => setPasscode(e.target.value)}
                      maxLength={20}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="confirm-passcode">Confirm Passcode</Label>
                    <Input
                      id="confirm-passcode"
                      type="password"
                      placeholder="Confirm your passcode"
                      value={confirmPasscode}
                      onChange={(e) => setConfirmPasscode(e.target.value)}
                      maxLength={20}
                    />
                  </div>
                  <div className="flex gap-2 pt-2">
                    <Button 
                      onClick={handleSetPasscode}
                      className="flex-1 bg-gradient-calm hover:bg-gradient-trust"
                    >
                      Set Passcode
                    </Button>
                    <Button 
                      variant="outline" 
                      onClick={() => {
                        setShowPasscodeModal(false);
                        setPasscode("");
                        setConfirmPasscode("");
                      }}
                      className="flex-1"
                    >
                      Cancel
                    </Button>
                  </div>
                </div>
              </DialogContent>
            </Dialog>
          </div>

          <Alert>
            <AlertTriangle className="h-4 w-4" />
            <AlertDescription>
              Secure Sync is coming soon. For now, all data remains safely stored locally on your device.
            </AlertDescription>
          </Alert>
        </CardContent>
      </Card>

      {/* Notification Settings */}
      <Card className="shadow-float border-0 bg-card/80 backdrop-blur-sm">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Bell className="h-5 w-5 text-primary" />
            Notifications
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="flex items-center justify-between">
            <div className="space-y-1">
              <Label htmlFor="daily-reminder" className="text-base font-medium">
                Daily Journal Reminder
              </Label>
              <p className="text-sm text-muted-foreground">
                Gentle daily reminder to write in your journal
              </p>
            </div>
            <Switch
              id="daily-reminder"
              checked={settings.dailyReminder}
              onCheckedChange={(checked) => handleSettingChange('dailyReminder', checked)}
            />
          </div>
        </CardContent>
      </Card>

      {/* Data Management */}
      <Card className="shadow-float border-0 bg-card/80 backdrop-blur-sm">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Database className="h-5 w-5 text-primary" />
            Data Management
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-4">
            <Button
              onClick={handleExportData}
              className="w-full justify-start bg-gradient-calm hover:bg-gradient-trust shadow-gentle"
              disabled={isLoading}
            >
              <Download className="h-4 w-4 mr-2" />
              Export All Data
            </Button>
            <p className="text-sm text-muted-foreground">
              Download a complete backup of your journal entries, insights, and settings in JSON format.
            </p>
          </div>

          <hr className="border-border" />

          <div className="space-y-4">
            <Button
              onClick={handleClearData}
              variant="destructive"
              className="w-full justify-start"
              disabled={isLoading}
            >
              <Trash2 className="h-4 w-4 mr-2" />
              Delete All Data
            </Button>
            <p className="text-sm text-muted-foreground">
              Permanently delete all journal entries and personal data from this device.
            </p>
          </div>
        </CardContent>
      </Card>

      {/* Privacy Information */}
      <Card className="bg-muted/50 shadow-gentle">
        <CardHeader>
          <CardTitle className="text-lg">Your Privacy Matters</CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          <ul className="text-sm text-muted-foreground space-y-2">
            <li className="flex items-start gap-2">
              <CheckCircle className="h-4 w-4 text-privacy-safe mt-0.5 flex-shrink-0" />
              All journal entries are stored locally on your device
            </li>
            <li className="flex items-start gap-2">
              <CheckCircle className="h-4 w-4 text-privacy-safe mt-0.5 flex-shrink-0" />
              Sentiment analysis happens on-device using Web Workers
            </li>
            <li className="flex items-start gap-2">
              <CheckCircle className="h-4 w-4 text-privacy-safe mt-0.5 flex-shrink-0" />
              No data is ever transmitted to external servers
            </li>
            <li className="flex items-start gap-2">
              <CheckCircle className="h-4 w-4 text-privacy-safe mt-0.5 flex-shrink-0" />
              You have complete control over your data at all times
            </li>
          </ul>
        </CardContent>
      </Card>
    </div>
  );
};

export default Settings;