module.exports = {
  async rewrites() {
    return [
      {
        source: "/api/v1/:path*",
        destination: "http://localhost:3007/api/v1/:path*",
      },
    ];
  },
};
