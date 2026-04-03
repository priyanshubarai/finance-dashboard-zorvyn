import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Field, FieldDescription, FieldGroup } from "@/components/ui/field"
import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { useState } from "react"
import { RoleType } from "@/lib/store/roleStore"
import { redirect } from "next/navigation"

interface LoginFormProps extends React.ComponentProps<"div"> {
  setRole: (role: RoleType) => void
}

export function LoginForm({
  className,
  setRole,
  ...props
}: LoginFormProps) {
  const [selectedRole, setSelectedRole] = useState<RoleType>("viewer")

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setRole(selectedRole)
    console.log("Role : ",selectedRole);
    redirect("/dashboard");
  }

  return (
    <div className={cn("flex flex-col gap-6", className)} {...props}>
      <Card>
        <CardHeader className="text-center">
          <CardTitle className="text-xl">Welcome back</CardTitle>
          <CardDescription>
            Login with your Apple or Google account
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit}>
            <FieldGroup>
              <RadioGroup value={selectedRole} onValueChange={(value) => setSelectedRole(value as RoleType)}>
                <Field>
                  <Button variant="outline" type="button" asChild>
                    <label className="flex items-center gap-3 cursor-pointer">
                      <RadioGroupItem value="admin" id="admin" />
                      <Label htmlFor="admin" className="mb-0">Login as Admin</Label>
                    </label>
                  </Button>
                  <Button variant="outline" type="button" asChild>
                    <label className="flex items-center gap-3 cursor-pointer">
                      <RadioGroupItem value="viewer" id="viewer" />
                      <Label htmlFor="viewer" className="mb-0">Login as Viewer</Label>
                    </label>
                  </Button>
                </Field>
                <Field>
                  <Button type="submit">Login</Button>
                </Field>
              </RadioGroup>
            </FieldGroup>
          </form>
        </CardContent>
      </Card>
      <FieldDescription className="px-6 text-center">
        By clicking continue, you agree to our <a href="#">Terms of Service</a>{" "}
        and <a href="#">Privacy Policy</a>.
      </FieldDescription>
    </div>
  )
}

