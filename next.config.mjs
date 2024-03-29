/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        remotePatterns: ["images.unsplash.com"],
        remotePatterns: [
            {
                protocol: "https",
                hostname: "images.unsplash.com",
                port: "",
            },
        ],
    },
};
export default nextConfig;
