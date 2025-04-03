import AccountProfile from "@/components/account-profile";
import Header from "@/components/header";

export default function AccountPage() {
	return (
		<div className="min-h-screen flex flex-col">
			<Header />
			<div className="container mx-auto py-6 flex-1">
				<h1 className="text-3xl font-bold mb-6">My Account</h1>
				<AccountProfile />
			</div>
		</div>
	);
}
