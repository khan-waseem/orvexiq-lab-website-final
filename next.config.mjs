/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    formats: ['image/avif', 'image/webp'],
    /* No remote patterns: every image on the site is a local file under
       /public, referenced from the content JSON. This is also what keeps the
       image optimiser (and the libvips code underneath it) away from anything
       a visitor could supply — it will only ever process our own files.
       A localhost:3845 pattern used to sit here for the Figma asset server;
       it was dev-only and is dead in production. */
  },

  /* Response headers. Deliberately conservative: these cannot break a page,
     unlike a full script CSP, which needs nonce plumbing for Next's inline
     bootstrap and is not something to add days before a launch. */
  async headers() {
    return [
      {
        source: '/:path*',
        headers: [
          /* Nobody may frame the site — clickjacking, and it costs nothing.
             This restricts who can embed us; it does not affect the Google
             Maps iframe the contact page embeds. */
          { key: 'Content-Security-Policy', value: "frame-ancestors 'none'" },
          { key: 'X-Content-Type-Options', value: 'nosniff' },
          { key: 'Referrer-Policy', value: 'strict-origin-when-cross-origin' },
          /* No page uses any of these, so deny them outright. */
          { key: 'Permissions-Policy', value: 'camera=(), microphone=(), geolocation=(), payment=()' },
          { key: 'X-DNS-Prefetch-Control', value: 'on' },
        ],
      },
    ];
  },
};

export default nextConfig;
