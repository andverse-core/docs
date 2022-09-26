要为 Andverse 构建场景，您需要安装
命令行界面 (CLI)。
CLI 允许您在“链下”开发环境中编译和预览场景。在本地测试您的场景后，您可以使用 CLI 将您的内容上传到内容服务器，并将其与您的 LAND 链接。
请注意： 目前，Andverse SDK（与 CLI 安装捆绑）仅支持 TypeScript。

Andverse CLI 通过 npm 分发。

<h2 id="before-you-begin">开始之前<a href="#before-you-begin" class="header-link">#</a></h2>
请在安装 CLI 之前安装以下依赖项：
<br></br>

- [Node.js](https://nodejs.org)（版本 8 或更高版本）



###安装命令行
打开终端应用程序并运行以下命令：

```
npm install -g andverse
```

安装完成后，acl 命令将全局可用。

###在任何平台上更新 CLI#
要将 CLI 更新到受支持的最新版本，我们建议先卸载 CLI，然后重新安装新版本。为此，请运行以下命令：

```
// 卸载
npm rm andverse -g

// 安装
npm install -g andverse
```

更新场景的 SDK 版本

如果您的 CLI 是最新的，那么您使用它创建的新项目将使用最新版本的 SDK。

更新 CLI 不会更改现有项目使用的 SDK 版本。您需要手动更新项目中的 SDK 版本。

在场景文件夹上运行以下命令：

```
npm i and-ecs@latest
```

您可以通过检查场景的 package.json 文件并在那里查找 and-ecs 版本来确认它是否有效。