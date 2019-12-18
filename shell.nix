with import <nixpkgs> {};
mkShell {
  buildInputs = (import ./default.nix).buildInputs ++ [
    rubyPackages_2_6.rouge
  ];
}
