export interface Folder {
  tweets: Array<Tweet>;
  name: string;
  id: string;
}

export interface Tweet {
  url: string;
  username: string;
  text: string;
  id?: string;
  _id?: string;
  displayPhoto?: string;
  displayName?: string;
  datePosted?: string;
}
