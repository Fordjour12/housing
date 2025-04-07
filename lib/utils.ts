import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
	return twMerge(clsx(inputs));
}

/**
 * Formats a number as currency with proper locale and error handling
 * @param value - The number to format
 * @param options - Optional formatting options
 * @returns Formatted currency string
 */
export function formatCurrency(
	value: number | string | null | undefined,
	options: Intl.NumberFormatOptions = {
		style: "currency",
		currency: "USD",
		minimumFractionDigits: 0,
		maximumFractionDigits: 0,
	},
): string {
	try {
		// Handle null/undefined values
		if (value == null) return "$0";

		// Convert string to number if needed
		const numericValue =
			typeof value === "string" ? Number.parseFloat(value) : value;

		// Handle invalid numbers
		if (Number.isNaN(numericValue)) return "$0";

		// Format the number
		return new Intl.NumberFormat("en-US", options).format(numericValue);
	} catch (error) {
		console.error("Error formatting currency:", error);
		return "$0";
	}
}

/**
 * Validates a callback URL
 * @param url - The URL to validate
 * @returns True if the URL is valid, false otherwise
 */
export const isValidCallbackUrl = (url: string): boolean => {
	try {
		const parsedUrl = new URL(url, window.location.origin); // Resolve relative URLs
		const allowedDomains = [
			window.location.hostname,
			"your-other-trusted-domain.com",
		]; // Replace with your allowed domains
		return allowedDomains.includes(parsedUrl.hostname);
	} catch (error) {
		console.error("Invalid callback URL:", url);
		return false;
	}
};
