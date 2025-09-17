# Phoenix Missing Persons Data Frontend

React TypeScript frontend with Tailwind CSS for visualizing Phoenix Police Department missing persons data.

**Disclaimer:** This project is for technical demonstration and civic awareness purposes. It is not intended to replace official reporting or investigative work.

## Setup

1. Install dependencies:
   ```bash
   npm install
   ```

2. Configure environment:
   ```bash
   cp .env.example .env
   ```

   Edit `.env` to point to your backend:
   ```
   REACT_APP_API_URL=http://localhost:3001
   ```

## Development

Start the development server:
```bash
npm start
```

The app will run on http://localhost:3000

## Features

### Data Visualizations

1. **Key Performance Indicators (KPI)**
   - Total reports count
   - Median days missing
   - Percentage still missing

2. **Monthly Reports with Anomaly Detection**
   - Time series chart showing monthly report counts
   - 12-month rolling average
   - Anomaly detection with Z-score highlighting (red dots for |Z| ≥ 2)

3. **Time to Located Distribution**
   - Histogram showing how long it takes to locate missing persons
   - Buckets: 0-1d, 2-7d, 8-20d, 21-89d, 90+d, Still Missing, Unknown/Invalid

4. **Demographics Charts**
   - Stacked area charts showing trends by:
     - Missing type (Adult/Juvenile)
     - Sex (Male/Female)
     - Race (White/Black/Asian Pacific Islander/American Indian Alaskan Native)

### Technical Features

- Responsive design with Tailwind CSS
- TypeScript for type safety
- Recharts for interactive visualizations
- Loading states and error handling
- API integration with the Express backend

## Build

Build for production:
```bash
npm run build
```

The build artifacts will be in the `build/` directory.
