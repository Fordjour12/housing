import type { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
	return {
		name: "RentEasy",
		short_name: "RentEasy",
		description: "Find affordable, long-term rentals in your area",
		start_url: "/",
		display: "standalone",
		background_color: "#ffffff",
		theme_color: "#000000",
		icons: [
			{
				src: "/icon?size=192",
				sizes: "192x192",
				type: "image/png",
			},
			{
				src: "/icon?size=512",
				sizes: "512x512",
				type: "image/png",
			},
			{
				src: "/icon?size=192",
				sizes: "192x192",
				type: "image/png",
				purpose: "maskable",
			},
		],
	};
}

