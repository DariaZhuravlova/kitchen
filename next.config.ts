import type {NextConfig} from "next";

const nextConfig: NextConfig = {
    images: {
        remotePatterns: [
            {
                protocol: "https",
                hostname: "encrypted-tbn0.gstatic.com",
            },
            {
                protocol: "https",
                hostname: "kulinarmaster.com.ua",
            },
            {
                protocol: "https",
                hostname: "i1.wp.com",
            },
            {
                protocol: "https",
                hostname: "vokrugsveta.ua",
            },
            {
                protocol: "https",
                hostname: "fayni-recepty.com.ua",
            },
        ],
    },
};

export default nextConfig;
