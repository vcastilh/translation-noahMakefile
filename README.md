# [noahloomans.com](https://noahloomans.com/)

This website is written using [jekyll](https://jekyllrb.com/).

To build the website get the [nix](https://nixos.org/nix/) packae manager and
run `nix-build`. The html will be stored in `result/www`. If you want live
incremental builds, you can get a shell with `jekyll` installed using
`nix-shell`. You can now run `jekyll serve`.

You can also manually install jekyll, but the output might be different and
slightly broken.

All code pushed to master will automatically be build and pushed to the server.
See `.build.yml` for details.
