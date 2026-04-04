import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Field, FieldContent, FieldDescription, FieldGroup, FieldLabel, FieldTitle } from "@/components/ui/field"
import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { useState } from "react"
import { RoleType } from "@/lib/store/roleStore"
import { redirect } from "next/navigation"

interface LoginFormProps extends React.ComponentProps<"div"> {
  setRole: (role: RoleType) => void
}

export function LoginForm({ className, setRole, ...props }: LoginFormProps) {
  const [selectedRole, setSelectedRole] = useState<RoleType>("viewer")

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setRole(selectedRole)
    console.log("Role : ", selectedRole)
    redirect("/dashboard")
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
              <RadioGroup defaultValue={selectedRole} className="max-w-sm">

                <FieldLabel htmlFor="admin">
                  <Field orientation="horizontal">
                    <FieldContent>
                      <FieldTitle>Admin</FieldTitle>
                    </FieldContent>
                    <RadioGroupItem value="admin" id="admin" />
                  </Field>
                </FieldLabel>
                
                <FieldLabel htmlFor="viewer">
                  <Field orientation="horizontal">
                    <FieldContent>
                      <FieldTitle>Viewer</FieldTitle>
                    </FieldContent>
                    <RadioGroupItem value="viewer" id="viewer" />
                  </Field>
                </FieldLabel>
                <Button type="submit">Login</Button>
                
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
