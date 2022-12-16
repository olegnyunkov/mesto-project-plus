export type User = {
  name: string;
  about: string;
  avatar: string
}

export type Card = {
  name: string;
  link: string;
  owner: string;
  likes: string[];
  createdAt: Date
}
