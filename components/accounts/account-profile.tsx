import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import {
	Card,
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import type { SelectUser } from "@/schema/user";
interface AccountProfileProps {
	user: SelectUser;
}

export function AccountProfile({ user }: AccountProfileProps) {
	return (
		<Card>
			<CardHeader>
				<CardTitle>Profile Information</CardTitle>
				<CardDescription>
					Update your personal information and manage your account settings
				</CardDescription>
			</CardHeader>
			<CardContent className="space-y-6">
				<div className="flex items-center gap-4">
					<Avatar className="h-20 w-20">
						<AvatarImage src={user.image || ""} alt={user.name} />
						<AvatarFallback>{user.name?.[0]}</AvatarFallback>
					</Avatar>
					<div>
						<h3 className="text-lg font-medium">{user.name}</h3>
						<p className="text-sm text-muted-foreground">{user.email}</p>
					</div>
				</div>

				<div className="space-y-4">
					<div className="space-y-2">
						<Label>What should we call you?</Label>
						<Input
							defaultValue={user.name[0]}
							placeholder="Enter your preferred name"
						/>
					</div>

					{/* <div className="space-y-2">
						<Label>What do you do?</Label>
						<Input
							defaultValue={user.occupation}
							placeholder="e.g. Software Developer"
						/>
					</div>

					<div className="space-y-2">
						<Label>What traits should we know about?</Label>
						<Textarea
							placeholder="Enter traits separated by commas (e.g. Chatty, Witty, Opinionated)"
							className="min-h-[100px]"
							defaultValue={user.traits?.join(", ")}
						/>
					</div>

					<div className="space-y-2">
						<Label>Anything else we should know about you?</Label>
						<Textarea
							placeholder="Interests, values, or preferences to keep in mind"
							className="min-h-[100px]"
							defaultValue={user.bio}
						/>
					</div> */}
				</div>

				<div className="flex justify-end">
					<Button>Save Changes</Button>
				</div>
			</CardContent>
		</Card>
	);
}
