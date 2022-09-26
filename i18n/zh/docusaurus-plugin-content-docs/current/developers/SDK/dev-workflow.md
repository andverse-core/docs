本文档概述了为 Andverse 开发场景所涉及的推荐步骤，从在本地环境中进行测试到部署到生产。

### 在你开始之前
请确保首先通过运行以下命令安装 CLI 工具：

```
npm install -g andverse
```

有关详细说明，请参阅安装指南。

确保您还拥有或拥有在 Andverse 至少一块土地上的部署权利。

### 本地预览
要预览场景，请在场景的主文件夹中运行以下命令：

```
acl start
```

### 最新的 SDK 变化
开发新场景时，默认使用 @latest 稳定 SDK 版本。

如果您想利用或预览尚未进入最新稳定版本的即将推出的功能，您可以安装 @next SDK 版本。

为此，请在您的场景中运行以下命令：

npm i and-ecs@next

注意：请记住，@next 版本可能会不时出现问题。新功能的语法和名称在稳定版本发布之前可能会发生变化。


### 上传场景到andverse
对场景感到满意后，就可以将其发布到生产环境了。如果他们访问场景的坐标，所有玩家都可以访问它。

```
acl deploy --target peer.andverse.org/contents
```