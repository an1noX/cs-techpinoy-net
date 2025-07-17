# CS TechPinoy Net

A modern web portal for Counter-Strike 1.3 servers and community, featuring live stats, downloads, and guides.

---

## Project Info

**GitHub Repo:** [https://github.com/an1noX/cs-techpinoy-net](https://github.com/an1noX/cs-techpinoy-net)

---

## How to Edit and Develop

### 1. Clone the Repository

```sh
# Clone the repository
git clone https://github.com/an1noX/cs-techpinoy-net.git
cd cs-techpinoy-net
```

### 2. Install Dependencies

Requires Node.js (v18+) and npm.

```sh
npm install
```

### 3. Available Scripts

- `npm run dev` – Start the development server (Vite, hot reload)
- `npm run build` – Build for production
- `npm run preview` – Preview the production build locally
- `npm run lint` – Lint the codebase

### 4. Start Development Server

```sh
npm run dev
```

The app will be available at [http://localhost:8080](http://localhost:8080) by default.

---

## Technologies Used

- Vite
- TypeScript
- React
- shadcn-ui (Radix UI components)
- Tailwind CSS
- React Router
- TanStack React Query
- ESLint
- Docker (optional for deployment)

---

## Project Structure

```
cs-techpinoy-net/
├── public/           # Static assets (favicon, robots.txt, etc.)
├── src/
│   ├── components/   # React components (UI, modals, server list, etc.)
│   ├── hooks/        # Custom React hooks
│   ├── lib/          # Utility functions
│   ├── pages/        # Page components (Index, NotFound)
│   ├── App.tsx       # Main app component
│   └── main.tsx      # Entry point
├── Dockerfile        # Docker build instructions
├── docker-compose.yml# Docker Compose config
├── package.json      # Project metadata and scripts
├── tailwind.config.ts# Tailwind CSS config
└── ...
```

---

## Deployment

### Local Build & Preview

```sh
npm run build
npm run preview
```

### Docker (Local)

```sh
docker build -t cs-techpinoy-net .
docker run -d -p 8080:8080 --name cs-techpinoy-net cs-techpinoy-net
```

### Docker Compose (Local)

```yaml
version: "3.8"
services:
  cs-techpinoy-net:
    build: .
    ports:
      - "8080:8080"
    container_name: cs-techpinoy-net
```

Start with:
```sh
docker-compose up -d
```

### NGINX Reverse Proxy (Example)

```
server {
    listen 80;
    server_name cs.techpinoy.net;

    location / {
        proxy_pass http://localhost:8080;
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
    }
}
```

### SSL (Certbot)

```
sudo apt install certbot python3-certbot-nginx -y
sudo certbot --nginx -d cs.techpinoy.net
```

### Domain Setup

- Add an A record for `cs.techpinoy.net` pointing to your server's public IP in your DNS provider's dashboard.

---

## Contributing

Pull requests are welcome! For major changes, please open an issue first to discuss what you would like to change.

---

## License

[MIT](LICENSE) (or specify your license here)

---

## Notes

- This project was originally scaffolded with Lovable, but is now maintained at [https://github.com/an1noX/cs-techpinoy-net](https://github.com/an1noX/cs-techpinoy-net).
- For legacy Lovable deployment, see the Lovable dashboard.
