# atom-weexpack package

an atom plugin for weexpack

you can create and build a weex porject by the plugin

### Install

Open your Atom and search `weexpack` to isntall.




### 接入开发

如果你需要增加一个模块的功能，你只需要在 `pkg` 目录下增加一个标准的 Atom 查检目录即可，比如 `weexpack-create`。插件会自动遍历到该目录，
并进行功能的激活。每个目录需要定义自己的 `package.json` 用于描述自己的功能和版本以及入口文件。所有的业务代码存放到这个包下面的 `lib` 目录下。你可以在 `menu` 目录下定义菜单描述，绑定相应的命令。你可以在 `components` 目录下进行对于界面的文件开发。

项目中的  view 基于 [React](https://facebook.github.io/react/)  开发，可以更好对view进行管理, [pkg/weexpack-ui](./pkg/weexpack-ui) 存放着 常用的界面组件。
