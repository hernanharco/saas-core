FROM node:18-alpine

WORKDIR /app

# Install pnpm
RUN npm install -g pnpm

# Copy package files
COPY package.json pnpm-lock.yaml* ./

# Install dependencies with cache busting
RUN --mount=type=cache,target=/root/.pnpm-store \
    pnpm install --frozen-lockfile || pnpm install

# Copy source code
COPY . .

# Build application
RUN pnpm build

# Change ownership to non-root user
RUN addgroup -S pnpm && adduser -S pnpm -G pnpm && \
    chown -R pnpm:pnpm /app

# Expose port
EXPOSE 5173

# Switch to non-root user
USER pnpm

# Start application
CMD ["pnpm", "dev", "--", "--host", "0.0.0.0"]
