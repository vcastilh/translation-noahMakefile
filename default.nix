with import <nixpkgs> {};
stdenv.mkDerivation rec {
  name = "noahloomans.com";
  src = ./src;
  buildInputs = [
    jekyll
    rubyPackages_2_6.rouge
  ];
  buildPhase = ''
    jekyll build
  '';
  installPhase = ''
    mkdir -p $out/www
    cp -r _site/. $out/www
  '';
}
