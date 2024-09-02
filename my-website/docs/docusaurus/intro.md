```
npm init docusaurus@latest my-website classic
```

```
npx create-docusaurus@latest my-website classic
```

```
cd my-website
npm run start
```

```js title="docusaurus.config.js"
  const config: Config = {
  title: "My Site",
  tagline: "Dinosaurs are cool",
  favicon: "img/favicon.ico",
  trailingSlash: true,
  url: "https://shinichiok2614.github.io",
  baseUrl: "/doc/",

  organizationName: "shinichiok2614", // Usually your GitHub org/user name.
  projectName: "doc", // Usually your repo name.
```

```
yarn build
yarn serve
```

create github repo, only create
ssh-keygen

```
USE_SSH=true yarn deploy
```
