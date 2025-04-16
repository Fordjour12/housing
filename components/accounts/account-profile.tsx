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
import { Badge } from "@/components/ui/badge";

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
						<AvatarFallback>{user.name.split(" ")[0][0]}</AvatarFallback>
					</Avatar>
					<div>
						<h3 className="text-lg font-medium">{user.name}</h3>
						<p className="text-sm text-muted-foreground">{user.email}</p>
						<Badge variant="outline">{user.role}</Badge>
					</div>
				</div>

				<div className="space-y-4">
					<div className="space-y-2">
						<Label>What should we call you?</Label>
						<Input
							defaultValue={user.name}
							placeholder="Enter your preferred name"
							type="text"
						/>
					</div>

					<div className="space-y-2">
						<Label>What is your email?</Label>
						<Input
							defaultValue={user.email}
							placeholder="Enter your email"
						/>
						<span className="text-sm text-muted-foreground">
							<Badge variant="outline">
								{user.emailVerified ? "Verified" : "Unverified"}
							</Badge>
						</span>
						{user.emailVerified && (
							<p className="text-sm text-muted-foreground">
								You can change your email address at any time.
							</p>
						)}
					</div>

					<div className="space-y-2">
						<Label>Role</Label>
						<Badge variant="outline">{user?.role}</Badge>
					</div>

					 <div className="space-y-2">
						<Label>What do you do?</Label>
						<Input
							// defaultValue={user.occupation} 
							placeholder="e.g. Software Developer"
						/>
					</div>

					{/*
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
