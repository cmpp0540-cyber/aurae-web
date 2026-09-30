/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    // Resizing is delegated to Shopify's CDN — see lib/shopify-image-loader.ts
    // for why. This also means the Node process never fetches image bytes, so
    // TLS-intercepting antivirus can no longer break image loading.
    loaderFile: './lib/shopify-image-loader.ts',

    // The widths the loader will be asked for. Trimmed from Next's defaults so
    // srcset candidates line up with the sizes this site actually renders,
    // instead of asking the CDN for 1920/2048/3840 variants nothing uses.
    //
    // Capped at 1280 on purpose: the source images in the store are 1254px
    // square, so every candidate above that is the CDN upscaling — more bytes
    // for no extra detail. A phone at DPR 3 lands on 1280 and stops there.
    deviceSizes: [400, 560, 750, 828, 1080, 1280],
    imageSizes: [32, 64, 96, 128, 176, 256, 384],

    // Every non-default quality the app asks for must be declared — Next 16
    // makes this mandatory. Thumbnails sit low, hero imagery high.
    qualities: [60, 65, 72, 74, 75, 80, 82],

    // Kept so the built-in optimizer still works if loaderFile is ever removed.
    remotePatterns: [{ protocol: 'https', hostname: 'cdn.shopify.com', pathname: '/**' }],
  },
};

export default nextConfig;
