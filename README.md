# [noahloomans.com](https://noahloomans.com/)

This website is written using [jekyll](https://jekyllrb.com/).

[Install it](https://repology.org/project/ruby:jekyll/packages) from your
package manager or get the project dependencies using
[nix](https://nixos.org/nix/).

## Development

For local testing of the site, run

```sh
jekyll servce -s src --livereload # if you installed jekyll system-wide

nix-shell --run 'jekyll serve -s src --livereload' # if you got nix
```

## Publish

Everything pushed to the master branch of
[my repo](https://git.sr.ht/~nloomans/noahloomans.com) will automatically be
build and published, see the `.build.yml` file for details.
