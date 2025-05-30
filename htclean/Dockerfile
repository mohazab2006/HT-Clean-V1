# Dockerfile for running a production Next.js build

FROM node:18-alpine

WORKDIR /app

# Create a non-root user
RUN addgroup --system --gid 1001 nodejs
RUN adduser --system --uid 1001 nextjs

# Copy the necessary files from the local build output
# The .next/standalone directory contains the built app,
# including a minimal package.json and node_modules for production
COPY --chown=nextjs:nodejs ./.next/standalone ./
COPY --chown=nextjs:nodejs ./public ./public
COPY --chown=nextjs:nodejs ./.next/static ./.next/static
COPY --chown=nextjs:nodejs ./.env ./.env

USER nextjs

ENV NODE_ENV=production
ENV PORT=3000
# Allows the server to listen on all network interfaces
ENV HOSTNAME="0.0.0.0"

EXPOSE 3000

# The command to start the Next.js server from the standalone output
CMD ["node", "server.js"]