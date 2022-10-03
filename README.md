<h1>Next Tezos</h1>
<h3>Hey Newbie &#128075;</h3>
<h4>Open this in preview mode for the best experience</h4>
<hr>
<h2>Intro:</h2>
<h3>We are going to clone a simple web app of nfts using Next and our Tezos widget.</h3>
<h3>
<a href="https://nextjs.org/docs">Check out the Next documents here </a>and follow the open-source documentation to create and deploy your site along with the documentation we have provided.</h3><hr>
<h2>Clone</h2><br>
<ol>
<li>Go to your desktop and create a folder where you want your project to live. Open a new terminal, GitBash Here, or cmd.</li><br>
<li>Clone the repository:</li>
<br>

```
git clone gitRepo
```

<li>You should also install all the dependencies</li>
<br>

```
npm install or yarn install
```

</ol>
<hr>

<h2>How do you run your site locally?</h2>
<ol>
<li>In the command line, cd into the directory that you created.
<h3>Ex.</h3>
<br>

```
cd my-next-app
```

<li>Run the command: </li><br>

```
yarn dev
```

or

```
npm run dev
```

<li>Go to your browser of choice and enter http:/localhost:3000 <a href="http://localhost:3000">Or click here</a></li>
</ol>
<hr>
<h2>Create .env.local file in the root of the project:</h2>

<h3>Create a file in the root of the project <strong>.env.local</strong> and put the following code:</h3>
NEXT_PUBLIC_REACT_APP_WALLET_ADDRESS=YourDefaultAddresHere //this is the default address with NFTs you want to see as a gallery
<br>
NEXT_PUBLIC_REACT_APP_USE_WALLET_ADDRESS=true //true if you want to use a wallet address, false if you want to use the Json object
<br>
NEXT_PUBLIC_REACT_APP_API_KEY= yourApikey
<h3>Restart your app and run</h3>
<br>

```
npm run dev
```

<h3>Refresh your page and you will need to log into your Tezos wallet.</h3>
<br>

<h3>And then you have the <strong>Darkblock Tezos Widget</strong> working!!!	&#x1f609; Congrats.</h3><br>

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js/) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/deployment) for more details.
