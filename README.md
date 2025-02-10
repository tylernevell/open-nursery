# OpenNursery

An open source baby tracking platform for parents and caregivers. Track feedings, diapers, sleep, and more without worrying about suddenly losing access to your data or being forced into a paid subscription.

## Vision

OpenNursery aims to provide a reliable, free, and open source solution for tracking your baby's daily activities and development. Born out of frustration with existing solutions that often put essential features behind paywalls or surprise users with sudden subscription requirements, we believe parents deserve better.

## Features

- 🍼 Track feedings (breast, bottle, solids)
- 💤 Monitor sleep patterns
- 🧷 Log diaper changes
- 📏 Record growth measurements
- 📊 View trends and patterns
- 👥 Multi-caregiver support
- 📱 Mobile-friendly web interface
- 🔄 Real-time updates across devices
- 💾 Data export capabilities

## Development

### Tech Stack

- **Frontend:** React with [TanStack Router](https://tanstack.com/router/latest) and [shadcn/ui](https://ui.shadcn.com/docs)
- **Backend:** [Hono](https://hono.dev/docs/)
- **Database:** PostgreSQL with [Drizzle ORM](https://orm.drizzle.team/docs/overview)

### Project Structure

```file-tree
open-nursery/
├── packages/
│   ├── app/             # React web application
│   ├── backend/         # Backend services and API
├── .yarnrc.yml          # Yarn configuration
├── package.json         # Root package file
├── README.md            # Project README
```

### Installation

1. Clone the repository:

```bash
# Fork and clone the repository
# ...fork in ui
git clone https://github.com/{YOU_USERNAME}/open-nursery.git
cd open-nursery

# Setup yarn
corepack enable
yarn set version stable

# Install dependencies
yarn install

# Setup .env
cp .env.example .env
source .env

# Start the development environment
yarn dev
```

The application will be available at <http://localhost:3001> and the backend at <http://localhost:3000>.

## Roadmap

**Note:** OpenNursery is currently in active development. Star the repository to stay updated on our progress!

- [ ] Initial release with core tracking features
- [ ] Growth charts and percentiles
- [ ] Data import/export tools
- [ ] Trend analysis and insights
