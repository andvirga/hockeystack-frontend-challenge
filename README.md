# Hockeystack Frontend Challenge

## Getting Started

1. Clone this repository into a local folder.

```bash
git clone https://github.com/andvirga/hockeystack-frontend-challenge
```

2. Install dependencies and run the project.

```bash
yarn && yarn dev
```

3. Open http://locahost:3000 to see the challenge.

- Note: if this port is not available on your system, you can change its value on `.env.development` file using `APP_PORT` variable.

## Debrief

### Trade-offs

- The API returns the whole JSON on each request, this is fine for 500 rows, but it can be inefficient on large datasets.
- Due to time constraints, only a Dark Mode theme was implemented, leaving the Light Mode for future development.
- The transition between the Pure and Library tables is handled via links, but the Library Table can take several seconds to render fully.
- Table layout was adjusted to ensure responsiveness on mobile devices, but this can be improved for a smoother user experience.

### Improvements

- Implement server-side pagination to efficiently handle larger datasets, coupled with caching to reduce unnecessary API calls.
- Add a Light/Dark mode toggle to enhance user accessibility and personalization.
- Improve the table-switching mechanism by incorporating a loading skeleton to provide visual feedback while the Library Table loads.
- Enhance mobile responsiveness by making the first column stack as the user scrolls horizontally, improving usability on smaller screens.
