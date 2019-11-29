---
layout: layout
permalink: /tutorials/makefile/
title: Makefile tutorial
---

# Makefile tutorial

This is a tutorial written by Noah Loomans (nloomans) with the hope of helping
Codam peers write better Makefiles. Feedback welcome!

---

When evaluating peers, I see many Makefiles which look something like this:

```makefile
NAME = ft_foo
SRCS = ft_bar.c ft_baz.c
FLAGS = -Wall -Wextra -Werror

all: $(NAME)

$(NAME):
	gcc $(FLAGS) -o $(NAME) $(SRCS)

clean:
	rm -f *.o

fclean: clean
	rm -f $(NAME)

re: fclean all
```

While this is valid, it is possible to do much more with `make`. When we finish
this tutorial, typing `make` will only recompile the source files you changed.
So `make re` is never needed, and `make` will be much quicker.

## A basic Makefile

First off, let's make a very basic `Makefile`, it will not be norm compliant,
we will worry about that later.

Clone this repository containing an example project:

```
git clone https://git.sr.ht/~nloomans/makefile-tutorial
```

The `Makefile` in the repository is as follows:

```makefile
foo: main.o greeter.o
	gcc -o $@ $^

%.o: %.c
	gcc -c -Wall -Wextra -Werror -o $@ $<

clean:
	rm -f foo main.o greeter.o
```

Let's go through what is happening here. The first rule is `foo`. This rule has
the dependencies `main.o` and `greeter.o`, which are compiled from `main.c` and
`greeter.c`, respectively, but `make` doesn't know that yet. When `make` sees
these dependencies, it will look rule by rule to see which rule can create that
file. In this case the rule `%.o` satisfies both `main.o` and `greeter.o`.

The `%.o: %.c` rule means that for any `.o` file, we are depending on a `.c`
file with the same name. If the object file doesn't exist or if the source file
is newer then the object file, the contents of the rule will be executed. The
recipe (rule contents) contains two special variables. `$@` stands for the
target, for example, `main.o`. `$<` stands for the first dependency,
for example, `main.c`. In summary, this rule states that any object file will
be compiled using the corresponding source file, using the `gcc -c` command.

If either the `main.o` or the `greeter.o` rule was run, the `foo` rule will
also execute. Now that the object files have been compiled we can link them
into an executable. `$^` is similar to `$<`, but `$^` stands for all the
dependencies while `$<` will only get the first one.

> **Exercise**: Run `make` and observe all of the files being compiled and then
> linked. Change one `.c` file and observe only that `.c` fill being recompiled
> followed by linking. Change nothing and run `make` again, observe that
> nothing happens. (If it did link after changing nothing, that would be
> relinking and therefore a norm error.)

> **Exercise**: Compile a single object file, without linking them to `foo`.
> You may only use the `make` command and you may not edit the Makefile.

> **Exercise**: Try adding a `exercise: exercise.o greeter.o` rule. You should
> create an `exercise.c` file which uses a function defined in `greeter.o`.

## Adding variables

Let's modify the `Makefile`. The new contents will look like this:

```makefile
NAME = foo
OBJ_FILES = main.o greeter.o
CFLAGS = -Wall -Wextra -Werror

$(NAME): $(OBJ_FILES)
	$(CC) -o $@ $^

%.o: %.c
	$(CC) -c $(CFLAGS) -o $@ $<

clean:
	rm -f $(NAME) $(OBJ_FILES)
```

> If you are getting a `Makefile:8: *** missing separator.  Stop.` error, that
> means the rules you copied have been indented using spaces instead of tabs.
> `Makefile` rules are required to be indented using tabs, changing the spaces
> to tabs manually will fix the issue.

First off, there is no such thing as `gcc` on the Codam iMacs. The actual
compiler installed is `clang`. `clang` is mostly compatible with `gcc`, and a
lot of programs only compile with `gcc` even though they are also able to
be compiled using `clang`. As a compatibility layer for these programs an
alias has been installed in `/usr/bin/gcc`, but in reality, you are executing
clang.

A nicer solution for this is to use `cc`. When using `cc` you will use the
preferred compiler for the current operating system. On Linux systems, this will
most likely be `gcc`. And on macOS systems, this will most likely be `clang`.
However, you may want to use `clang` when compiling on Linux, or `gcc` when
compiling on macOS. For this, `make` provided `$(CC)`. By default, `$(CC)` will
resolve to `cc`. However, it is possible to overwrite this and compile using
whatever compiler you want by either setting the `CC` environment variable or
by compiling like so: `make CC=clang`.

The `$(CFLAGS)` make variable is the standard variable for setting the compile
flags. Notice how we didn't use it in the linking step. This is because these
compile flags only apply during the compilation stage. While it is possible to
add them to the linking stage, as long as you don't have any `.c` files it the
list they will be ignored. Defining them like this allows us to easily modify
the `$(CFLAGS)` when compiling. For example, we might want to use
`make "CFLAGS=-Wall -Wextra -Werror -g"` to generate debug information. Or we
might want to compile using `make "CFLAGS=-Wall -Wextra -Werror -O2"` to create
an optimized production build.

> *Exercise*: Try to recompile with the `-pedantic` compile flag. Try changing
> the name of the executable name. Do this without modifying the Makefile.

## Norm compliance

We need a few more rules to get full norm compliance.

```makefile
NAME = foo
OBJ_FILES = main.o greeter.o
CFLAGS = -Wall -Wextra -Werror

all: $(NAME)

$(NAME): $(OBJ_FILES)
	$(CC) -o $@ $^

%.o: %.c
	$(CC) -c $(CFLAGS) -o $@ $<

clean:
	rm -f $(OBJ_FILES)

fclean: clean
	rm -f $(NAME)

re: fclean all

.PHONY: all clean fclean re
```

The `all` rule itself has no special meaning. Make simply runs the first rule
when no rule is specified. The `.PHONY` line means that all of these rules
should be treated like commands, not outputs. So even if there exists a file
called `clean`, clean will still run.

## Advanced

The following subjects are advanced ways to improve your Makefile further.
Please read on if you are curious, but you don't have to.

### Multi-threading

Make has an awesome option called `-j`, which will allow multi-threading. If
you use `make -j6` to compile your project, up to 6 rules can be run at the
same time. This is very nice since it makes your `Makefile` _much_ faster.
Especially on bigger projects!

Unfortunately, this means that we can no longer depend on the order of
dependencies. This breaks the `re` target. Since both the `fclean` and the
`all` dependencies are run at the same time, files will be deleted during
compilation. This will well... break everything. One solution is to redefine
the `re` rule as follows:

```makefile
re:
	$(MAKE) fclean
	$(MAKE) all
```

Instead of having `fclean` and `all` as dependencies we will recursively call
make twice. The `$(MAKE)` rule will expand to a `make` with all of the flags
used to call the parent `make` pre-set. For example, if we run
`make CC=clang re`, `$(NAME)` will expand to `make CC=clang`. We will first
call our `make` again using fclean, wait until it has finished, and then call
it with `all`. Now we can run `make re -j6` with peace.

### The bonus target

The `bonus` target is quite hard to get right. Because the target name does not
equal to the output file (e.g. `libft.a`), make will always recompile bonus.
Even if you didn't change anything. A better way to handle this is by adding a
`WITH_BONUS` variable to make. Let me demonstrate:

(this isn't valid right now, we still need a bonus rule. I'll get back to you
on that one later in this document.)

```makefile
NAME=foo
REG_OBJ_FILES = main.o greeter.o
BONUS_OBJ_FILES = loud_greeter_bonus.o

ifdef WITH_BONUS
OBJ_FILES = $(REG_OBJ_FILES) $(BONUS_OBJ_FILES)
else
OBJ_FILES = $(REG_OBJ_FILES)
endif

CFLAGS = -Wall -Wextra -Werror

all: $(NAME)

$(NAME): $(OBJ_FILES)
	$(CC) -o $@ $^

%.o: %.c
	$(CC) -c $(CFLAGS) -o $@ $<

clean:
	rm -f $(REG_OBJ_FILES) $(BONUS_OBJ_FILES)

fclean: clean
	rm -f $(NAME)

re:
	$(MAKE) fclean
	$(MAKE) all

.PHONY: all clean fclean re
```

By default, the `$(OBJ_FILES)` variable is only equal to the non-bonus object
files. However, if we compile using `make WITH_BONUS=1`, `$(OBJ_FILES)` will be
equal to all files, including the bonus ones. If we first compile only the
regular files, and then compile with the bonus files extra, this Makefile will
only recompile the bonus source files. And, most importantly, running
`make WITH_BONUS=1` with nothing change will do nothing!

However, we still need the `bonus` target, unfortunately. One way to solve this
would be by calling `make` again while inside of the `Makefile`. Like this:

```makefile
bonus:
	$(MAKE) WITH_BONUS=1 all
```

This is all a bit clunky, and I hope the `libft` and `get_next_line` projects
will be updated to use a separate `libftbonus.a` target, but this is the best
we can do now.

---

That was it! Please send any errors, questions, and improvements to nloomans
on slack.
