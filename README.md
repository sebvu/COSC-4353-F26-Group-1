# COSC 4353 Group Project Teamates

- Jester Santos
- Vanessa Meyer
- Emokhare Igene
- Karam Irshaid

## Frontend Technology Stack

For our framework, we are choosing the React/NextJS stack with typescript as our language. I'll give a sensible, student explanation, on why we're choosing this.

- React: Of course Javascript has the module pattern i.e. importing and exporting different JS files per usage. React is a step up on this; the ability to create modular **UI** components using the same module pattern essentially. Seperation of concern essentially!
- NextJS: An opinionated framework, dependent on react, simplifying a lot of practices that would take more effort using vanilla react. I.e. routing pages, backend api layers, etc.. It also has TurboPack, which offsets the manual configuration pain Webpack requires of us, yay!
- Typescript gets transpiled to Javascript, hence it's still Javascript! Anyways, Typescript has more stringent rules that are helpful for better code bases, importantly, data types! Having these enforced means cleaner code bases, yippee!

## SYSTEM REQUIREMENTS:

Refer to the [nextjs.org](nextjs.org/docs/app/getting-started/installation) system requirements section.

- Minimum Node.js version: 20.9
- OS: MacOS, Windows (including WSL), and Linux.

Supported browers

- Chrome 111+
- Edge 111+
- Firefox 111+
- Safari 16.4+ 

---

This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.
