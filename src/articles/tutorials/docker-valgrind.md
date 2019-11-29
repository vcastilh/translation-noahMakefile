---
layout: layout
permalink: /tutorials/docker-valgrind/
---

# How to install Valgrind on Mojave using Docker

[Valgrind] is a very useful tool that allows you to spot memory leaks, memory
corruptions and other bugs in your program which would have otherwise been
difficult to find and track down. Here is an example error Valgrind can
generate:

```
==645== Invalid write of size 1
==645==    at 0x10A14C: get_pathname (path.c:33)
==645==    by 0x10B158: read_files (fs.c:70)
==645==    by 0x10B221: fs_read_dir (fs.c:88)
==645==    by 0x1099D5: display_dir_contents (display.c:70)
==645==    by 0x10AEA2: ft_ls (ft_ls.c:48)
==645==    by 0x10AAB8: main (main.c:29)
```

This is Valgrind-speak for "you wrote a `char` in a location which was not
allocated. This happened in the `get_pathname` function on line 33". In this
example the program still functioned. However, this has the possibility of
crashing your program if you are lucky, and overwriting memory some other code
uses (thus creating unexplainable behavior) if you are unlucky. If you are
interested, read on! This tutorial will show you how to install Valgrind.

Unfortunately, Valgrind doesn't work in Mojave. You can currently install a
[work in progress version which improves support][work in progress] but there
will be _a lot_ of false-positive errors to ignore.

Instead, I like to run Valgrind on Linux. The Linux support of Valgrind is
excellent. This does require you to add support for Linux to your application.
Luckily that doesn't take too time, you mostly need to change a few includes
([`#ifdef __linux__` is your friend][ifdef]) and fix a few issues that gcc finds but
clang doesn't.

[ifdef]: https://git.sr.ht/~nloomans/minishell/tree/2a05412dd738b8f4fd3094cf44098b350252b95f/src/builtin/cd.c#L15

How does one get a Linux environment with Valgrind on macOS? One solution
is to use [Docker]. Docker allows us to quickly get a Linux environment and
give that environment access to any folder we want.

> The intent of this tutorial is not to give you a foundation in Docker.
> Instead, this tutorial aims to give you a working Docker setup and get
> Valgrind working. There are [many tutorials] if for if you want to properly
> learn Docker.

[Valgrind]: https://www.valgrind.org/
[work in progress]: https://github.com/sowson/valgrind
[Docker]: https://docs.docker.com/engine/docker-overview/
[many tutorials]: https://github.com/docker/labs/blob/master/beginner/chapters/alpine.md

## How to install Docker

_Non-[Codam] students can [skip a bit](#non-codam-skip)._

[Codam]: https://www.codam.nl/en/

Open up the Managed Software Center and install Docker from there. We do need
to make a few changes before you launch it.

Docker will download a lot of Linux parts and unless you have almost nothing in
your home folder it will exceed the 5GB limit. Instead, we will store Docker
in `goinfre`. `goinfre` is a folder that is specific to the current iMac. It
does not have artificial limits and is perfect to store Docker in. Because of
the nature of Docker, it doesn't matter that this folder isn't synced between
iMacs. Docker will transparently download everything it needs when running it
on a new iMac.

> *Note*: `goinfre` and `sgoinfre` are different and unrelated folders.
> `sgoinfre` is a Network File Share allowing students to store larger files
> at a slower speed. `goinfre` is a folder stored on the local iMac and it
> not synced. The reason we are using `goinfre` instead of `sgoinfre` is that
> Docker requires locks, which `sgoinfre` does not provide.

First, we want to create a folder inside of goinfre to store Docker in. I like
to create `~/goinfre/docker` folder using `mkdir -p ~/goinfre/docker`. I would
recommend you to place that `mkdir` command inside of your `~/.zshrc` (or, even
better, set it to [run at startup]). Once created, we want to symlink
`~/Library/Containers/com.docker.docker` to `~/goinfre/docker`:

```
rm -rf ~/Library/Containers/com.docker.docker
ln -s ~/goinfre/docker ~/Library/Containers/com.docker.docker
```

[run at startup]: https://stackoverflow.com/c/42network/a/75/521

<span id="non-codam-skip">Now, we can launch Docker.</span> A Docker indicator
will be visible in the top right. Open the menu and wait for a green dot with
the text "Docker is running".

<img class="center" src="{{ "/assets/tutorials/docker-valgrind/docker-popup.png" | relativize_url }}" height="300">

Open a terminal and type `docker ps`. If you get the
following output you did it correctly:

```
$ docker ps
CONTAINER ID        IMAGE               COMMAND             CREATED             STATUS              PORTS               NAMES
```

Let's test it out, run the following command to get a Debian Linux shell:

```
$ docker run -it --rm debian bash
Unable to find image 'debian:latest' locally
latest: Pulling from library/debian
16ea0e8c8879: Pull complete
Digest: sha256:79f0b1682af1a6a29ff63182c8103027f4de98b22d8fb50040e9c4bb13e3de78
Status: Downloaded newer image for debian:latest
root@25abf8583df7:/# uname
Linux
```

Here I asked Docker to run `bash` in `debian`. We want it to be
interactive `-i` so bash doesn't immediately quit because there is no input.
And we want a pty `-t` so that bash shows us a prompt. We also want to delete
the container on exit `--rm` so it doesn't waste space

Since Debian wasn't already downloaded, Docker will download it for us. If we
execute it again `debian` won't be re-downloaded.

```
$ docker run -it --rm debian bash
root@737c30c2ccff:/#
```

The automatic redownloading is why it makes perfect sense to store Docker
in `goinfre`. Think of `~/goinfre/docker` more like a cache then something you
need to take care of.

## Accessing our project within Docker.

[docker-run(1)] has a nice `-v` option, which allows us to mount a specific
folder from the host to the Docker container. Let's try to open a folder in
Docker. I store my `ft_ls` in `~/archive/42/ft_ls`. To get access to that
folder within Docker I would run the following command:

```
$ docker run -it --rm -v ~/archive/42/ft_ls:/ft_ls debian bash
root@7c98e8ff00b5:/# cd ft_ls/
root@7c98e8ff00b5:/ft_ls# ls
LICENSE  Makefile  README.md  author  ft_printf  inc  libft  src
```

[docker-run(1)]: https://docs.docker.com/engine/reference/run/

We now have full access to the project within Linux. This folder is mounted,
not copied. Meaning that any changes made outside of the container will be
visible inside of the container. And any change made inside of the container
will be visible outside of the container.

However, if we try to `make` our project, it won't work:

```
root@7c98e8ff00b5:/ft_ls# make
bash: make: command not found
```

To save space, the `debian` Docker container is _very_ minimal. Anything extra
can be installed manually using `apt-get`. You don't want to reinstall the
required program every time you open a container, so instead, I created an
image with the required package pre-installed. The image is called
`nloomans/codam` and has `gcc`, `clang`, `make`, `valgrind`, and [criterion]
preinstalled.

[criterion]: https://github.com/Snaipe/Criterion

Let's try it out: (this will take a while to download!)

```
$ docker run -it --rm -v ~/archive/42/ft_ls:/ft_ls nloomans/codam
Unable to find image 'nloomans/codam:latest' locally
latest: Pulling from nloomans/codam
f447021fbdfe: Already exists
d16d6628947d: Already exists
270cc775f1d1: Already exists
a5da478dc971: Already exists
788167bc7de8: Pull complete
8eced207c037: Pull complete
7923f8e4c245: Pull complete
Digest: sha256:2046076731e541a1412724e3fcde416b52172b656ac6f0ce33e02222a7ad41f4
Status: Downloaded newer image for nloomans/codam:latest
[root@349e8132617f /]# cd ft_ls
[root@349e8132617f ft_ls]# make
... redacted ...
[root@349e8132617f ft_ls]# valgrind ./ft_ls -l
==1216== Memcheck, a memory error detector
==1216== Copyright (C) 2002-2017, and GNU GPL'd, by Julian Seward et al.
==1216== Using Valgrind-3.15.0 and LibVEX; rerun with -h for copyright info
==1216== Command: ./ft_ls -l
==1216==
total 616
-rw-r--r-- 1 docker http   1090 Oct 16 20:11 LICENSE
-rw-r--r-- 1 docker http   4943 Oct 16 20:11 Makefile
-rw-r--r-- 1 docker http    147 Oct 16 20:11 README.md
-rw-r--r-- 1 docker http     17 Oct 16 20:11 author
-rwxr-xr-x 1 root   root  54616 Nov 24 13:39 ft_ls
drwxr-xr-x 6 docker http   4096 Nov 24 13:39 ft_printf
drwxr-xr-x 2 docker http   4096 Oct 16 20:11 inc
drwxr-xr-x 4 docker http   4096 Nov 24 13:39 libft
drwxr-xr-x 2 root   root   4096 Nov 24 13:39 obj
drwxr-xr-x 2 docker http   4096 Oct 16 20:11 src
-rwxr-xr-x 1 root   root 191528 Nov 24 13:39 tester
==1216==
==1216== HEAP SUMMARY:
==1216==     in use at exit: 0 bytes in 0 blocks
==1216==   total heap usage: 339 allocs, 339 frees, 486,736 bytes allocated
==1216==
==1216== All heap blocks were freed -- no leaks are possible
==1216==
==1216== For lists of detected and suppressed errors, rerun with: -s
==1216== ERROR SUMMARY: 0 errors from 0 contexts (suppressed: 0 from 0)
```

And Valgrind works! Here is how it looks if Valgrind finds an error:

```
[root@f9d2ea415ac3 ft_ls]# valgrind ./ft_ls
==645== Memcheck, a memory error detector
==645== Copyright (C) 2002-2017, and GNU GPL'd, by Julian Seward et al.
==645== Using Valgrind-3.15.0 and LibVEX; rerun with -h for copyright info
==645== Command: ./ft_ls
==645==
==645== Invalid write of size 1
==645==    at 0x10A14C: get_pathname (path.c:33)
==645==    by 0x10B158: read_files (fs.c:70)
==645==    by 0x10B221: fs_read_dir (fs.c:88)
==645==    by 0x1099D5: display_dir_contents (display.c:70)
==645==    by 0x10AEA2: ft_ls (ft_ls.c:48)
==645==    by 0x10AAB8: main (main.c:29)
==645==  Address 0x4a2da34 is 0 bytes after a block of size 4 alloc'd
==645==    at 0x483877F: malloc (vg_replace_malloc.c:309)
==645==    by 0x10B612: ft_memalloc (ft_memalloc.c:20)
==645==    by 0x10B684: ft_strnew (ft_strnew.c:17)
==645==    by 0x10A0DB: get_pathname (path.c:27)
==645==    by 0x10B158: read_files (fs.c:70)
==645==    by 0x10B221: fs_read_dir (fs.c:88)
==645==    by 0x1099D5: display_dir_contents (display.c:70)
==645==    by 0x10AEA2: ft_ls (ft_ls.c:48)
==645==    by 0x10AAB8: main (main.c:29)
==645==
LICENSE
Makefile
README.md
author
build
definitions.mk
documentation.md
ft_ls
ft_printf
inc
libft
normify
normify.mk
obj
scripts
src
tester
==645==
==645== HEAP SUMMARY:
==645==     in use at exit: 0 bytes in 0 blocks
==645==   total heap usage: 197 allocs, 197 frees, 480,528 bytes allocated
==645==
==645== All heap blocks were freed -- no leaks are possible
==645==
==645== For lists of detected and suppressed errors, rerun with: -s
==645== ERROR SUMMARY: 72 errors from 7 contexts (suppressed: 0 from 0)
```

> *Hint*: Got an error like `file not recognized: file format not recognized`
> or `cannot execute binary file: Exec format error`? That means you are
> trying to use macOS object files/binaries on Linux. Running `make re` should
> help resolve that.

> *Hint*: Is `valgrind` not giving you line numbers? Try recompiling with `-g`.
> If you followed [my Makefile tutorial] `make "CFLAGS=-Wall -Wextra -Werror -g"`
> should do it.

> *Hint*: Don't know what an error means? Paste the first line into your
> [favorite search engine]!

[my Makefile tutorial]: {{ "/tutorials/makefile" | relativize_url }}
[favorite search engine]: https://duckduckgo.com/

## Handy alias

Instead of typing `docker run -it --rm -v ~/archive/42/ft_ls:/ft_ls nloomans/codam`,
again and again, I like to use the following alias I wrote:

```
alias docker-pwd='docker run -it --rm --init -v "$PWD:/pwd" nloomans/codam sh -c "cd /pwd; bash"'
```

This will allow me to run `docker-pwd` anywhere, and it will create a new
Docker container, mount my current working directory in it, and `cd` to the
correct location in the Docker container for me. (Yes I'm lazy)

> *Hint*: Try to integrate `valgrind` in your workflow. Regularly run your code
> trough Valgrind instead of waiting for errors to become visible first.
> This way one notices errors quicker, making them easier to fix.

---

I hope you found this tutorial useful! Please send any errors, questions, and
improvements to nloomans on slack.
