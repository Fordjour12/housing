import ResetPasswordForm from "@/components/auth/reset-password";

export default function ResetPasswordPage({
	params: { token },
}: {
	params: { token: string };
}) {
	return <ResetPasswordForm token={token} />;
}
