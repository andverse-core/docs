<h1> CLI Installation Guide </h1>
To build scenes for Andverse you will need to install 
the Command Line Interface (CLI).
<br><br/>
The CLI allows you to compile and preview your scene in an “off-chain” development environment. After testing your scene locally, you can use the CLI to upload your content to the content server, linking it with your LAND.
<br><br/>
<strong>Please note:</strong> Currently, the Andverse SDK (bundled with the CLI installation) only supports TypeScript.
<br><br/>

The Andverse CLI is distributed via npm.

<h2 id="before-you-begin">Before you Begin<a href="#before-you-begin" class="header-link">#</a></h2>
Please install the following dependencies before you install the CLI:
<br></br>

- [Node.js](https://nodejs.org) (version 8 or later)



###Install the CLI
Open the Terminal app and run the following command:

```
npm install -g andverse
```

Once the installation is complete, the acl command will be globally available.

###Update the CLI on any platform#
To update the CLI to the latest supported version, we recommend first uninstalling the CLI and then reinstalling a fresh version. To do this, run the following commands:

```
// uninstall
npm rm andverse -g

// install
npm install -g andverse
```

Update the SDK version of a scene

If your CLI is up to date, the new projects you create with it will use the latest version of the SDK.

The SDK version used by your existing projects doesn’t change by updating the CLI. You need to manually update the SDK version in the projects.

Run the following command on the scene folder:

```
npm i and-ecs@latest
```

You can confirm that it worked by checking the package.json file for the scene, and looking for the and-ecs version there.

