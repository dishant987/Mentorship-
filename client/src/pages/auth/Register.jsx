import { RegisterForm } from "@/components/form/RegisterForm";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

export function Register() {
    return (
        <div className="min-h-[calc(100vh-8rem)] flex items-center justify-center p-4">
            <Card className="w-full max-w-md">
                <CardHeader className="space-y-1">
                    <CardTitle className="text-2xl font-bold text-center">
                        Create an account
                    </CardTitle>
                    <CardDescription className="text-center">
                        Enter your information to create your account
                    </CardDescription>
                </CardHeader>
                <CardContent>
                    <RegisterForm />
                </CardContent>
            </Card>
        </div>
    );
}