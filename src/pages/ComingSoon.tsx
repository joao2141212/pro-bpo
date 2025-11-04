import { Card, CardContent } from "@/components/ui/card";
import { Rocket } from "lucide-react";

interface ComingSoonProps {
  title: string;
  description: string;
}

export default function ComingSoon({ title, description }: ComingSoonProps) {
  return (
    <div className="flex items-center justify-center min-h-[60vh] animate-fade-in">
      <Card className="max-w-md w-full">
        <CardContent className="pt-6 text-center space-y-4">
          <div className="flex justify-center">
            <div className="h-16 w-16 rounded-full bg-primary/10 flex items-center justify-center">
              <Rocket className="h-8 w-8 text-primary" />
            </div>
          </div>
          <div className="space-y-2">
            <h2 className="text-2xl font-bold">{title}</h2>
            <p className="text-muted-foreground">{description}</p>
          </div>
          <p className="text-sm text-muted-foreground">
            Esta funcionalidade está em desenvolvimento e estará disponível em breve.
          </p>
        </CardContent>
      </Card>
    </div>
  );
}
