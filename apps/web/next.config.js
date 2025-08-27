/** @type {import('next').NextConfig} */
const nextConfig = {
  transpilePackages: [
    '@banking/ui',
    '@banking/services',
    '@banking/modules',
    '@banking/modules-securities',
    '@banking/modules-trading',
    '@banking/modules-user-settings'
  ],

  env: {
    CUSTOM_KEY: 'my-value',
  },
}

module.exports = nextConfig
