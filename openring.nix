with import <nixpkgs> {};
buildGoModule {
  name = "openring";

  src = fetchgit {
    url = "https://git.sr.ht/~sircmpwn/openring";
    rev = "ec47d0b3842147a156216ed7b2630600bec73371";
    sha256 = "0q32jf6lvkl7yrnpiznp5rwfrw0zckqhfkmx6k72pv687k2m1yp4";
  };

  modSha256 = "01gq8kih44j3bpw14p9694kr37v01na7xnmjfnjjb2qady05dnbf";
}
