import createNextIntlPlugin from "next-intl/plugin";

const withNextIntl = createNextIntlPlugin();

export default withNextIntl({
  images: { formats: ["image/avif", "image/webp"] },
  typedRoutes: false,
  allowedDevOrigins: ["127.0.0.1"],
});
