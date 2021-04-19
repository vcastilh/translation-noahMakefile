# [noahloomans.com](https://noahloomans.com/)

This website is written using [jekyll](https://jekyllrb.com/).

To build the website get the [nix](https://nixos.org/nix/) package manager and
run:

```nix-build```

The static html output should now be stored in `result/www`.

To get an localhost dev environment, run the following:

```nix-shell --run 'jekyll serve -s src'```

You can also manually install [jekyll], but the output might be
different and slightly broken.

[jekyll]: https://jekyllrb.com/

All code pushed to master will automatically be build and pushed to the server.
See `.build.yml` for details.
