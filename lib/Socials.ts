interface Account {
  name: string;
  website: string;
  pretty: string;
  spacing: string;
}

const socialAccounts: Account[] = [
  {
    name: "x",
    website: "https://x.com/_aksheyd",
    pretty: "X",
    spacing: "                 ",
  },
  {
    name: "github",
    website: "https://github.com/aksheyd",
    pretty: "GitHub",
    spacing: "            ",
  },
  {
    name: "linkedin",
    website: "https://linkedin.com/in/aksheydeokule",
    pretty: "LinkedIn",
    spacing: "          ",
  },
  {
    name: "huggingface",
    website: "https://huggingface.co/aksheyd",
    pretty: "HuggingFace",
    spacing: "            ",
  },
];

export default socialAccounts;

export type { Account };
