This document outlines the recommended steps involved in developing a scene for Andverse, going from testing in the local environment to deploying to production.

###Before you begin
Please make sure you first install the CLI tools by running the following command:

```
npm install -g andverse
```

See the Installation Guide for more details instructions.

Make sure you also own or have deploy rights on at least one parcel of land in Andverse.

###Local preview
To preview a scene run the following command on the scene’s main folder:

```
acl start
```

###Latest SDK changes
When developing a new scene, you use the @latest stable SDK release by default.

You can install the @next SDK release if you want to leverage or preview upcoming features that didn’t yet make it into the latest stable release.

To do so, run the following on your scene:

npm i and-ecs@next

Note: Keep in mind that the @next version might suffer issues from time to time. The syntax and name of new features might change before it’s released in a stable version.


###Upload a scene to andverse
Once you’re happy with your scene, it’s time to publish it to the production environment. There all players will have access to it if they visit the scene’s coordinates.

```
acl deploy --target peer.andverse.org/contents
```

Check that your scene has all the necessary metadata: name, description, a preview image, spawn points. See scene metadata for details.

See [publishing](https://docs.andverse.org/zh/technology/publishing) for more details.