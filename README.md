# 📮 API

A 'Cloudflare Workers' API made in TypeScript.

**Course:** Intelligent Mobile Systems  
**Information:** https://ju.se/en/study-at-ju/courses.html?courseCode=TIGK10&semester=20201&revision=1,000


## Dependencies
<table border=1>
    <tr>
        <th>Name</th>
        <th>Terminal command</th>
        <th>Download link</th>
    </tr>
    <tr>
        <td>itty-router</td>
        <td>npm i itty-router</td>
        <td>https://www.npmjs.com/package/itty-router</td>       
    </tr>
    <tr>
        <td>wrangler</td>
        <td>npm i @cloudflare/wrangler -g</td>
        <td>https://developers.cloudflare.com/workers/cli-wrangler/install-update</td>
    </tr>
    <tr>
        <td>faunadb</td>
        <td>npm i faunadb</td>
        <td>https://docs.fauna.com/fauna/current/drivers/javascript.html</td>
    </tr>
</table>

### 🛠️ Setup Workspace

Before running a development server, you'll need to setup the workspace with your own Cloudflare account by following these steps:

1. Create a local **wrangler.toml** file by copying the [`wrangler.example.toml`](.wrangler.example.toml) file and renaming it.

2. Login to Wrangler and authorize yourself by running the command:

```bash
wrangler login
```

3. Get your specific unique **Account ID** by running the command:

```bash
wrangler whoami
```

4. Insert the value of **Account ID** into the field **account_id** that exists in the newly created [`wrangler.toml`](.wrangler.toml) file.

**NOTE!**  
Make sure to not use the [`wrangler.prod.toml`](.wrangler.prod.toml) file to develop with, as this configuration file only will be used to publish the API.

### 💻 Developing

For a local development server, run this command:

```bash
wrangler dev
```

You can also use the Cloudflare Worker preview server by running this command:

```bash
wrangler preview
```

### 📦 Version Control

This project supports [commitizen/cz-cli](https://github.com/commitizen/cz-cli), which is a tool that generates commits that follows the standard [Conventional Commits](https://www.conventionalcommits.org/en/v1.0.0/).

Add the files you want to commit by using `git add` and then run the commitizen command `cz`. Follow the steps and you will end up with a well formatted commit that you can push up to the repository via the command `git push`.

### 🧪 Testing

This project comes with mocha tests which simply test that the request handler can handle each request method. `npm test` will run your tests.

### ✏️ Formatting

This project uses [`prettier`](https://prettier.io/) to format each files equally. To invoke, run `npm run format`.

### 😎 Publish

```bash
wrangler publish
```

### 🖥️ Usage and endpoints
<table border=1>
    <tr>
        <th>Endpoint</th>
        <th>Body</th>
        <th>Response</th>
        <th>Additional Information</th>
    </tr>
    <tr>
        <td>GET /api/coord/:page</td>
        <td>-</td>
        <td>
            [
    [
        {
            "collision": false,
            "X": 10,
            "Y": 10
        }
    ],
    [
        {
            "collision": false,
            "X": 9,
            "Y": 0
        },
        {
            "collision": false,
            "X": 5,
            "Y": 5
        }
    ]
            ]
        </td>   
        <td>Example: /api/coord/1 will give the newest 5 routes, /2 will give the second newest 5 routes</td>
    </tr>
    <tr>
        <td>POST /api/coord</td>
        <td> Example
        {
    "X":10,
    "Y":10,
    "session":14
}
        </td>
        <td>Provide a X and Y value as well as a session (this allows you to add coordinates to an existing session, provide non existing session to create a new)</td>
    </tr>
</table>

