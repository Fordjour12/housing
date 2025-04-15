import { Badge } from "@/components/ui/badge";
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
import { Slider } from "@/components/ui/slider";
import { Switch } from "@/components/ui/switch";
import { auth } from "@/lib/auth";
import { db } from "@/lib/database";
import { renterPreferences } from "@/schema";
import type { SelectRenterPreferences } from "@/schema/renterPreferences";
import { eq } from "drizzle-orm";
import { headers } from "next/headers";

// Constants
const PROPERTY_TYPES = ["Apartment", "House", "Condo", "Townhouse", "Studio"];
const AMENITIES = [
	"Laundry",
	"Parking",
	"Gym",
	"Pool",
	"Balcony",
	"Pet Friendly",
	"Furnished",
];

interface RenterPreferencesData {
	budget: {
		min: number;
		max: number;
	};
	bedrooms: number[];
	propertyTypes: string[];
	amenities: string[];
	petFriendly: boolean;
	moveInDate: Date | null;
}

const DEFAULT_PREFERENCES: RenterPreferencesData = {
	budget: {
		min: 1000,
		max: 2500,
	},
	bedrooms: [1],
	propertyTypes: ["Apartment"],
	amenities: [],
	petFriendly: false,
	moveInDate: new Date(),
};

export async function RenterPreferences() {
	const session = await auth.api.getSession({ headers: await headers() });
	if (!session?.user?.id) return null;

	// Fetch user's rental preferences
	const preferences = (await db.query.renterPreferences.findFirst({
		where: eq(renterPreferences.userId, session.user.id),
	})) as SelectRenterPreferences | undefined;

	// Merge default preferences with user preferences, ensuring type safety
	const defaultPreferences: RenterPreferencesData = {
		budget: preferences?.budget || DEFAULT_PREFERENCES.budget,
		bedrooms: Array.isArray(preferences?.bedrooms)
			? preferences.bedrooms
			: DEFAULT_PREFERENCES.bedrooms,
		propertyTypes: Array.isArray(preferences?.propertyTypes)
			? preferences.propertyTypes
			: DEFAULT_PREFERENCES.propertyTypes,
		amenities: Array.isArray(preferences?.amenities)
			? preferences.amenities
			: DEFAULT_PREFERENCES.amenities,
		petFriendly: preferences?.petFriendly ?? DEFAULT_PREFERENCES.petFriendly,
		moveInDate: preferences?.moveInDate || DEFAULT_PREFERENCES.moveInDate,
	};

	return (
		<Card>
			<CardHeader>
				<CardTitle>Renter Preferences</CardTitle>
				<CardDescription>
					Set your housing preferences to help us find the perfect property for
					you
				</CardDescription>
			</CardHeader>
			<CardContent className="space-y-6">
				<div>
					<h3 className="text-lg font-medium mb-4">Budget Range</h3>
					<div className="space-y-4">
						<div className="grid grid-cols-2 gap-4">
							<div className="space-y-2">
								<Label>Minimum ($)</Label>
								<Input
									type="number"
									placeholder="1000"
									defaultValue={defaultPreferences.budget.min}
								/>
							</div>
							<div className="space-y-2">
								<Label>Maximum ($)</Label>
								<Input
									type="number"
									placeholder="3000"
									defaultValue={defaultPreferences.budget.max}
								/>
							</div>
						</div>
						<div className="py-4">
							<Slider
								defaultValue={[
									defaultPreferences.budget.min,
									defaultPreferences.budget.max,
								]}
								max={5000}
								min={0}
								step={100}
								className="w-full"
							/>
							<p className="text-sm text-muted-foreground mt-2">
								Drag the sliders to set your budget range
							</p>
						</div>
					</div>
				</div>

				<div className="border-t pt-6">
					<h3 className="text-lg font-medium mb-4">Property Type</h3>
					<div className="space-y-4">
						<div className="flex flex-wrap gap-2">
							{PROPERTY_TYPES.map((type) => (
								<Badge
									key={type}
									variant={
										defaultPreferences.propertyTypes.includes(type)
											? "default"
											: "outline"
									}
									className="cursor-pointer hover:bg-primary hover:text-primary-foreground"
								>
									{type}
								</Badge>
							))}
						</div>
					</div>
				</div>

				<div className="border-t pt-6">
					<h3 className="text-lg font-medium mb-4">Bedrooms</h3>
					<div className="flex flex-wrap gap-2">
						{[0, 1, 2, 3, 4, 5, 6].map((num) => (
							<Badge
								key={num}
								variant={
									defaultPreferences.bedrooms.includes(num)
										? "default"
										: "outline"
								}
								className="cursor-pointer hover:bg-primary hover:text-primary-foreground"
							>
								{num === 0
									? "Studio"
									: `${num} ${num === 1 ? "Bedroom" : "Bedrooms"}`}
							</Badge>
						))}
					</div>
				</div>

				<div className="border-t pt-6">
					<h3 className="text-lg font-medium mb-4">Amenities</h3>
					<div className="grid grid-cols-2 gap-4">
						{AMENITIES.map((amenity) => (
							<div key={amenity} className="flex items-center space-x-2">
								<Switch
									defaultChecked={defaultPreferences.amenities.includes(
										amenity,
									)}
									id={`amenity-${amenity}`}
								/>
								<Label htmlFor={`amenity-${amenity}`}>{amenity}</Label>
							</div>
						))}
					</div>
				</div>

				<div className="border-t pt-6">
					<h3 className="text-lg font-medium mb-4">Pet Friendly</h3>
					<div className="flex items-center space-x-2">
						<Switch
							defaultChecked={defaultPreferences.petFriendly}
							id="pet-friendly"
						/>
						<Label htmlFor="pet-friendly">
							Require Pet-Friendly Properties
						</Label>
					</div>
				</div>

				<div className="border-t pt-6">
					<h3 className="text-lg font-medium mb-4">Move-in Timeline</h3>
					<div className="space-y-2">
						<Label>Desired Move-in Date</Label>
						<Input
							type="date"
							defaultValue={
								defaultPreferences.moveInDate?.toISOString().split("T")[0] ||
								new Date().toISOString().split("T")[0]
							}
						/>
						<p className="text-sm text-muted-foreground">
							When would you like to move in?
						</p>
					</div>
				</div>

				<div className="flex justify-end">
					<Button>Save Preferences</Button>
				</div>
			</CardContent>
		</Card>
	);
}
