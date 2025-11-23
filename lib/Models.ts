interface Model {
  name: string;
  desc: string;
  baseModel: string;
  date: string;
  link: string;
  featured?: boolean;
}

const models: Model[] = [
  {
    name: "llama-3.1-8b-instruct-no-robots",
    desc: "Llama-3.1-8B-Instruct trained on No Robots dataset.",
    baseModel: "meta-llama/Meta-Llama-3.1-8B-Instruct",
    date: "November 2025",
    link: "https://huggingface.co/aksheyd/llama-3.1-8b-instruct-no-robots",
    featured: true,
  },
  {
    name: "llama-3.1-8b-instruct-no-robots-mlx",
    desc: "MLX-optimized version of llama-3.1-8b-instruct-no-robots.",
    baseModel: "meta-llama/Meta-Llama-3.1-8B-Instruct",
    date: "November 2025",
    link: "https://huggingface.co/aksheyd/llama-3.1-8b-instruct-no-robots-mlx",
  },
  {
    name: "llama-3.1-8b-tulu3-sft",
    desc: "Llama-3.1-8B-Tulu3 trained on Tulu 3 dataset.",
    baseModel: "meta-llama/Meta-Llama-3.1-8B",
    date: "November 2025",
    link: "https://huggingface.co/aksheyd/llama-3.1-8b-tulu3-sft",
    featured: true,
  },
  {
    name: "llama-3.1-8b-tulu3-sft-mlx",
    desc: "MLX-optimized version of llama-3.1-8b-tulu3-sft.",
    baseModel: "meta-llama/Meta-Llama-3.1-8B",
    date: "November 2025",
    link: "https://huggingface.co/aksheyd/llama-3.1-8b-tulu3-sft-mlx",
  },
];

export default models;

export type { Model };
