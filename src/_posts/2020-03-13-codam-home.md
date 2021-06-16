---
layout: post
title: How to work from home, Codam edition.
categories: [tutorials]
---

The Codam staff has recommended everyone to work from home if possible. Because
not everyone has a development environment setup to work from home, I thought
I would create a quick guide.

## Collaboration

In order to collaborate with your peers, screen sharing could be useful. For
this, you can use the "Start a call" button at the top right of any slack
channel. Anyone who is on that channel can join your call. One person can share
their screen at a time and everyone can draw on that screen to e.g. point to
code.

 > [More info](https://slack.com/intl/en-nl/help/articles/115003498363-Slack-Calls--the-basics)

If you wish to share more then one screen at a time you could use Discord.

If you use vscode you can also use the [Live Share] plugin to collaborate as if
you shared an iMac.

[Live Share]: https://marketplace.visualstudio.com/items?itemName=MS-vsliveshare.vsliveshare

## Migrating from vogsphere to GitHub

If you only have your code on vogsphere you can push it to GitHub in a few
steps.

 1. [Create a GitHub repository](https://github.com/new)
 2. `cd` to the folder on your iMac where you have your repo.
 3. `git remote add github https://github.com/your_name/your_repo_name`
 4. `git push -u github master`

If you have 2FA on your GitHub you need to use SSH instead of https.
[How to setup](https://help.github.com/en/github/authenticating-to-github/generating-a-new-ssh-key-and-adding-it-to-the-ssh-agent).
The url will look like `git@github.com:your_name/your_repo_name`.

## Linux

If you don't have a macOS device (like me) and want to work from home you
probably want to use Linux. Windows users can use [WSL] to get a Linux
environment.

[WSL]: https://docs.microsoft.com/en-us/windows/wsl/install-win10

I recommend Ubuntu for new Linux users. First, you want to install Git and the
`build-essential` package.

```
sudo apt install git build-essential
```

`build-essential` contains all the required tools to compile C code on Linux.
You may also choose to use the `clang` compiler instead of `gcc`, which will give
more similar error messages to what we use at Codam. To do so, install the
`clang` and `lldb` packages.

```
sudo apt install clang lldb
```

If your makefile uses the `$(CC)` variable instead of calling `gcc` or `clang`
directly, you can choose which compiler to use by setting the `CC` environment
variable. See my [Makefile tutorial](/tutorials/makefile) for details.

In some cases, the Linux code and macOS code need to be different. For this you
can use the `#ifdef` statement. For example, if you want `PATH_MAX` you need to
include it like this:

```
#include <ft_printf.h>
#include <libft.h>
#ifdef __linux__
# include <linux/limits.h>
#else
# include <limits.h>
#endif
#include <unistd.h>
#include "env.h"
#include "builtin.h"
```

 > [Full example](https://git.sr.ht/~nloomans/minishell/tree/2a05412dd738b8f4fd3094cf44098b350252b95f/src/builtin/cd.c#L15)
