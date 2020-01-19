with import <nixpkgs> {};
let
  openring = import ./openring.nix;
in
  mkShell {
    buildInputs = (import ./default.nix).buildInputs ++ [
      rubyPackages_2_6.rouge
      openring
    ];
  }
