---
layout: layout
permalink: /projects/
title: Projects
---

I'm a _big_ open-source fan. Therefore, I open-source as much of my code as I
can. Feel free to look around on my [sourcehut](https://git.sr.ht/~nloomans),
[GitHub](https://github.com/nloomans), and
[GitLab](https://gitlab.com/nloomans). Below you can view some of my favorite
projects! They are listed in reverse-chronological order (newest first).

# Codam

I have written many [Codam](https://www.codam.nl/en/) projects. These are some
of the biggest projects I worked on:

## ft_select (2020-02-06)

The solo-project `ft_select` was about creating a TUI-option selection menu. It
would allow you to select multiple options from a list using your keyboard from
within a shell. It would then communicate the selected options to the parent
process using stdout.

<video muted controls>
	<source src="/assets/projects/ft_select.mp4" type="video/mp4">
</video>

The catch of this project was that we weren't allowed to use
[ncurses](https://en.wikipedia.org/wiki/Ncurses). That would make it to easy.
Instead, we needed to use [termcap](https://en.wikipedia.org/wiki/Termcap)
directly. libtermcap is an ancient library before terminal emulators existed and
before every terminal emulator used the
[vt100](https://en.wikipedia.org/wiki/VT100) control codes.

I have written `ft_select` so that it makes no assumptions about the
capabilities of the terminal. In fact, it is fully functional even when it can't
find information about the terminal[^1] and it therefor isn't allowed to send
escape sequences. (Although it won't look as nice.)

> [Source-code on sourcehut](https://git.sr.ht/~nloomans/ft_select/)

[^1]: [See this StackOverflow question where a user has this problem.](https://stackoverflow.com/questions/12345675/screen-cannot-find-terminfo-entry-for-xterm-256color)

## minishell (2019-12-03)

`minishell` is a project where we needed to implement a small subset of a
POSIX shell. Later Codam projects will elaborate on this where we need to create
increasingly complex shells. I wrote this project together with Devanando
Kroeke. It was a nice project where we learned quite a bit about shell
internals.

We focused a lot on the code quality and commit quality of minishell.
Especially with commits I tried my best to make small, self contained, and
context-filling commits. Some examples would be commit
[ba57be4e](https://gitlab.com/Devanando/minishell/-/commit/ba57be4e05bfe87a0c338ee8d9b0cc30de088ac7)
and [cff93e34](https://gitlab.com/Devanando/minishell/-/commit/cff93e34e0ae3806f5d55b9765c3375d1a9d7d6a).

> [Source-code on GitLab](https://gitlab.com/Devanando/minishell)

## ft_ls (2019-10-03)

This project required us to create our own implementation of `ls` in C. I wrote
this project together with Devanando Kroeke. He is a great teammate who valued
good workflows as much as I do. `ft_ls` was harder to test
compared to `ft_printf` because of the sheer amount of system calls that are
required. We decided to focus on making the untestable code as small and
obviously correct as possible, usually just copying system call results to
structs. Then giving these structs to the testable code to handle. This allowed
us to write unit tests for almost all of the complex logic on `ft_ls` (there is
more then you would expect!)

We based our implementation on the [POSIX ls standard]. Quit a few details of
which surprised us. Did you know that `ls sym_link_to_dir` lists the
dir contents, while `ls -l sym_link_to_dir` lists the symlink itself?

[POSIX ls standard]: https://pubs.opengroup.org/onlinepubs/9699919799/utilities/ls.html

 > [Source-code on GitLab](https://gitlab.com/nloomans/ft_ls)

## ft_printf (2019-07-06)

The goal of this project was to reimplement the C `printf` function using only
the `write`, `malloc`, and `free` system calls and the four [stdarg(3)]
functions. All other library functions (e.g. `strlen` and `memcpy`) are
reimplemented in my [libft] project.

I wrote `ft_printf` together with [Emily Martins]. She was a pleasure to work
with and taught me quite a bit about [vim]. We focused on modularity,
testability and standard compliance. The `printf` section of the [C17 standard]
(7.21.6 "Formatted input/output functions") is a surprisingly well written and
easy to understand standard describing most of the edge cases one needs to know
about when implementing `printf`.

I am using our `ft_printf` for all Codam projects now and I had to
make very little changes to it since handing in the project.

 > [Source-code on GitHub](https://github.com/emiflake/libftprintf)

[stdarg(3)]: https://linux.die.net/man/3/stdarg
[Emily Martins]: https://github.com/emiflake
[vim]: https://www.vim.org/
[C17 standard]: https://web.archive.org/web/20181230041359if_/http://www.open-std.org/jtc1/sc22/wg14/www/abq/c17_updated_proposed_fdis.pdf
[libft]: https://git.sr.ht/~nloomans/libft

# PWS (2018-01-22)

For my school's _profielwerkstuk_, [Joppe Koers](https://joppekoers.nl/) and I
made a robot that you can pay using Ethereum (an alternative for Bitcoin).

> [View the video (2 minutes, dutch)](https://www.youtube.com/watch?v=B537fsTZdjA)

We also submitted our _profielwerkstuk_ to the 3i Award. The 3i Award hands
out a price to the best _profielwerkstuk_ (in the Netherlands) with a computer
science component. On the 18th of April, 2018, we got [1st place] for best HAVO
_profielwerkstuk_! It was an amazing experience that I will never forget.

[1st place]: https://3i-award.nl/winnaars/1e-prijs-havo-2018/

You can view the full document at [noahloomans.com/pws.pdf](/pws.pdf).

# Metis Rooster (2016-9-4 to present)

I created a schedule page for my school out of frustration. The old schedule
page was incredibly difficult to use, especially on mobile! I started this
project on the 4th of September, 2016. On the 8th of October, my school decided
to use my improved schedule page instead of their old one.

This project receives a few updates a year now. I am still maintaining the
server hosting this, but it has been fully automated and I only need to login
to the server a couple of times a year. Security patches are automatically
installed from canonicals security update repositories, and I have DigitalOcean
backups in case something goes wrong (never needed to use them yet.) The NodeJS
applications itself is shipped using Docker, allowing me to be confident that
the same packages are installed on the server as on my local machine.

> [View the schedule page (dutch)](https://rooster.hetmml.nl)

> [View the source code](https://github.com/nloomans/rooster.hetmml.nl)

---
