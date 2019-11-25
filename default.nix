with import <nixpkgs> {};
stdenv.mkDerivation rec {
  name = "noahloomans.com";
  src = ./src;
  buildInputs = [
    jekyll
  ];
  buildPhase = ''
    jekyll build
  '';
  installPhase = ''
    mkdir -p $out/www
    cp -r _site/. $out/www
  '';
}
