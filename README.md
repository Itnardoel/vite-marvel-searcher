# Marvel Searcher

This web application is a comprehensive tool for exploring the vast universe of Marvel Comics characters and their associated comic books. Built using the official Marvel API, this app provides a seamless and intuitive interface for searching, browsing, and managing your favorite Marvel content.

![Homepage](https://github.com/Itnardoel/desafiosBackend/assets/98669283/0a1a315f-ea7a-430c-95de-11503609a4df)

## Quick start

Create a `.env` in the root directory:

```
VITE_PUBLIC_KEY=your marvel public key
VITE_PRIVATE_KEY=your marvel private key
```

run the project

```sh
pnpm run dev
```

### Tech Stack:

- **Vite**: A modern JavaScript bundler for building performant web applications.
- **React**: A JavaScript library for building user interfaces.
- **TypeScript**: A superset of JavaScript that adds static typing for enhanced code reliability.
- **Zustand**: A lightweight state management library for React applications.
- **React Router**: A routing library for React applications.
- **Sonner**: A React component library for displaying notifications.

### Features:

Search for Marvel characters by name using the search bar or query parameters in the URL (e.g., ?character=spider).

![Search example](https://github.com/Itnardoel/desafiosBackend/assets/98669283/db499c45-7c83-4c6b-b4e5-49ed90b7ae3e)

Search for comic books by title or URL directly from the Marvel Comics website.

![Search example](https://github.com/Itnardoel/desafiosBackend/assets/98669283/27774bc9-fa1c-4e78-a178-099597cec770)

Browse comic book details, including cover art, synopsis, and character appearances.

Add characters and comic books to your favorites list for quick and easy access.

![Favorite example](https://github.com/Itnardoel/desafiosBackend/assets/98669283/adb4fee0-ecd1-4e66-9447-f8c86e490587)

![Favorite example](https://github.com/Itnardoel/desafiosBackend/assets/98669283/8d9763d4-5e1f-4d25-a323-4823c7f1281d)

Favorites are stored in localStorage for persistence across sessions.

![Favorite example](https://github.com/Itnardoel/desafiosBackend/assets/98669283/285b2bf7-570c-42ac-a1ee-f1562828baea)
